<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Payment::with(['booking'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method' => 'required|in:credit_card,paypal',
            'card_holder_name' => 'nullable|string|max:255',
            'card_last4' => 'nullable|string|max:4',
            'expiry_date' => 'nullable|string|max:7',
            'paypal_email' => 'nullable|email|max:255',
            'payment_status' => 'required|in:pending,completed,failed',
        ]);
        $payment = Payment::create($validated);
        
        return response()->json([
            'id' => $payment->id,
            'payment' => $payment->load(['booking'])
        ], 201);
    }

}
