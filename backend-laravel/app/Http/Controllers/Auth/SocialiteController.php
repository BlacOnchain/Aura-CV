<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            $user = User::where('email', $googleUser->getEmail())->first();
            
            if ($user) {
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'auth_method' => 'google', // Mark as Google-linked
                ]);
            } else {
                $user = User::create([
                    'email' => $googleUser->getEmail(),
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'auth_method' => 'google',
                    'password' => Hash::make(Str::random(24)),
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            // In a real Laravel Socialite flow for an SPA, you'd often redirect 
            // back to the frontend with the token in a query param or cookie.
            // Given the prompt's request for a "real Google OAuth 2.0 via Laravel Socialite",
            // we'll assume the frontend handled the redirect and this callback 
            // is the final destination which then hands off the token.
            
            $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
            
            return redirect($frontendUrl . '/auth/callback?token=' . $token);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Google authentication failed: ' . $e->getMessage()], 401);
        }
    }
}
