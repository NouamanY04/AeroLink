<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\FlightApiController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\ClientApiController;
use App\Http\Controllers\Api\AirlineApiController;
use App\Http\Controllers\Api\AirportApiController;
use App\Http\Controllers\Api\PaymentApiController;
use App\Http\Controllers\Api\ContactApiController;
use App\Http\Controllers\Api\Auth\RegisterApiController;

Route::post('register', [RegisterApiController::class, 'register']);
Route::get('vols/search', [FlightApiController::class, 'search']);
Route::apiResource('vols', FlightApiController::class);
Route::get('clients/search', [ClientApiController::class, 'search']);
Route::put('clients/update/{username}', [ClientApiController::class, 'update']);
Route::post('clients/change-password/{username}', [ClientApiController::class, 'changePassword']);
Route::apiResource('clients', ClientApiController::class);
Route::apiResource('airline', AirlineApiController::class); 
Route::apiResource('aeroport', AirportApiController::class);
Route::apiResource('bookings', BookingApiController::class);
Route::apiResource('payments', PaymentApiController::class);
Route::patch('/bookings/{id}', [BookingApiController::class, 'update']);
Route::apiResource('contact', ContactApiController::class);