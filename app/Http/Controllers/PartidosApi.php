<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http; // Importa la clase Http
use Inertia\Inertia;

class PartidosApi extends Controller
{
    public function index()
    {
        $response = Http::withHeaders([
            "X-RapidAPI-Host" => "free-nba.p.rapidapi.com",
            "X-RapidAPI-Key" => "ab030fc997mshb71798366d8f87dp190df2jsnb6b20eaa11bd"
        ])->get("https://free-nba.p.rapidapi.com/games?page=0&per_page=10");

        if ($response->failed()) {
            $partidos = ["error" => "No se pudo obtener los datos"];
        } else {
            $partidos = $response->json();
        }


        if (Auth::check()) {
            $miLiga = Liga::where('user_id', Auth::user()->id)->get();
        } else {
            $miLiga = null;
        }
        
        return Inertia::render('PartidosApi', [
            'partidos' => $partidos,
            'auth' => Auth::user(),
            'liga' => Liga::all(),
            'miLiga' => $miLiga,
        ]);
    }
}
