<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Flight;

class BookingApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Booking::with(['client', 'flight'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'client_email' => 'required|email|exists:clients,email',
        'flight_id' => 'required|exists:flights,id',
        'seat_number' => 'nullable|string|max:10',
        'booking_status' => 'required|in:booked,cancelled,checked-in,confirmed',
        'booking_date' => 'required|date',
        'payment_method' => 'required|in:credit_card,paypal',
        ]);

        $client = Client::where('email', $validated['client_email'])->first();
        if (!$client) {
            return response()->json(['error' => 'Client not found.'], 404);
        }

        $flight = Flight::find($validated['flight_id']);
        if (!$flight) {
            return response()->json(['error' => 'Flight not found.'], 404);
        }

        $booking = Booking::create([
            'client_id' => $client->id,
            'flight_id' => $flight->id,
            'seat_number' => $validated['seat_number'] ?? null,
            'booking_status' => $validated['booking_status'],
            'booking_date' => $validated['booking_date'],
            'payment_method' => $validated['payment_method'],
            'price' => $flight->price,
        ]);

        return response()->json([
            'id' => $booking->id,
            'booking' => $booking->load(['client', 'flight']),
        ], 201);
    }
    
    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->payment_id = $request->input('payment_id');
        $booking->save();
    
        return response()->json($booking);
    }

}
