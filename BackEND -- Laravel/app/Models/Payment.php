<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'payment_method',
        'card_holder_name',
        'card_last4',
        'expiry_date',
        'paypal_email',
        'payment_status',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
