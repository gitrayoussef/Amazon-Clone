<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventroy extends Model
{
    use HasFactory;
    
    protected $table = 'product_inventories';
    protected $fillable = [
        'quantity'
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
