<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Airport;

class AirportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Airport::create([
            'code' => 'CDG',
            'name' => 'Charles de Gaulle Airport',
            'city' => 'Paris',
            'country' => 'France',
        ]);
        Airport::create([
            'code' => 'LHR',
            'name' => 'London Heathrow Airport',
            'city' => 'London',
            'country' => 'UK',
        ]);
    }
}
