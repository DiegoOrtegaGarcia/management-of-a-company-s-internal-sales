<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ClientsResource;
use App\Http\Resources\ClientsCollection;
use App\Http\Requests\ClientStorageRequest;
use App\Http\Requests\ClientUpdateRequest;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(new ClientsCollection(Client::all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientStorageRequest $request)
    {
        $client = Client::create($request->validated());
        return response()->json(["message" => "Created", "product"=> new ClientsResource($client)]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::findOrFail($id);
        return new ClientsResource($client);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ClientUpdateRequest $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->validated());

        return response()->json([
            'message' => 'Client updated successfully',
            'Client' => new ClientsResource($client->fresh())
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client -> delete();
        return response()->json(["message"=>"Client Deleted Correctly"]);
    }
}
