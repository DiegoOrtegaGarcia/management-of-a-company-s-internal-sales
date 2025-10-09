<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use App\Http\Requests\ProductStorageRequest;
use App\Http\Requests\ProductUpdateRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["products" => new ProductCollection(Product::paginate(10))]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStorageRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('url')) {
            $imagePath = $request->file('url')->store('products', 'public');
            $data['url'] = $imagePath;
        } else {
            $data['url'] = null;
        }

        $product = Product::create($data);
        return response()->json([
            "message" => "Created",
            "product" => new ProductResource($product)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(["product" => new ProductResource($product)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        $oldProduct = Product::findOrFail($id);
        $validatedData = $request->validated();

        $newProductData = [
            'name' => $validatedData['name'] ?? $oldProduct->name,
            'price' => $validatedData['price'] ?? $oldProduct->price,
        ];

        if ($request->hasFile('url')) {
            $imagePath = $request->file('url')->store('products', 'public');
            $newProductData['url'] = $imagePath;
        } else {
            $newProductData['url'] = $oldProduct->url;
        }

        $newProduct = Product::create($newProductData);

        $data = [
            "name" => $newProduct->name,
            "price" => $newProduct->price,
            "url" => $newProduct->url
        ];

        $oldProduct->update($data);

        return response()->json([
            "message" => "Product Updated",
            "product" => new ProductResource($oldProduct)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        Storage::disk('public')->delete($product->url);
        $product->delete();
        return response()->json(["message" => "Product Deleted"]);
    }
}
