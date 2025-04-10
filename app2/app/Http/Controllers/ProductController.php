<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    public function getProducts()
    {
        $client = new Client();
        $responseOfApi = $client->get("http://localhost:3000/products");
        $response = json_decode($responseOfApi->getBody());

        $response = array_map(function($element) {
            return [
                "nameOfCar" => "{$element->name} - {$element->description}",
                "price" => $element->price,
                "description" => $element->description
            ];
        }, $response);
        return response()->json(
            [
                "msg" => "from of ProductController",
                "response_of_localhost_3000" => $response
            ]
        );
    }
}
