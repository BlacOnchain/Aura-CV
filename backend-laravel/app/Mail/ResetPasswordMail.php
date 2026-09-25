<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $resetUrl;
    public string $token;
    public string $userEmail;

    /**
     * Create a new message instance.
     */
    public function __construct(string $resetUrl, string $token, string $userEmail)
    {
        $this->resetUrl = $resetUrl;
        $this->token = $token;
        $this->userEmail = $userEmail;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Reset Your AuraCV Studio Password')
                    ->html("
                        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 16px; background-color: #ffffff;'>
                            <div style='display: flex; align-items: center; margin-bottom: 20px;'>
                                <div style='width: 36px; height: 36px; background-color: #09090b; border-radius: 8px; display: inline-block; vertical-align: middle;'></div>
                                <span style='font-size: 20px; font-weight: bold; margin-left: 10px; color: #09090b;'>AuraCV Studio</span>
                            </div>
                            <h2 style='font-size: 20px; color: #09090b; margin-top: 0;'>Password Reset Request</h2>
                            <p style='font-size: 14px; color: #52525b; line-height: 1.6;'>
                                We received a request to reset the password for your AuraCV Studio account (<strong style='color: #09090b;'>{$this->userEmail}</strong>).
                            </p>
                            <div style='margin: 28px 0; text-align: center;'>
                                <a href='{$this->resetUrl}' style='display: inline-block; padding: 12px 24px; background-color: #09090b; color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: bold;'>Reset Password</a>
                            </div>
                            <p style='font-size: 13px; color: #71717a; line-height: 1.5;'>
                                Or use the following verification token directly in the studio:
                            </p>
                            <div style='background-color: #f4f4f5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #18181b; word-break: break-all; margin-bottom: 20px;'>
                                {$this->token}
                            </div>
                            <p style='font-size: 12px; color: #a1a1aa;'>
                                This password reset link will expire in 60 minutes. If you did not request a password reset, no further action is required.
                            </p>
                            <hr style='border: none; border-top: 1px solid #f4f4f5; margin: 24px 0;' />
                            <p style='font-size: 11px; color: #a1a1aa;'>
                                &copy; 2026 AuraCV Studio. All rights reserved.
                            </p>
                        </div>
                    ");
    }
}
