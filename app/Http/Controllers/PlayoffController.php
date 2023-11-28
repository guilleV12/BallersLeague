<?php

namespace App\Http\Controllers;

use App\Models\CampeonLiga;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\FechaPartidoPlayoff;
use App\Models\Playoff;
use App\Models\TablaPosiciones;
use App\Models\VotacionJMV;
use Illuminate\Http\Request;

class PlayoffController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);
        $request->validate([
            'cantidad_equipos' => 'required|numeric',
            'cantidad_partidos' => 'required|numeric',
            'liga_id' => 'required',
        ]);

        $playoff = Playoff::where('liga_id',$request->liga_id)->get();

        if (!(count($playoff) > 0)){
            $playoff = new Playoff([
                'liga_id' => $request->liga_id,
                'cantidad_equipos' => $request->cantidad_equipos,
                'cantidad_partidos' => $request->cantidad_partidos,
            ]);
            $playoff->save();
            $playoff = Playoff::where('liga_id', $request->liga_id)->get();
        }

        if ($request->regenerarPlayoffs == true){
            FechaPartidoPlayoff::where('playoffs_id', $playoff[0]->id)->delete();
            $playoff[0]->cantidad_equipos = $request->cantidad_equipos;
            $playoff[0]->cantidad_partidos = $request->cantidad_partidos;
            $playoff[0]->save();
        }

        //cuando se genera es porque se jugaron todos los partidos de fase regular por lo tanto se obtiene los equipos clasificados segun posicion
        $equiposClasificados = TablaPosiciones::where('liga_id', $request->liga_id)
            ->orderBy('posicion')
            ->take($request->cantidad_equipos)
            ->get();
        
        //GENERAR PARTIDOS PLAYOFFS "PRIMERA RONDA"
        $equiposCruces = [];
        foreach ($equiposClasificados as $equipo) {
            $equiposCruces[] = Equipo::where('id', $equipo->equipo_id)->first();
        }
        $this->generarCruces($equiposCruces, $request->cantidad_partidos, $request->cantidad_equipos, $playoff[0]->id);

        $campeon = CampeonLiga::where('liga_id',$request->liga_id)->first();
        if ($campeon){
            $campeon->delete();
            $mvp = VotacionJMV::where('liga_id', $request->liga_id)->get();
            if ($mvp){
                $mvp->each->delete();
            }
        }
        
    }

    public function generarCruces($equipos, $cantidad_partidos, $cantidad_equipos, $playoffId)
    {//dd($equipos);
        $cruces = [];
    
       // Calcula la ronda en función de la cantidad de equipos
        $ronda = log($cantidad_equipos, 2);

        // Redondea hacia arriba si la cantidad de equipos no es una potencia exacta de 2
        if (!is_int($ronda)) {
            $ronda = ceil($ronda);
        }

        //cruces
        for ($i = 0; $i < ($cantidad_equipos/2) ; $i++){
            //obtener equipos c/cruce
            $equipo_1 = Equipo::where('id',$equipos[$i]->id)->first();
            $equipo_2 = Equipo::where('id',$equipos[$cantidad_equipos-1-$i]->id)->first();

            for ($e = 0 ; $e < ($cantidad_partidos) ; $e++){
                $fechaPartidoPlayoff = new FechaPartidoPlayoff([
                    'playoffs_id' => $playoffId,
                    'equipo_1' => $equipo_1->id,
                    'equipo_2' => $equipo_2->id,
                    'arbitro_1' => null,
                    'arbitro_2' => null,
                    'fecha' => null,
                    'horario' => null,
                    'ronda' => $ronda,
                ]);
                $fechaPartidoPlayoff->save();
            }

            $cruces[] = $fechaPartidoPlayoff;
            //Asignar fechas y horas
            $this->asignarFechasHoras($cantidad_equipos/2, $playoffId, $cantidad_partidos, $ronda);
        }

        return $cruces;
    }

    public function destroyPlayoffsFechas(Playoff $playoff)
    {
        //$goleadores = Goleadores::where('liga_id', $calendario->liga_id)->get();
        //foreach ($goleadores as $goleador) {
        //    $goleador->puntos = 0;
        //    $goleador->cantidad_partidos = 0;
        //    $goleador->promedio = 0;
        //    $goleador->save();
        //}
        //dd($playoff);
        FechaPartidoPlayoff::where('playoffs_id', $playoff->id)->delete();
        $campeon = CampeonLiga::where('liga_id',$playoff->liga_id)->first();

        if ($campeon){
            $campeon->delete();
        }
    }

    public function generarFechasHorarios($numDias, $vueltas, $diasExtras) 
    {
        $fechasHorarios = [];
    
        // Obtener la fecha actual
        $fechaActual = now(); // O utiliza Carbon::now() si estás utilizando Carbon.
        $fechaActual->addDays($diasExtras);
    
        for ($i = 0; $i < ($numDias*$vueltas); $i++) {
            // Clonar la fecha actual para evitar modificar la original
            $fecha = $fechaActual->copy();
    
            // Agregar fechas y horarios para dos partidos por día
                // Agregar el horario a las 21:00
                $fecha->setTime(21, 0, 0);
                $fechasHorarios[] = ['fecha' => $fecha->format('Y-m-d'), 'hora' => $fecha->format('H:i:s')];
    
                // Agregar el horario a las 22:30
                $fecha->setTime(22, 30, 0);
                $fechasHorarios[] = ['fecha' => $fecha->format('Y-m-d'), 'hora' => $fecha->format('H:i:s')];
    
            // Avanzar al siguiente día
            $fechaActual->addDay();

        }
        return $fechasHorarios;
    }

    public function asignarFechasHoras($numDias, $playoffId, $vueltas, $ronda)
    {
            $fechaPartidos = FechaPartidoPlayoff::where('playoffs_id', $playoffId)->where('ronda',$ronda)->get();
            $cantPartidos = FechaPartidoPlayoff::where('playoffs_id', $playoffId)->count();
            $diasExtras = 0;
            
            if ($cantPartidos > 1){
                $diasExtras = floor($cantPartidos / 2);
            }
            
            $arrayFechasHorarios = $this->generarFechasHorarios($numDias, $vueltas, $diasExtras);
        
            for ($i = 0;$i < count($fechaPartidos); $i++) {
                if ($fechaPartidos[$i]->fecha !== null){
                    $fechaPartidos[$i]->fecha = $arrayFechasHorarios[$i]['fecha'];
                    $fechaPartidos[$i]->horario = $arrayFechasHorarios[$i]['hora'];
                    $fechaPartidos[$i]->save();
                }
            }

    }

}
