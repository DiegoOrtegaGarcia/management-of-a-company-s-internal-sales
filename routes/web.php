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
