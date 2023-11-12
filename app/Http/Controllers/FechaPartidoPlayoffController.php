<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\FechaPartidoPlayoff;
use App\Models\PartidosPlayoff;
use App\Models\Playoff;
use Illuminate\Http\Request;

class FechaPartidoPlayoffController extends Controller
{
    public function update(Request $request, FechaPartidoPlayoff $fechapartidoplayoff)
    {//dd($fechapartidoplayoff);
        $partidoJugado = PartidosPlayoff::where('fecha_partido_playoffs_id', $fechapartidoplayoff->id)->first();
    
        if ($partidoJugado) {
            $customMessages = [
                'required' => 'El partido ya se ha jugado, debe tener fecha y arbitros.',
                'date' => 'El campo :attribute debe ser una fecha válida.',
                'before_or_equal' => 'El partido ya se ha jugado, debe ser una fecha anterior o igual a hoy.',
                'arbitro_2.different' => 'El arbitro 2 debe ser diferente del arbitro 1.',
                'arbitro_1.different' => 'El arbitro 1 debe ser diferente del arbitro 2.',
            ];
            // Si hay partido jugado, no permitir fechas superiores a hoy.
            $request->validate([
                'fecha' => 'required|date|before_or_equal:today',
                'arbitro_1' => 'required|different:arbitro_2',
                'arbitro_2' => 'required|different:arbitro_1',
            ], $customMessages);
        }
        
        //buscar si la fecha ingresada se repite en alguna existente, si se repite validar que tenga al menos 1:30 hs de diferencia con las demas
        $fechasRepetidas = $this->buscarFechasRepetidas($fechapartidoplayoff->playoffs_id, $request->fecha, $fechapartidoplayoff);

        if (count($fechasRepetidas) > 0 && $request->horario){
            $diferenciaMinima = 90; // Diferencia mínima de 1:30 horas en minutos
            $horaActual = strtotime($request->horario);
            // Recorre las fechas repetidas para verificar la diferencia de horario
            foreach ($fechasRepetidas as $repetida) {
                $horaRepetida = strtotime($repetida->horario);
                
                $diferenciaHoraria = abs($horaActual - $horaRepetida) / 60; // Diferencia en minutos
                
                if ($diferenciaHoraria < $diferenciaMinima) {
                    $customMessages2 = [
                        'horario' => 'La hora y fecha se esta pisando con otro partido.'
                    ];
                    $request->validate([
                        'horario' => [
                            'date',
                            'different:' . $repetida->horario,
                            'after:' . date('H:i', strtotime($repetida->horario . " + $diferenciaMinima minutes")),
                            'before:' . date('H:i', strtotime($repetida->horario . " - $diferenciaMinima minutes")),
                        ],
                    ], $customMessages2);
                }
            }
        }

        $fechapartidoplayoff->fecha = $request->fecha;
        $fechapartidoplayoff->horario = $request->horario;
        $fechapartidoplayoff->arbitro_1 = $request->arbitro_1;
        $fechapartidoplayoff->arbitro_2 = $request->arbitro_2;
    
        $fechapartidoplayoff->save();
    }    

    public function asignarArbitrosTodos($playoffsId)
    {//dd($playoffsId);
        $playoffs = Playoff::where('id', intval($playoffsId))->get();

        $fechaPartidos = FechaPartidoPlayoff::where('playoffs_id', $playoffs[0]->id)->get();

        $arbitrosDisponibles = Arbitro::where('id_liga', $playoffs[0]->liga_id)->where('confirmado', 1)->get();

        foreach ($fechaPartidos as $fecha) {
            //buscar si este partido ya se jugo
            $partidoJugado = PartidosPlayoff::where('fecha_partido_playoffs_id', $fecha->id)->first();
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

    public function buscarFechasRepetidas($playoffsId, $fecha, $fechaPartidoEditando)
    {
        $fechaPartidos = FechaPartidoPlayoff::where('playoffs_id', $playoffsId)->get();
        $fechasRepetidas = [];

        foreach ($fechaPartidos as $fechapartido) {
            if ($fechapartido->fecha == $fecha){
                if ($fechaPartidoEditando->id != $fechapartido->id) {
                    $fechasRepetidas[] = $fechapartido;
                }
            }
        }

        return $fechasRepetidas;
    }
}
