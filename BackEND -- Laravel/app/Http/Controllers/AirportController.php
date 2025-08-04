<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
    public function index()
    {
        $airports = Airport::all();
        return view('admin.airports.index', compact('airports'));
    }

    public function create()
    {
        return view('admin.airports.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:10|unique:airports,code',
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
        ]);

        Airport::create([
            'code' => $request->code,
            'name' => $request->name,
            'city' => $request->city,
            'country' => $request->country,
        ]);

        return redirect()->route('airports.index')->with('success', 'Airport added successfully.');
    }

    public function show(Airport $airport)
    {
        return view('admin.airports.show', compact('airport'));
    }

    public function edit(Airport $airport)
    {
        return view('admin.airports.edit', compact('airport'));
    }

    public function update(Request $request, Airport $airport)
    {
        $request->validate([
            'code' => 'required|string|max:10|unique:airports,code,' . $airport->id,
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
        ]);

        $airport->update([
            'code' => $request->code,
            'name' => $request->name,
            'city' => $request->city,
            'country' => $request->country,
        ]);

        return redirect()->route('airports.index')->with('success', 'Airport updated successfully.');
    }

    public function destroy(Airport $airport)
    {
        $airport->delete();
        return redirect()->route('airports.index')->with('success', 'Airport deleted successfully.');
    }
}
