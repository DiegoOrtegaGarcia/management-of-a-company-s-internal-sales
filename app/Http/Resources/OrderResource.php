<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ClientsResource;
use App\Http\Resources\DiscountResource;
use App\Http\Resources\ProductListResource;

class OrderResource extends JsonResource
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
            "clientId" => $this->client_id,
            "productListId" => $this->product_list_id,
            "discountId" => $this->discount_id,
            "subtotal" => $this->subtotal,
            "discountAmount"=> $this->discount_amount,
            "total_amount" => $this->total_amount,
            "client" => new ClientsResource($this->whenLoaded("client")),
            "productList" => new ProductListResource($this->whenLoaded("productList")),
            "discount" => new DiscountResource($this->whenLoaded("discount"))

        ];
    }
}
