<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientsController extends Controller
{
    public function index()
    {
        $clients = Client::with('user')->get();
        return view('admin.users.index', compact('clients'));
    }

    public function show(Client $client)
    {
        $client->load(['user', 'bookings.flight']);
        return view('admin.clients.show', compact('client'));
    }

    public function bookings(Client $client)
    {
        $bookings = $client->bookings()->with(['flight'])->orderBy('created_at', 'desc')->paginate(10);
        return view('admin.clients.bookings', compact('client', 'bookings'));
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'passport_number' => 'nullable|string|max:50',
        ]);
        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'client',
        ]);
        Client::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'passport_number' => $validated['passport_number'] ?? null,
        ]);
        return redirect()->route('users.index')->with('success', 'Client created successfully.');
    }

    public function edit(Client $user)
    {
        return view('admin.users.edit', ['client' => $user]);
    }

    public function update(Request $request, Client $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->user_id,
            'password' => 'nullable|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'passport_number' => 'nullable|string|max:50',
        ]);
        $user->user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->user->password = Hash::make($validated['password']);
        }
        $user->user->save();
        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'passport_number' => $validated['passport_number'] ?? null,
        ]);
        return redirect()->route('users.index')->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $user)
    {
        $user->user->delete(); // This will also delete the client due to FK
        return redirect()->route('users.index')->with('success', 'Client deleted successfully.');
    }
} 