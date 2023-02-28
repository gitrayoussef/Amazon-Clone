<?php

namespace App\Models;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'desc',
        'discount_percent',
        'active'
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
