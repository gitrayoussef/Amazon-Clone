<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{
    use HasApiTokens,HasFactory,Notifiable;
    protected $guard='admin';
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',

    ];


}
