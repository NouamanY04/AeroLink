<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Client;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total bookings from Booking
        $totalBookings = Booking::count();

        // Calculate total revenue from Booking prices
        $totalRevenue = Booking::sum('price');

        $newUsers = Client::count();

        // Get recent bookings from Booking
        $recentBookings = Booking::latest()->take(5)->get();

        return view('admin.dashboard', compact('totalBookings', 'totalRevenue', 'newUsers', 'recentBookings'));
    }
}