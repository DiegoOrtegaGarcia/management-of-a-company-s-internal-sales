<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductListItem extends Model
{
     use HasFactory;

    protected $fillable = [
        'product_list_id',
        'product_id',
        'product_name',
        'unit_price',
        'quantity'
    ];

    public function productList()
    {
        return $this->belongsTo(ProductList::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getSubtotalAttribute()
    {
        return $this->quantity * $this->unit_price;
    }

    public function getDisplayNameAttribute()
    {
        return $this->product ? $this->product->name : $this->product_name;
    }
}
