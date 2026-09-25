<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResumeController;

/*
|--------------------------------------------------------------------------
| API Routes for AuraCV Resume Builder
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/register', [App\Http\Controllers\Auth\AuthController::class, 'register']);
    Route::post('/login', [App\Http\Controllers\Auth\AuthController::class, 'login']);
    Route::post('/forgot-password', [App\Http\Controllers\Auth\PasswordResetController::class, 'sendResetLink']);
    Route::post('/reset-password', [App\Http\Controllers\Auth\PasswordResetController::class, 'resetPassword']);
    Route::get('/auth/google/redirect', [App\Http\Controllers\Auth\SocialiteController::class, 'redirect']);
    Route::get('/auth/google/callback', [App\Http\Controllers\Auth\SocialiteController::class, 'callback']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [App\Http\Controllers\Auth\AuthController::class, 'logout']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Standard RESTful API Resource
        Route::apiResource('resumes', ResumeController::class);
        
        // Bulk Sync
        Route::post('/resumes/bulk-sync', [ResumeController::class, 'bulkSync']);
    });
});
