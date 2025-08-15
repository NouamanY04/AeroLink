<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    // Your table, fillable, etc.
    protected $fillable = ['name', 'email', 'password','remember_token'];
}