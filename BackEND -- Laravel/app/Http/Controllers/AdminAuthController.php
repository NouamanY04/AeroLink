<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * Show the admin login form
     */
    public function showLoginForm()
    {
        return view('auth.login');
    }

    /**
     * Handle admin login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::guard('admin')->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            
            return redirect()->intended(route('admin.dashboard'))
                ->with('success', 'Welcome back, Admin!');
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials do not match our records.'],
        ]);
    }

    /**
     * Handle admin logout
     */
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('admin.login')
            ->with('success', 'You have been successfully logged out.');
    }

    /**
     * Show admin dashboard (protected route)
     */
    public function dashboard()
    {
        $admin = Auth::guard('admin')->user();
        
        // Get dashboard statistics
        $totalBookings = \App\Models\Booking::count();
        $totalRevenue = \App\Models\Booking::sum('price');
        $newUsers = \App\Models\User::count();
        $totalFlights = \App\Models\Flight::count();
        $totalAirlines = \App\Models\Airline::count();
        $totalAirports = \App\Models\Airport::count();
        
        // Get recent bookings
        $recentBookings = \App\Models\Booking::with(['client', 'flight.departureAirport', 'flight.arrivalAirport'])
            ->latest()
            ->take(5)
            ->get();

        return view('admin.dashboard', compact(
            'admin',
            'totalBookings',
            'totalRevenue', 
            'newUsers',
            'totalFlights',
            'totalAirlines',
            'totalAirports',
            'recentBookings'
        ));
    }

}