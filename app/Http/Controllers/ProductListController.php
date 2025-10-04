<?php

namespace App\Http\Controllers;

use App\Models\ProductList;
use App\Models\Product;
use App\Models\ProductListItem;
use Illuminate\Http\Request;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductListCollection;
use App\Http\Requests\ProductCreateUpdateRequest;

class ProductListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["product_lists" => new ProductListCollection(ProductList::all())]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductCreateUpdateRequest $request)
    {
        $request->validated();

        $productList = ProductList::create();

        if ($request->has('products')) {
            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                if ($product && $productData['quantity'] > 0) {
                    $productList->addProduct($productData['product_id'], $productData['quantity']);
                }
            }
        };

        return response()->json([
            "message" => "List Created",
            "product_list" => new ProductListResource($productList)
        ], 201);
    }

    /**
     * Add product to existing list
     */
    public function addProduct(Request $request, $id)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $productList = ProductList::findOrFail($id);
        $productListItem = $productList->addProduct($request->product_id, $request->quantity);

        return response()->json([
            "message" => "Product added to list",
            "item" => new ProductListResource($productList)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $productList = ProductList::findOrFail($id);

        return response()->json([
            "product_list" => new ProductListResource($productList),
            "total" => $productList->calculateTotal()
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ProductCreateUpdateRequest $request, $id)
    {
        $request->validated();

        $productList = ProductList::findOrFail($id);


        if ($request->has('products')) {
            $productList->items()->delete();

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                if ($product && $productData['quantity'] > 0) {
                    $productList->addProduct($productData['product_id'], $productData['quantity']);
                }
            }
        }

        return response()->json([
            "message" => "List updated successfully",
            "product_list" => new ProductListResource($productList)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productList = ProductList::findOrFail($id);
        $productList->items()->delete();
        $productList->delete();

        return response()->json([
            "message" => "Product list deleted successfully"
        ]);
    }

    /**
     * Remove a product from the list
     */
    public function removeProduct($listId, $itemId)
    {
        $productList = ProductList::findOrFail($listId);
        $item = $productList->items()->findOrFail($itemId);
        $item->delete();

        return response()->json([
            "message" => "Product removed from list"
        ]);
    }

    /**
     * Update product quantity in list
     */
    public function updateProductQuantity(Request $request, $listId, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $productList = ProductList::findOrFail($listId);
        $item = $productList->items()->findOrFail($itemId);
        $item->update(['quantity' => $request->quantity]);

        return response()->json([
            "message" => "Product quantity updated",
        ]);
    }

    /**
     * Clear all products from list
     */
    public function clearList($id)
    {
        $productList = ProductList::findOrFail($id);
        $productList->items()->delete();

        return response()->json([
            "message" => "All products removed from list",
            "product_list" => new ProductListResource($productList)
        ]);
    }

}
