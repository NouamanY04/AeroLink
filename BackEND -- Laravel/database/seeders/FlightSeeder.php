<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Flight;

class FlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Flight::create([
            'flight_number' => 'FC328',
            'airline_id' => 2,
            'departure_airport_id' => 1,
            'arrival_airport_id' => 2,
            'departure_time' => '2025-07-12 10:00:00',
            'arrival_time' => '2025-07-12 23:15:00',
            'status' => 'scheduled',
            'price' => 2000,
            'class' => 'economy',
            'stops' => 2,
            'type_vol' => 'Round-trip',
        ]);
        
    }
}
