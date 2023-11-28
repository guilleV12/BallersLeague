<?php

namespace App\Http\Controllers;

use App\Models\CampeonLiga;
use App\Models\Equipo;
use App\Models\FechaPartidoPlayoff;
use App\Models\Goleadores;
use App\Models\JugadorPartido;
use App\Models\Liga;
use App\Models\PartidosPlayoff;
use App\Models\Playoff;
use App\Models\VotacionJMV;
use Illuminate\Http\Request;

class PartidosPlayoffController extends Controller
{
    public function store(Request $request)
    {
        //dd($request);
        $request->validate([
            //puntajes
            'puntaje_equipo_1' => 'required|min:0',
            'puntaje_equipo_2' => 'required|min:0',
            //id equipos
            'equipo_1' => 'required',
            'equipo_2' => 'required',
            //id fecha partido
            'fecha_partido_id' => 'required',
        ]);

        //validar puntos no negativos
        $this->validarPuntosNoNegativos($request);

        // Validar que haya al menos 5 jugadores por equipo que no sean nulos
        $jugadoresEquipo1 = [];
        $jugadoresEquipo2 = [];
        for ($i = 1; $i <= 12; $i++) {
            // Verifica si el jugador del equipo 1 no es nulo y lo agrega al arreglo de jugadores del equipo 1
            if ($request->has("jugador_".$i."_equipo_1") && $request->input("jugador_".$i."_equipo_1")) {
                $jugadoresEquipo1[] = $request->input("jugador_".$i."_equipo_1");
            }

            // Verifica si el jugador del equipo 2 no es nulo y lo agrega al arreglo de jugadores del equipo 2
            if ($request->has("jugador_".$i."_equipo_2") && $request->input("jugador_".$i."_equipo_2")) {
                $jugadoresEquipo2[] = $request->input("jugador_".$i."_equipo_2");
            }
        }

        // Verificar que haya al menos 5 jugadores por equipo
        if (count($jugadoresEquipo1) < 5 || count($jugadoresEquipo2) < 5) {
            // Aquí puedes manejar la lógica para mostrar un mensaje de error o hacer cualquier otra acción
            $messages = [
                'required' => 'Debe tener al menos 5 jugadores por equipo e ingresar sus puntos.',
            ];
            $request->validate([
                'jugador_1_equipo_1' => 'required',
                'jugador_2_equipo_1' => 'required',
                'jugador_3_equipo_1' => 'required',
                'jugador_4_equipo_1' => 'required',
                'jugador_5_equipo_1' => 'required',
                'jugador_1_equipo_2' => 'required',
                'jugador_2_equipo_2' => 'required',
                'jugador_3_equipo_2' => 'required',
                'jugador_4_equipo_2' => 'required',
                'jugador_5_equipo_2' => 'required',
            ], $messages);
        }

        //crear partido y tabla jugador partido para actualizar tabla de goleadores
        $partido = $this->crearPartido($request);

        //tabla jugadorpartido por cada jugador actualizar sus puntos en la tabla goleadores
        for ($index = 1; $index <= count($jugadoresEquipo1); $index++) {
            $fieldName = "puntos_equipos_1_jugador_" . $index;
            $puntos = $request->$fieldName;
            $this->crearJugadorPartido($jugadoresEquipo1[$index-1], $partido->id, $puntos);
        }        
        for ($index = 1; $index <= count($jugadoresEquipo2); $index++) {
            $fieldName = "puntos_equipos_2_jugador_" . $index;
            $puntos = $request->$fieldName;
            $this->crearJugadorPartido($jugadoresEquipo2[$index-1], $partido->id, $puntos);
        }  

        //REVISAR SI TERMINO LA RONDA
        $ultimafechapartido = FechaPartidoPlayoff::where('id',$partido->fecha_partido_playoffs_id)->first();
        $fechapartidoplayoffs = FechaPartidoPlayoff::where('playoffs_id',$request->calendario_id)->get();
        $partidoplayoffs = PartidosPlayoff::where('playoffs_id',$request->calendario_id)->get();
        if (count($fechapartidoplayoffs) == count($partidoplayoffs)){
            //manejo fin de ronda
            $this->manejarFinalDeRonda($partido, $request, $ultimafechapartido);
        }
        
    }

    public function manejarFinalDeRonda($partido,Request $request, $ultimafechapartido )
    {
        //si termino se genera la siguiente ronda  
            $fechapartidoplayoffsRonda = FechaPartidoPlayoff::where('playoffs_id',$request->calendario_id)->where('ronda',$ultimafechapartido->ronda)->get();
            $equiposGanadores = $this->obtenerEquiposGanadores($fechapartidoplayoffsRonda, $request->calendario_id);
            //VER SI YA ES LA FINAL
            if ($ultimafechapartido->ronda == 1){
                //CREAR TABLA GANADOR
                $arrayFormato[]=$ultimafechapartido;
                $equipoCampeon = $this->obtenerEquiposGanadores($arrayFormato, $request->calendario_id);
                $playoffs = Playoff::where('id',$request->calendario_id)->first();
                $campeonLiga = new CampeonLiga([
                    'equipo_id' => $equipoCampeon[0]->id,
                    'liga_id' => $playoffs->liga_id,
                ]);
                $campeonLiga->save();

            }else{
                $this->generarSiguienteRonda($equiposGanadores, $request->calendario_id);
            }
    }

