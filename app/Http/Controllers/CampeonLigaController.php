<?php

namespace App\Http\Controllers;

use App\Models\CampeonLiga;
use App\Models\Equipo;
use App\Models\TablaPosiciones;
use Illuminate\Http\Request;

class CampeonLigaController extends Controller
{
   
    public function store(Request $request)
    {
        $tablaPosiciones = TablaPosiciones::where('liga_id', $request->id_liga)->where('posicion',1)->first();

        $campeon = new CampeonLiga([
            'liga_id'=>$request->id_liga,
            'equipo_id'=>$tablaPosiciones->equipo_id
        ]);

        $campeon->save();
    }

}
