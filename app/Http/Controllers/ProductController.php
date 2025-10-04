<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use App\Http\Requests\ProductStorageRequest;
use App\Http\Requests\ProductUpdateRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["products"=>new ProductCollection(Product::all())]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStorageRequest $request)
    {
        $product = Product::create($request->validated());
        return response()->json(["message" => "Created", "product"=> new ProductResource($product)]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(["product"=> new ProductResource($product)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->validated());
        return response()->json(["message"=> "Product Updated", "product" => new ProductResource($product)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product -> delete();
        return response()->json(["message"=> "Product Deleted"]);
    }
}
