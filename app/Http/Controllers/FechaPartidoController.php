<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\Calendario;
use App\Models\FechaPartido;
use App\Models\Partido;
use Illuminate\Http\Request;

class FechaPartidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(FechaPartido $fechaPartido)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FechaPartido $fechaPartido)
    {
        //
    }

    public function update(Request $request, FechaPartido $fechapartido)
    {//dd($request);
        $partidoJugado = Partido::where('fecha_partido_id', $fechapartido->id)->first();
    
        if ($partidoJugado) {
            $customMessages = [
                'required' => 'El partido ya se ha jugado, debe tener fecha y arbitros.',
                'date' => 'El campo :attribute debe ser una fecha válida.',
                'before_or_equal' => 'El partido ya se ha jugado, debe ser una fecha anterior o igual a hoy.',
            ];
            // Si hay partido jugado, no permitir fechas superiores a hoy.
            $request->validate([
                'fecha' => 'required|date|before_or_equal:today',
                'arbitro_1' => 'required',
                'arbitro_2' => 'required',
            ], $customMessages);
        }
        
        $fechapartido->fecha = $request->fecha;
        $fechapartido->horario = $request->horario;
        $fechapartido->arbitro_1 = $request->arbitro_1;
        $fechapartido->arbitro_2 = $request->arbitro_2;
    
        $fechapartido->save();
    }    

    public function asignarArbitrosTodos($calendarioId)
    {
        $calendario = Calendario::where('id', intval($calendarioId))->get();

        $fechaPartidos = FechaPartido::where('calendario_id', $calendario[0]->id)->get();

        $arbitrosDisponibles = Arbitro::where('id_liga', $calendario[0]->id)->where('confirmado', 1)->get();

        foreach ($fechaPartidos as $fecha) {
            //buscar si este partido ya se jugo
            $partidoJugado = Partido::where('fecha_partido_id', $fecha->id)->first();
            if (!$partidoJugado){
                // Obtén dos árbitros al azar de los disponibles
                $arbitrosAsignados = $arbitrosDisponibles->random(2);
                // Asigna los árbitros a la fecha
                $fecha->arbitro_1=$arbitrosAsignados[0]->id;
                $fecha->arbitro_2=$arbitrosAsignados[1]->id;
                $fecha->save();
            }            
        }
        
    }

    public function destroy(Calendario $calendario)
    {
    }

}
