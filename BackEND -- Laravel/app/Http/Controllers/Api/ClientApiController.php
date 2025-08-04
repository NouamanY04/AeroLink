<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;


class ClientApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Client::with('user')->get();
    }

    /**
     * Search for clients by username.
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
        ]);

        $username = $validated['username'];

        // Search for users with matching username
        $users = User::where('name', 'LIKE', "%{$username}%")
                    ->orWhere('email', 'LIKE', "%{$username}%")
                    ->get();

        // Get clients associated with these users
        $clients = Client::whereIn('user_id', $users->pluck('id'))
                        ->with('user')
                        ->get();

        return response()->json([
            'success' => true,
            'data' => $clients,
            'count' => $clients->count(),
            'search_term' => $username
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Incoming client creation request:', $request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|exists:users,email',
            'phone' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'passport_number' => 'nullable|string|max:50',
        ]);

        // Find the existing user by email
        $user = User::where('email', $validated['email'])->first();
        Log::info('User found for client creation:', ['user' => $user]);

        // Check if client already exists for this user
        $client = Client::where('user_id', $user->id)->first();

        if ($client) {
            // Optionally update client info here if needed
            return response()->json($client->load('user'), 200);
        }

        // Create the client associated with this user
        $client = Client::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'email' => $user->email,
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'city' => $validated['city'] ?? null,
            'passport_number' => $validated['passport_number'] ?? null,
        ]);

        return response()->json($client->load('user'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Client::with('user')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $username)
    {
        // Find the user by username (name or email)
        $user = User::where('name', 'LIKE', "%{$username}%")
                    ->orWhere('email', 'LIKE', "%{$username}%")
                    ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found with the provided username'
            ], 404);
        }

        // Find the client associated with this user
        $client = Client::where('user_id', $user->id)->first();

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found for this user'
            ], 404);
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'phone' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'passport_number' => 'nullable|string|max:50',
        ]);

        // Update user information
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        // Update client information
        $client->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'city' => $validated['city'] ?? null,
            'passport_number' => $validated['passport_number'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'data' => $client->fresh('user'),
            'message' => 'Client updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->user->delete();
        return response()->json(['message' => 'Client deleted']);
    }

    /**
     * Change password for a client by username.
     */
    public function changePassword(Request $request, $username)
    {
        // Find the user by username (name or email)
        $user = User::where('name', 'LIKE', "%{$username}%")
                    ->orWhere('email', 'LIKE', "%{$username}%")
                    ->first();

        Log::info('User search debug', [
            'search_username' => $username,
            'user_found' => $user ? 'yes' : 'no',
            'user_id' => $user ? $user->id : null,
            'user_name' => $user ? $user->name : null,
            'user_email' => $user ? $user->email : null
        ]);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found with the provided username'
            ], 404);
        }

        // Find the client associated with this user
        $client = Client::where('user_id', $user->id)->first();

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found for this user'
            ], 404);
        }

        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
            'new_password_confirmation' => 'required|string|min:8',
        ]);

        Log::info('Password check debug', [
            'current_password_provided' => $validated['current_password'],
            'user_password_hash' => $user->password,
            'hash_check_result' => Hash::check($validated['current_password'], $user->password)
        ]);

        // Verify current password
        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 400);
        }

        // Check if new password is different from current password
        if (Hash::check($validated['new_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'New password must be different from current password'
            ], 400);
        }

        // Update password
        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }
}