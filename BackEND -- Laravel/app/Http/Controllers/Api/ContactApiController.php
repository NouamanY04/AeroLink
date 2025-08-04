<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Models\User;

class ContactApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contact::with(['user'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Find user by email
        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Store contact using mass assignment
        Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'user_id' => $user->id,
        ]);

        return response()->json(['message' => 'Contact_Request saved successfully.'], 201);
    }

}
