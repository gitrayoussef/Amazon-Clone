<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payement extends Model
{
    use HasFactory;
    protected $table = 'user_payements';
    protected $fillable = [
        'user_id',
        'payment_type',
        'provider',
        'account_no',
        'expiry'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}