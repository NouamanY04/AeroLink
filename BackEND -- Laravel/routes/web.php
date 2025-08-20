<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FlightsController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\AirlineController;
use App\Http\Controllers\AirportController;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\Api\FlightApiController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\ClientApiController;
use App\Http\Controllers\Api\AirlineApiController;
use App\Http\Controllers\Api\AirportApiController;
use App\Http\Controllers\Api\Auth\RegisterApiController;

// Homepage redirects to admin dashboard
Route::redirect('/', '/admin/dashboard', 301);

// Admin Authentication Routes (public)
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

// Protected Admin Routes
Route::middleware('admin')->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminAuthController::class, 'dashboard'])->name('admin.dashboard');
    
    // Resource Routes
    Route::resource('flights', FlightsController::class);
    Route::resource('bookings', BookingsController::class);
    Route::resource('users', ClientsController::class);
    Route::resource('clients', ClientsController::class);
    Route::resource('contacts', \App\Http\Controllers\Admin\ContactRequestController::class)->only(['index', 'show', 'destroy']);

    // Additional client routes
    Route::get('/clients/{client}/bookings', [ClientsController::class, 'bookings'])->name('clients.bookings');
    
    Route::resource('airlines', AirlineController::class);
    Route::resource('airports', AirportController::class);
});