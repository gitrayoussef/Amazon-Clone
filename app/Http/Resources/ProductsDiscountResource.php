<?php

namespace App\Http\Resources;

use App\Http\Resources\ProductsDiscountResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsDiscountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'Discount-id' => (string)$this->id,
            'attributes' => [
                'name' => $this->name,
                'desc' => $this->desc,
                'discount_percent' => $this->discount_percent,
                'active' => $this->active,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,



                 
            ],
           
        ];
    }
}
