<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Flight::with(['airline', 'departureAirport', 'arrivalAirport'])->get();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Flight::with(['airline', 'departureAirport', 'arrivalAirport'])->findOrFail($id);
    }

    /**
     * Search for flights based on given criteria.
     */
    public function search(Request $request)
    {
        $query = Flight::with(['airline', 'departureAirport', 'arrivalAirport']);

        if ($request->has('departure_city')) {
            $query->whereHas('departureAirport', function ($q) use ($request) {
                $q->where('city', $request->departure_city);
            });
        }
        if ($request->has('arrival_city')) {
            $query->whereHas('arrivalAirport', function ($q) use ($request) {
                $q->where('city', $request->arrival_city);
            });
        }
        if ($request->has('departure_time')) {
            $query->whereDate('departure_time', $request->departure_time);
        }
        if ($request->has('return_time')) {
            if (!is_null($request->return_time)) {
            $query->whereDate('arrival_time', $request->return_time);
            }
            // If return_time is null, do nothing and just exit the condition
        }

        return $query->get();
    }
}
