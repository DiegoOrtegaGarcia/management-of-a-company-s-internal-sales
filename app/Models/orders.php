<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'product_list_id',
        'discount_id',
        'subtotal',
        'discount_amount',
        'total_amount',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function productList()
    {
        return $this->belongsTo(ProductList::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discounts::class);
    }

    public function getItemsAttribute()
    {
        return $this->productList->items;
    }

    public function calculateTotals()
    {
        $subtotal = $this->productList->calculateTotal();

        $discountAmount = 0;
        if ($this->discount && $this->discount->available) {
            $discountAmount = $subtotal * ($this->discount->porcent / 100);
        }

        $totalAmount = $subtotal - $discountAmount;

        $this->update([
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount
        ]);

        return $this;
    }

    public static function createOrder($clientId, $productListId, $discountId = null)
    {
        $order = self::create([
            'client_id' => $clientId,
            'product_list_id' => $productListId,
            'discount_id' => $discountId,
        ]);

        return $order->calculateTotals();
    }

    protected $with= [
        "client","productList","discount"
    ];
}