    public function generarSiguienteRonda($equipos, $playoffId)
    {
        $playoff = new PlayoffController();
        $playoffModel = Playoff::where('id',$playoffId)->first();
        $playoff->generarCruces($equipos, $playoffModel->cantidad_partidos, count($equipos), $playoffId);
    }

    private function obtenerEquiposGanadores($fechapartidoplayoffs, $playoffId)
    {
        $playoff = Playoff::where('id', $playoffId)->first();
        $equiposGanadores = [];
    
        foreach ($fechapartidoplayoffs as $fecha) {
            $llaveplayoff = FechaPartidoPlayoff::where('equipo_1', $fecha->equipo_1)
                ->where('equipo_2', $fecha->equipo_2)
                ->get();
    
            $cantidadPartidosGanadosEquipo1 = 0;
            $cantidadPartidosGanadosEquipo2 = 0;
    
            foreach ($llaveplayoff as $fechaLlave) {
                $partido = PartidosPlayoff::where('fecha_partido_playoffs_id', $fechaLlave->id)->first();
                $cantidadPartidosGanadosEquipo1 += ($partido->puntaje_equipo_1 > $partido->puntaje_equipo_2) ? 1 : 0;
                $cantidadPartidosGanadosEquipo2 += ($partido->puntaje_equipo_2 > $partido->puntaje_equipo_1) ? 1 : 0;
            }
    
            $equiposGanadores[] = ($cantidadPartidosGanadosEquipo1 > $cantidadPartidosGanadosEquipo2)
                ? Equipo::find($fecha->equipo_1)
                : Equipo::find($fecha->equipo_2);
        }
    
        return $equiposGanadores;
    }    

    public function crearJugadorPartido($jugadorId, $partidoId, $puntos)
    {
            // 3. Si no hay ningún partido en el calendario actual, crea tablas de posiciones y goleadores
            $jugadorPartido = new JugadorPartido([
                'jugador_id' => $jugadorId,
                'partido_playoff_id' => $partidoId,
                'puntos_anotados' => $puntos,
            ]);
            $jugadorPartido->save();
            $jugadorGoleador = Goleadores::where('jugador_id', $jugadorId)->first();
            $jugadorGoleador->cantidad_partidos = $jugadorGoleador->cantidad_partidos + 1;
            $jugadorGoleador->puntos = $jugadorGoleador->puntos + $puntos;
            $jugadorGoleador->promedio = $jugadorGoleador->puntos / $jugadorGoleador->cantidad_partidos;
            $jugadorGoleador->save();
    }

    public function update(Request $request, PartidosPlayoff $partidosPlayoff)
    {
        //
    }

    public function destroy(PartidosPlayoff $partidoplayoff)
    {
        //dd($request);
        $fechaPartido = FechaPartidoPlayoff::where('id', $partidoplayoff->fecha_partido_playoffs_id)->first();
        
        $jugadorPartido = JugadorPartido::where('partido_playoff_id', $partidoplayoff->id)->get();
        foreach ($jugadorPartido as $jugador) {
            $jugadorGoleador = Goleadores::where('jugador_id', $jugador->jugador_id)->first();
            $jugadorGoleador->puntos = $jugadorGoleador->puntos - $jugador->puntos_anotados;
            $jugadorGoleador->cantidad_partidos = $jugadorGoleador->cantidad_partidos - 1;
            if ($jugadorGoleador->cantidad_partidos == 0 || $jugadorGoleador->puntos == 0) {
                $jugadorGoleador->promedio = 0; // División por cero, establecer el promedio a cero
            } else {
                $jugadorGoleador->promedio = $jugadorGoleador->puntos / $jugadorGoleador->cantidad_partidos;
            }
            $jugadorGoleador->save();
        }

        $playoffs = Playoff::where('id', $fechaPartido->playoffs_id)->first();
        $liga = Liga::where('id',$playoffs->liga_id)->first();
        $campeon = CampeonLiga::where('liga_id',$liga->id)->first();
        $fechasPlayoffs = $playoffs ? FechaPartidoPlayoff::where('playoffs_id',$playoffs->id)->where('ronda','<',$fechaPartido->ronda)->get() : [];

        if ($campeon){
            $campeon->delete();
            $votosMVP = VotacionJMV::where('liga_id',$liga->id)->get();
            if ($votosMVP){
                $votosMVP->each->delete();
            }
        }

        if (count($fechasPlayoffs)>0){
            $fechasPlayoffs->each->delete();
        }

        $jugadorPartido->each->delete();
        $partidoplayoff->delete();
    }

    public function validarPuntosNoNegativos(Request $request)
    {
        $rules = [];
        for ($equipo = 1; $equipo <= 2; $equipo++) {
            for ($jugador = 1; $jugador <= 12; $jugador++) {
                $campo = "puntos_equipos_{$equipo}_jugador_{$jugador}";
                $rules[$campo] = 'required|min:0';
            }
        }
        $request->validate($rules);        
    }

    public function crearPartido(Request $request)
    {
        $partido = new PartidosPlayoff([
            'puntaje_equipo_1' => $request->puntaje_equipo_1,
            'puntaje_equipo_2' => $request->puntaje_equipo_2,
            'fecha_partido_playoffs_id' => $request->fecha_partido_id,
            'playoffs_id' => $request->calendario_id,
        ]);
        $partido->save();

        return $partido;
    }
}
