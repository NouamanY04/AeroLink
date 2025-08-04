<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airline;
use Illuminate\Http\Request;

class AirlineApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Airline::all();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Airline::findOrFail($id);
    }

}
