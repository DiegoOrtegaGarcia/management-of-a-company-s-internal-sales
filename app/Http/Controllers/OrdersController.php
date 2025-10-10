<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\OrderStorageRequest;
use App\Http\Requests\OrderUpdateRequest;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["orders" => new OrderCollection(Orders::all())]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderStorageRequest $request)
    {
        $request->validated();

        $order = Orders::createOrder(
            $request->client_id,
            $request->product_list_id,
            $request->discount_id
        );

        return response()->json(["message" => "Order Created Succesfully", "order" => new OrderResource($order)]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Orders::findOrFail($id);
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderUpdateRequest $request, $id)
    {
        if ($request->has('discount_id') && $request->discount_id != $order->discount_id) {
            $updateData['discount_id'] = $request->discount_id;
        }
        if (!empty($updateData)) {
            $order->update($updateData);
            $order->calculateTotals();
        }
        $order->load(['client', 'productList.items', 'discount']);
        return response()->json([
            'message' => 'Order updated successfully',
            'order' => new OrderResource($order)
        ]);
    };

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Orders::findOrFail($id);
        $order->delete();
        return response()->json(["message" => "Order Deleted Correctly"]);
    }
}
