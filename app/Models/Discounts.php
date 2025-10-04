<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discounts extends Model
{
    use HasFactory;

    protected $fillable = ['porcent', 'available'];


    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
