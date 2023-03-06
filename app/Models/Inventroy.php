<?php

namespace App\Models;

use App\Models\Inventroy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
