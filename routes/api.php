<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\API\AuthenticationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\DiscountsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrdersController;

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('user', [AuthenticationController::class, 'userInfo']);
    Route::post('logout', [AuthenticationController::class, 'logOut']);
    Route::apiResource("/clients",ClientController::class);
    Route::apiResource("/products",ProductController::class);
    Route::post('products/{id}', [ProductController::class, 'update']);
    Route::apiResource("/discount",DiscountsController::class);
    Route::apiResource("/orders",OrdersController::class);
    Route::apiResource("/listProducts",ProductListController::class);
    Route::post("/listProduct/addProduct/{id}",[ProductListController::class,"addProduct"]);
    Route::delete("/listProduct/removeProduct/{listId}/{itemId}",[ProductListController::class, "removeProduct"]);
    Route::post("/listProduct/updateProductQuantity/{listId}/{itemId}", [ProductListController::class, "updateProductQuantity"]);

});

