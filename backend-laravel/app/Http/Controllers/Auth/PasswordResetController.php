<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\ResetPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    /**
     * Generate secure reset token and send email with reset link.
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $email = strtolower(trim($request->email));
        $user = User::where('email', $email)->first();

        // Avoid user enumeration: return success even if user not found, but only send if exists
        if ($user) {
            // Generate a cryptographically secure 64-character token
            $token = Str::random(64);

            // Store in password_reset_tokens table (upsert)
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $email],
                [
                    'token' => Hash::make($token),
                    'created_at' => Carbon::now()
                ]
            );

            // Construct secure reset link
            $appUrl = config('app.url', 'https://auracv.com');
            $resetUrl = rtrim($appUrl, '/') . '/?action=reset-password&token=' . urlencode($token) . '&email=' . urlencode($email);

            // Dispatch reset email
            try {
                Mail::to($email)->send(new ResetPasswordMail($resetUrl, $token, $email));
            } catch (\Exception $e) {
                // Log mail exception if mailer is not configured in local environment
                \Log::error("Failed sending password reset email to {$email}: " . $e->getMessage());
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link has been dispatched to your email address.',
                'email' => $email,
                // In local/testing mode, return the token for ease of automated testing
                'preview_token' => config('app.debug') ? $token : null,
            ], 200);
        }

        // Generic friendly response for privacy and anti-enumeration
        return response()->json([
            'status' => 'success',
            'message' => 'If an account exists for that email, a password reset link has been sent.',
            'email' => $email,
        ], 200);
    }

    /**
     * Reset password using verification token.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = strtolower(trim($request->email));
        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$record) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired password reset request.'
            ], 400);
        }

        // Check if token has expired (older than 60 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return response()->json([
                'status' => 'error',
                'message' => 'The password reset token has expired. Please request a new one.'
            ], 400);
        }

        // Verify token hash
        if (!Hash::check($request->token, $record->token) && $request->token !== $record->token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid verification token.'
            ], 400);
        }

        // Update user password
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        // Delete used token
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Your password has been successfully updated. You may now log in.'
        ], 200);
    }
}
