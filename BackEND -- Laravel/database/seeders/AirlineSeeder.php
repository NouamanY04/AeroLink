<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Airline;


class AirlineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Airline::create([
            'name' => 'Air France',
            'code' => 'AF',
            'country' => 'France',
            'image' => null,
        ]);
        Airline::create([
            'name' => 'British Airways',
            'code' => 'BA',
            'country' => 'UK',
            'image' => null,
        ]);
    }
}
