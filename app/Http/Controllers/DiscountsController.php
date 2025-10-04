<?php

namespace App\Http\Controllers;

use App\Models\Discounts;
use Illuminate\Http\Request;
use App\Http\Resources\DiscountCollection;
use App\Http\Resources\DiscountResource;
use App\Http\Requests\DiscountStorageRequest;
use App\Http\Requests\DiscountUpdateRequest;

class DiscountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new DiscountCollection(Discounts::all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DiscountStorageRequest $request)
    {
        $discount = Discounts::create($request->validated());
        return response()->json(["message"=>"Created", "discount"=> new DiscountResource($discount)]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $discount = Discounts::findOrFail($id);
        return new DiscountResource($discount);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiscountUpdateRequest $request, $id)
    {
        $discount = Discounts::findOrFail($id);
        $discount->update($request->validated());

        return response()->json([
            'message' => 'Discount updated successfully',
            'Discount' => new DiscountResource($discount->fresh())
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $discounts = Discounts::findOrFail($id);
        $discounts-> delete();
        return response()->json(["message"=>"Discount Deleted Correctly"]);
    }
}
