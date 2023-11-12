<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\Goleadores;
use App\Models\Jugador;
use App\Models\JugadorPartido;
use App\Models\Liga;
use App\Models\NotificacionPartido;
use App\Models\Partido;
use App\Models\TablaPosiciones;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    public function destroy(Request $request, Partido $partido)
    {
        //dd($partido);
        $fechaPartido = FechaPartido::where('id', $partido->fecha_partido_id)->first();
        
        $jugadorPartido = JugadorPartido::where('partido_id', $partido->id)->get();
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

        if ($partido->puntaje_equipo_1 > $partido->puntaje_equipo_2){
            $tablaPosicionesGanador = TablaPosiciones::where('equipo_id', $fechaPartido->equipo_1)->first();
            $tablaPosicionesGanador->ganados = $tablaPosicionesGanador->ganados - 1;

            $tablaPosicionesPerdedor = TablaPosiciones::where('equipo_id', $fechaPartido->equipo_2)->first();
            $tablaPosicionesPerdedor->perdidos = $tablaPosicionesPerdedor->perdidos - 1;
        } else {
            $tablaPosicionesGanador = TablaPosiciones::where('equipo_id', $fechaPartido->equipo_2)->first();
            $tablaPosicionesGanador->ganados = $tablaPosicionesGanador->ganados - 1;

            $tablaPosicionesPerdedor = TablaPosiciones::where('equipo_id', $fechaPartido->equipo_1)->first();
            $tablaPosicionesPerdedor->perdidos = $tablaPosicionesPerdedor->perdidos - 1;
        }
        $tablaPosicionesGanador->save();
        $tablaPosicionesPerdedor->save();
        $jugadorPartido->each->delete();
        $partido->delete();
       
    }

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

        //buscar si hay un partido en esta liga, si no hay crea una tabla de posiciones y goleadores
        $hayPartidos = Partido::where('calendario_id', $request->calendario_id)->count();
        if ($hayPartidos === 0){
            $liga = Liga::where('id', $request->calendario_id)->first();
            $equipos = Equipo::where('liga_id', $liga->id)->get();
            foreach ($equipos as $equipo) {
                $this->crearTablasPosiciones($liga->id, $equipo->id);
            }
        }

        //crear partido y tabla jugador partido para actualizar tabla de goleadores
        $partido = new Partido([
            'puntaje_equipo_1' => $request->puntaje_equipo_1,
            'puntaje_equipo_2' => $request->puntaje_equipo_2,
            'fecha_partido_id' => $request->fecha_partido_id,
            'calendario_id' => $request->calendario_id,
        ]);
        $partido->save();
        //actualizar notificaciones
        $notificacionPartido = NotificacionPartido::where('fecha_partido_id',$partido->fecha_partido_id)->first();
        $notificacionPartido->jugado = true;
        $notificacionPartido->save();

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

        //actualizar tablaposiciones segun ganador de partido
        $this->actualizarTablaPosiciones($partido, $request->equipo_1, $request->equipo_2);
    }

    public function crearJugadorPartido($jugadorId, $partidoId, $puntos)
    {
            // 3. Si no hay ningún partido en el calendario actual, crea tablas de posiciones y goleadores
            $jugadorPartido = new JugadorPartido([
                'jugador_id' => $jugadorId,
                'partido_id' => $partidoId,
                'puntos_anotados' => $puntos,
            ]);
            $jugadorPartido->save();
            $jugadorGoleador = Goleadores::where('jugador_id', $jugadorId)->first();
            $jugadorGoleador->cantidad_partidos = $jugadorGoleador->cantidad_partidos + 1;
            $jugadorGoleador->puntos = $jugadorGoleador->puntos + $puntos;
            $jugadorGoleador->promedio = $jugadorGoleador->puntos / $jugadorGoleador->cantidad_partidos;
            $jugadorGoleador->save();
    }

    public function crearTablasPosiciones($ligaId, $equipoId)
    {
            // 3. Si no hay ningún partido en el calendario actual, crea tablas de posiciones y goleadores
            $tablaPosiciones = new TablaPosiciones([
                'equipo_id' => $equipoId,
                'liga_id' => $ligaId,
                'posicion' => 0,
                'ganados' => 0,
                'perdidos' => 0,
            ]);

            $tablaPosiciones->save();
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

    public function actualizarTablaPosiciones($partido, $equipo1, $equipo2)
    {
        if ($partido->puntaje_equipo_1 > $partido->puntaje_equipo_2){
            $tablaPosicionesGanador = TablaPosiciones::where('equipo_id', $equipo1)->first();
            $tablaPosicionesGanador->ganados = $tablaPosicionesGanador->ganados + 1;
            $tablaPosicionesGanador->puntos_favor = $tablaPosicionesGanador->puntos_favor + ($partido->puntaje_equipo_1 - $partido->puntaje_equipo_2);

            $tablaPosicionesPerdedor = TablaPosiciones::where('equipo_id', $equipo2)->first();
            $tablaPosicionesPerdedor->perdidos = $tablaPosicionesPerdedor->perdidos + 1;
            $tablaPosicionesPerdedor->puntos_contra = $tablaPosicionesPerdedor->puntos_contra + ($partido->puntaje_equipo_1 - $partido->puntaje_equipo_2);
        } else {
            $tablaPosicionesGanador = TablaPosiciones::where('equipo_id', $equipo2)->first();
            $tablaPosicionesGanador->ganados = $tablaPosicionesGanador->ganados + 1;
            $tablaPosicionesGanador->puntos_favor = $tablaPosicionesGanador->puntos_favor + ($partido->puntaje_equipo_1 - $partido->puntaje_equipo_2);

            $tablaPosicionesPerdedor = TablaPosiciones::where('equipo_id', $equipo1)->first();
            $tablaPosicionesPerdedor->perdidos = $tablaPosicionesPerdedor->perdidos + 1;
            $tablaPosicionesPerdedor->puntos_contra = $tablaPosicionesPerdedor->puntos_contra + ($partido->puntaje_equipo_1 - $partido->puntaje_equipo_2);
        }
        $tablaPosicionesGanador->save();
        $tablaPosicionesPerdedor->save();

        //actualizar posiciones
        $equipoParaObtLiga = Equipo::where('id',$equipo1)->first();
        $this->actualizarPosiciones($equipoParaObtLiga->liga_id);
    }

    public function actualizarPosiciones($ligaId)
    {
        // Obtener y ordenar la tabla de posiciones
        $tablaPosiciones = TablaPosiciones::where('liga_id', $ligaId)
            ->orderByDesc('ganados')
            ->orderByDesc('puntos_favor')
            ->orderBy('puntos_contra')
            ->get();

        // Asignar posiciones a los equipos
        $posicion = 1;
        foreach ($tablaPosiciones as $posicionEquipo) {
            $posicionEquipo->posicion = $posicion++;
            $posicionEquipo->save();
        }
    }
}
