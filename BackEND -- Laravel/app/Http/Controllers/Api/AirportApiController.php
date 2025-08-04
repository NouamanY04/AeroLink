<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use Illuminate\Http\Request;

class AirportApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Airport::all();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Airport::findOrFail($id);
    }

}
