<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'url'];

    public function productListItems()
    {
        return $this->hasMany(ProductListItem::class);
    }

    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price / 100, 2);
    }
}
