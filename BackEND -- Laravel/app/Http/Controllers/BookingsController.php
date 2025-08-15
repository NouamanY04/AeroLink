<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Flight;
use Illuminate\Http\Request;

class BookingsController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['client', 'flight'])->paginate(6);
        return view('admin.bookings.index', compact('bookings'));
    }

    public function create()
    {
        $clients = Client::all();
        $flights = Flight::all();
        return view('admin.bookings.create', compact('clients', 'flights'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'flight_id' => 'required|exists:flights,id',
            'seat_number' => 'nullable|string|max:255',
            'status' => 'required|in:booked,cancelled,checked-in,confirmed',
        ]);

        Booking::create($validated);

        return redirect()->route('bookings.index')->with('success', 'Booking created successfully.');
    }

    // Add other methods (edit, update, destroy) as needed
}