<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShoppingResource extends JsonResource
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
            'shopping' => (string)$this->id,
            'attributes' => [
                'user_id' => $this->user_id,
                'total' => $this->total,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                 
            ],
           
        ];
}
}