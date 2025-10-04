<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductList extends Model
{
    use HasFactory;

    public function items()
    {
        return $this->hasMany(ProductListItem::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function calculateTotal()
    {
        return $this->items->sum(function($item) {
            return $item->quantity * $item->unit_price;
        });
    }

    public function addProduct($productId, $quantity)
    {
        $product = Product::findOrFail($productId);

        return $this->items()->create([
            'product_id' => $product->id,
            'product_name' => $product->name,
            'unit_price' => $product->price,
            'quantity' => $quantity
        ]);
    }
     protected $with = ["items"];
}
