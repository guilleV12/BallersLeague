<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\Goleadores;
use App\Models\NotificacionPartido;
use App\Models\TablaPosiciones;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Exists;

class CalendarioController extends Controller
{

    public function store(Request $request)
    {
        //crear fechas segun vueltas indicadas con id de este calendario, la fecha ini de calendario marca la fecha min que podran tener las fechas de cada fecha_partido
        $validated = $request->validate([
            'fecha_inicial' => 'required|date',
            'cantidad_vueltas' => 'required|numeric',
        ]);

        $calendario = Calendario::where('liga_id', $request->liga_id)->get();

        if (!(count($calendario) > 0)){
            $calendario = new Calendario([
                'liga_id' => $request->liga_id,
                'fecha_inicial' => $validated['fecha_inicial'],
                'fecha_final' => null,
            ]);
            $calendario->save();
            $calendario = Calendario::where('liga_id', $request->liga_id)->get();
        }
       
        if ($request->regenerarFixture == true){
            FechaPartido::where('calendario_id', $calendario[0]->id)->delete();
        }

        $calendario[0]->fecha_inicial = $request->fecha_inicial;
        $calendario[0]->save();

        for ($i=0; $i < $validated['cantidad_vueltas']; $i++) { 
            $this->generarFechasPartido($calendario[0], $validated['cantidad_vueltas']);
        }
        
    }

    public function destroyFixture(Calendario $calendario)
    {
        
        $tablaPosiciones = TablaPosiciones::where('liga_id', $calendario->liga_id)->get();
        $tablaPosiciones->each->delete();
        $goleadores = Goleadores::where('liga_id', $calendario->liga_id)->get();
        foreach ($goleadores as $goleador) {
            $goleador->puntos = 0;
            $goleador->cantidad_partidos = 0;
            $goleador->promedio = 0;
            $goleador->save();
        }
        FechaPartido::where('calendario_id', $calendario->id)->delete();
    }

    public function generarFechasHorarios($numDias, $vueltas) 
    {
        $fechasHorarios = [];
    
        // Obtener la fecha actual
        $fechaActual = now(); // O utiliza Carbon::now() si estás utilizando Carbon.
    
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

    public function generarFechasPartido(Calendario $calendario, $vueltas)
    {//dd($this->generarFechasHorarios(3));

            // Obtén los equipos de la misma liga que el calendario
            $equipos = Equipo::where('liga_id', $calendario->liga_id)->get()->toArray();

            // Lógica para generar las fechas de partido aquí
            $totalEquipos = count($equipos);

            // Si el número de equipos es impar, agrega un equipo ficticio para que sea par
            if ($totalEquipos % 2 !== 0) {
                $equipos[] = ['id' => null];
                $totalEquipos++;
            }

            // Calcula el número de fechas necesarias
            $totalFechas = $totalEquipos - 1;
            $partidosJugados = [];

            for ($fecha = 1; $fecha <= $totalFechas; $fecha++) {
                for ($i = 0; $i < $totalEquipos; $i++) {
                    $equipoLocal = $equipos[$i]['id'];
                    $equipoVisitante = $equipos[($totalEquipos-(1+$i))]['id'];

                    // Evita partidos contra el equipo ficticio (si es necesario)
                    if ($equipoLocal === null || $equipoVisitante === null) {
                        continue;
                    }

                    // Verifica si este partido ya se jugó
                    $partido = $equipoLocal . '-' . $equipoVisitante;
                    $partidoInverso = $equipoVisitante . '-' . $equipoLocal;

                    if (!in_array($partido, $partidosJugados)) { 
                        // Crea una fecha de partido asociada al calendario
                        $fechaPartido = new FechaPartido([
                            'calendario_id' => $calendario->id,
                            'equipo_1' => $equipoLocal,
                            'equipo_2' => $equipoVisitante,
                            'arbitro_1' => null,
                            'arbitro_2' => null,
                            'fecha' => null,
                            'horario' => null,
                        ]);
                        //asignar fecha y hora
                        $fechaPartido->save();

                        //crear registro notificaciones
                        $notificacionPartidos = new NotificacionPartido([
                            'fecha_partido_id' => $fechaPartido->id,
                            'liga_id' => $calendario->liga_id,
                            'jugado' => false,
                            'fecha' => $fechaPartido->fecha,
                        ]);
                        $notificacionPartidos->save();

                        // Agrega este partido al arreglo de partidos jugados
                        $partidosJugados[] = $partido;
                        $partidosJugados[] = $partidoInverso;
                    } else {
                        // Encuentra el siguiente partido no jugado
                        $j = $i + 1;
                        while ($j < $totalEquipos) {
                            $equipoLocalSiguiente = $equipos[$j]['id'];
                        
                            // Verifica si el equipo local siguiente no es null y el partido no se ha jugado
                            if ($equipoLocalSiguiente !== null) {
                                $posiblePartido = $equipoLocalSiguiente . '-' . $equipoVisitante;
                                if (!in_array($posiblePartido, $partidosJugados) && $equipoLocalSiguiente !== $equipoVisitante) {
                                    // Crea una fecha de partido para el siguiente partido no jugado
                                    $fechaPartidoSiguiente = new FechaPartido([
                                        'calendario_id' => $calendario->id,
                                        'equipo_1' => $equipoLocalSiguiente,
                                        'equipo_2' => $equipoVisitante,
                                        'arbitro_1' => null,
                                        'arbitro_2' => null,
                                        'fecha' => null,
                                        'horario' => null,
                                    ]);
                        
                                    $fechaPartidoSiguiente->save();

                                    //crear registro notificaciones
                                    $notificacionPartidos = new NotificacionPartido([
                                        'fecha_partido_id' => $fechaPartidoSiguiente->id,
                                        'liga_id' => $calendario->liga_id,
                                        'jugado' => false,
                                        'fecha' => $fechaPartidoSiguiente->fecha,
                                    ]);
                                    $notificacionPartidos->save();
                        
                                    // Agrega este partido al arreglo de partidos jugados
                                    $partidosJugados[] = $posiblePartido;
                                    $partidosJugados[] = $equipoVisitante . '-' . $equipoLocalSiguiente;
                                    break;
                                }
                            }
                            $j++;
                        }
                    }
                }

                // Rotar los equipos para la próxima fecha
                $ultimoEquipo = array_pop($equipos);
                array_unshift($equipos, $ultimoEquipo);
            }
            //Asignar fechas y horas
            $this->asignarFechasHoras($totalFechas, $calendario->id, $vueltas);
    }

    public function asignarFechasHoras($numDias, $calendarioId, $vueltas)
    {
            $arrayFechasHorarios = $this->generarFechasHorarios($numDias, $vueltas);
            $fechaPartidos = FechaPartido::where('calendario_id', $calendarioId)->get();
        
            for ($i = 0;$i < count($fechaPartidos); $i++) {
                $fechaPartidos[$i]->fecha = $arrayFechasHorarios[$i]['fecha'];
                $fechaPartidos[$i]->horario = $arrayFechasHorarios[$i]['hora'];
                $fechaPartidos[$i]->save();
                $notificacionPartidos = NotificacionPartido::where('fecha_partido_id', $fechaPartidos[$i]->id)->first();
                $notificacionPartidos->fecha = $fechaPartidos[$i]->fecha;
                $notificacionPartidos->save();
            }

    }
}
