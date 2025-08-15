<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AirlineController extends Controller
{
    public function index()
    {
        $airlines = Airline::paginate(5);
        return view('admin.airlines.index', compact('airlines'));
    }

    public function create()
    {
        return view('admin.airlines.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:airlines,code',
            'country' => 'required|string|max:100',
            'image' => 'nullable|image|max:2048',
        ]);

        $airline = new Airline();
        $airline->name = $request->name;
        $airline->code = $request->code;
        $airline->country = $request->country;

        if ($request->hasFile('image')) {
            $airline->image = $request->file('image')->store('airlines', 'public');
        }

        $airline->save();

        return redirect()->route('airlines.index')->with('success', 'Airline created successfully.');
    }

    public function show(Airline $airline)
    {
        return view('admin.airlines.show', compact('airline'));
    }

    public function edit(Airline $airline)
    {
        return view('admin.airlines.edit', compact('airline'));
    }

    public function update(Request $request, Airline $airline)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:airlines,code,' . $airline->id,
            'country' => 'required|string|max:100',
            'image' => 'nullable|image|max:2048',
        ]);

        $airline->name = $request->name;
        $airline->code = $request->code;
        $airline->country = $request->country;

        if ($request->hasFile('image')) {
            if ($airline->image) {
                Storage::disk('public')->delete($airline->image);
            }
            $airline->image = $request->file('image')->store('airlines', 'public');
        }

        $airline->save();

        return redirect()->route('airlines.index')->with('success', 'Airline updated successfully.');
    }

    public function destroy(Airline $airline)
    {
        if ($airline->image) {
            Storage::disk('public')->delete($airline->image);
        }

        $airline->delete();

        return redirect()->route('airlines.index')->with('success', 'Airline deleted successfully.');
    }
}