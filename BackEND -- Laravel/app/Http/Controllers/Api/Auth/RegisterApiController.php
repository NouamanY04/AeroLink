<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;    
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterApiController extends Controller
{
    public function register(Request $request)
     {
        Log::info('Registration attempt received:', $request->all());
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        Log::info('Validation passed, creating user with name:', ['name' => $validated['name']]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Log::info('User created successfully:', ['user_id' => $user->id, 'username' => $user->name]);

        return response()->json(['user' => $user], 201);
    }
}