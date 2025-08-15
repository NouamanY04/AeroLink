<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Airline;
use App\Models\Airport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FlightsController extends Controller
{
    public function index()
    {
        $flights = Flight::with(['airline', 'departureAirport', 'arrivalAirport'])->paginate(5);
        return view('admin.flights.index', compact('flights'));
    }

    public function create()
    {
        $airlines = Airline::all();
        $airports = Airport::all();
        return view('admin.flights.create', compact('airlines', 'airports'));
    }

    public function store(Request $request)
    {
            $validated = $request->validate([
            'flight_number' => 'required|unique:flights,flight_number',
            'airline_id' => 'required|exists:airlines,id',
            'departure_airport_id' => 'required|exists:airports,id',
            'arrival_airport_id' => 'required|exists:airports,id|different:departure_airport_id',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'status' => 'required|in:scheduled,delayed,cancelled,completed',
            'price' => 'required|numeric|min:0',
            'class' => 'required|in:economy,business,first',
            'type_vol' => 'required|in:Round-trip,One-way',
        ]);
        Flight::create($validated);
        return redirect()->route('flights.index')->with('success', 'Flight created successfully.');
    }

    public function edit(Flight $flight)
    {
        $airlines = Airline::all();
        $airports = Airport::all();
        return view('admin.flights.edit', compact('flight', 'airlines', 'airports'));
    }

    public function update(Request $request, Flight $flight)
    {
        $validated = $request->validate([
            'flight_number' => 'required|unique:flights,flight_number,' . $flight->id,
            'airline_id' => 'required|exists:airlines,id',
            'departure_airport_id' => 'required|exists:airports,id',
            'arrival_airport_id' => 'required|exists:airports,id|different:departure_airport_id',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'status' => 'required|in:scheduled,delayed,cancelled,completed',
            'price' => 'required|numeric|min:0',
            'class' => 'required|in:economy,business,first',
            'type_vol' => 'nullable|in:Round-trip,One-way',
        ]);
        $flight->update($validated);
        return redirect()->route('flights.index')->with('success', 'Flight updated successfully.');
    }

    public function destroy(Flight $flight)
    {
        $flight->delete();
        return redirect()->route('flights.index')->with('success', 'Flight deleted successfully.');
    }
} 