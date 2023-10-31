<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SportsDBService extends Controller
{
    public function getPlayerInfo(string $playerName){

        $baseUrl = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php';

        // Realizar la solicitud GET con el nombre del jugador como parámetro
        $response = Http::get($baseUrl, ['p' => $playerName]);
        $response2 = Http::get('https://randomuser.me/api/', [
            'gender' => 'male',
            'nat' => 'AR'
        ]);
        $userApi = $response2->json()['results'][0];

        // Verificar si la respuesta es exitosa y contiene datos del jugador
        if ($response->successful() && isset($response['player'][0])) {
            return Inertia::render('Jugadores/getplayerinfo', [
                'playerData'=>$response['player'][0],
                'user'=>Auth::user(),
                'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
                'userApi'=>$userApi,
            ]);
        }else{

            return Inertia::render('Jugadores/getplayerinfo', [
                'playerData'=> null,
            ]);  // Retorna null si no se encontraron datos o si ocurrió un error
        }
    }
}