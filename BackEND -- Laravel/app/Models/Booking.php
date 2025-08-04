<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'flight_id',
        'seat_number',
        'status',
        'booking_date',
        'price',
        'payment_method',
        'payment_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}