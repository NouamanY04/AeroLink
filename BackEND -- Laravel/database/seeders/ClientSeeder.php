<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::create([
            'user_id' => null,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '123456789',
            'country' => 'Germany',
            'city' => 'Frankfurt',
        ]);
        Client::create([
            'user_id' => null,
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '987654321',
            'country' => 'Spain',
            'city' => 'Madrid',
        ]);
    }
}
