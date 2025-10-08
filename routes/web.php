<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/login', function () {
    return Inertia::render('Auth/LoginPage');
})->name('login');


Route::get('/register', function () {
    return Inertia::render('Auth/RegisterPage');
})->name('register');

Route::get('/clients', function () {
    return Inertia::render('Clients/ClientsPage');
})->name('clients');

Route::get('/client/{id}', function ($id) {
    return Inertia::render('Clients/ClientEditPage', [
        'id' => $id
    ]);
})->name('clientsEdit');

Route::get('/products', function () {
    return Inertia::render('Produtcs/ProductsPage');
})->name('clients');
