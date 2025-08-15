<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Flight;
use App\Models\Airline;
use App\Models\Airport;
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

        // Get additional statistics
        $totalFlights = Flight::count();
        $totalAirlines = Airline::count();
        $totalAirports = Airport::count();

        // Get recent bookings from Booking with relationships
        $recentBookings = Booking::with(['client', 'flight.departureAirport', 'flight.arrivalAirport'])
            ->latest()
            ->take(5)
            ->get();

        return view('admin.dashboard', compact('totalBookings', 'totalRevenue', 'newUsers', 'totalFlights', 'totalAirlines', 'totalAirports', 'recentBookings'));
    }
}