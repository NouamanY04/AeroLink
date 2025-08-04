<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FlightsController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\AirlineController;
use App\Http\Controllers\AirportController;


use App\Http\Controllers\Api\FlightApiController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\ClientApiController;
use App\Http\Controllers\Api\AirlineApiController;
use App\Http\Controllers\Api\AirportApiController;
use App\Http\Controllers\Api\Auth\RegisterApiController;

// Homepage redirects to admin dashboard
Route::redirect('/', '/admin/dashboard', 301);

// Admin Dashboard (now public)
Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

// Profile routes (public)
// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
// Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

// Admin Resource Routes (public)
Route::prefix('admin')->group(function () {
    Route::resource('flights', FlightsController::class);
    Route::resource('bookings', BookingsController::class);
    Route::resource('users', ClientsController::class);
    Route::resource('clients', ClientsController::class);
    Route::resource('airlines', AirlineController::class);
    Route::resource('airports', AirportController::class);
});
