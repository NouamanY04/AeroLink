<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Booking::create([
            'client_id' => 1,
            'flight_id' => 1,
            'seat_number' => '12A',
            'status' => 'booked',
            'payment_method' => 'credit_card',
            'card_holder_name' => 'John Doe',
            'card_number' => '4111111111111111',
            'expiry_date' => '12/25',
            'ccv' => '123',
            'paypal_email' => null,
            'price' => 15500,
        ]);
    }
}
