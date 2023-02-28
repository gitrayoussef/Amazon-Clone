<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'desc',
        'category_id',
        'inventory_id',
        'price',
        'rating',
        'discount_id',
        'image',
        'imagepath',
        
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function inventory()
    {
        return $this->belongsTo(Inventroy::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
