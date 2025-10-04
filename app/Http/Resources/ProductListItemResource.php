<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductResource;

class ProductListItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "productId" => $this->product_id,
            "productName" => $this->product_name,
            "unitPrice" => $this->unit_price,
            "quantity" => $this->quantity,
            "subtotal" => $this->subtotal,
            "product" => new ProductResource($this->whenLoaded('product')),
        ];
    }
}
