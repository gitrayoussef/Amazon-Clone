<?php

namespace App\Http\Resources;

use App\Http\Resources\CartResource;
use App\Http\Resources\ProductsResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'Cart-id' => (string)$this->id,
            'attributes' => [
                'product_id' => $this->product_id,
                'session_id' => $this->session_id,
                'quantity' => $this->quantity,
               
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                // /'Product' => $this->Product?->name,/ 
                // 'Category' => new CategoriesResource($this->Category),
                 
            ],
           
        ];
    }
}
