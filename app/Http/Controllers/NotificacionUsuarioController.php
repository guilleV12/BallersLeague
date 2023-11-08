<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\Calendario;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\Liga;
use App\Models\NotificacionUsuario;
use App\Models\Partido;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificacionUsuarioController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'notificacion_partido'=>'required',
            'notificacion_resultado'=>'required',
            'liga_id'=>'required',
            'user_id'=>'required',
        ]);
        //dd($request);

        $notificacion = new NotificacionUsuario([
            'notificacion_partido' => $request->notificacion_partido,
            'notificacion_resultado' => $request->notificacion_resultado,
            'liga_id' => $request->liga_id,
            'user_id' => $request->user_id,
        ]);

        $notificacion->save();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NotificacionUsuario $notificacione)
    {//dd($notificacione);
        $request->validate([
            'notificacion_partido'=>'required',
            'notificacion_resultado'=>'required',
            'liga_id'=>'required',
            'user_id'=>'required',
        ]);
        //dd($request);

        $notificacione->notificacion_partido = $request->notificacion_partido;
        $notificacione->notificacion_resultado = $request->notificacion_resultado;

        $notificacione->save();
    }

    public function notificacionesDropDown()
    {
        $fechaActual = now()->format('Y-m-d'); // Formatea la fecha actual a 'Y-m-d'
        $pasadoManana  = now()->addDays(2)->format('Y-m-d');
        $antesAyer = now()->subDays(2)->format('Y-m-d'); // Fecha de antes de ayer en formato 'Y-m-d'

        //obtener usuarios que quieren notificaciones
        $notificaciones = Auth::check() ? NotificacionUsuario::where('user_id',Auth::user()->id)->get() : null;
        //filtrar por si algun partido de hoy ya se jugo al momento de enviar el mail
        $fechasPartidosProx = [];
        //filtrar por si algun partido de hoy aun no se jugo
        $fechasPartidosResultados = [];

    //NOTIFICACIONES
        foreach ($notificaciones as $notificacion) {

            $liga = Liga::where('id',$notificacion->liga_id)->first();
            $calendario = Calendario::where('liga_id', $notificacion->liga_id)->first();
            $partidos = $calendario ? Partido::where('calendario_id', $calendario->id)->get() : [];

    //NOTIFICACION PROX PARTIDOS
            //buscar elementos para enviar mail segun fecha y usuario (notificacion partidos)
            if ($notificacion->notificacion_partido == true){
                //fechas de hoy y manana
                $fechasPartidosHoyMan = $calendario ? 
                FechaPartido::where('calendario_id', $calendario->id)
                ->where('fecha', '>=', $fechaActual) // Hoy y mañana
                ->where('fecha', '<', $pasadoManana) // Menor que pasado mañana
                ->get() : [];

                if (count($fechasPartidosHoyMan)>0){
                    if (count($partidos)>0){
                        foreach ($fechasPartidosHoyMan as $fecha) {
                            $fechaEncontradaPartido = false;
                        
                            foreach ($partidos as $partido) {
                                if ($partido->fecha_partido_id == $fecha->id) {
                                    $fechaEncontradaPartido = true;
                                    break; // Salir del bucle si se encuentra un partido
                                }
                            }
                        
                            if (!$fechaEncontradaPartido) {
                                $equipo1 = Equipo::find($fecha->equipo_1);
                                $equipo2 = Equipo::find($fecha->equipo_2);

                                $fechasPartidosProx[] = [
                                    'fecha' => $fecha,
                                    'equipo_1' => $equipo1->nombre, // Asumiendo que el campo del nombre del equipo se llama 'nombre'
                                    'equipo_2' => $equipo2->nombre,
                                    'liga' => $liga,
                                ];
                            }
                        }
                    } else {
                        foreach ($fechasPartidosHoyMan as $fecha) {
                            $equipo1 = Equipo::find($fecha->equipo_1);
                            $equipo2 = Equipo::find($fecha->equipo_2);
                        
                            $fechasPartidosProx[] = [
                                'fecha' => $fecha,
                                'equipo_1' => $equipo1->nombre, // Asumiendo que el campo del nombre del equipo se llama 'nombre'
                                'equipo_2' => $equipo2->nombre,
                                'liga' => $liga,
                            ];
                        }
                    }
                }
                
                
                $equipos = Equipo::where('liga_id', $liga->id)->get();

            }
    //NOTIFICACION RESULTADOS
             //buscar elementos para enviar mail segun fecha y usuario (notificacion resultados)
             if ($notificacion->notificacion_resultado == true){
                //fechas de hoy y manana
                $fechasPartidosAyerHoy = $calendario ? 
                FechaPartido::where('calendario_id', $calendario->id)
                ->where('fecha', '<=', $fechaActual) // Hoy y ayer
                ->where('fecha', '>', $antesAyer) // Mayor que antes de ayer
                ->get() : [];

                if (count($fechasPartidosAyerHoy)>0){
                    if (count($partidos)>0){
                        foreach ($fechasPartidosAyerHoy as $fecha) {
                            
                                foreach ($partidos as $partido) {
                                    if ($partido->fecha_partido_id == $fecha->id){
                                        $equipo1 = Equipo::find($fecha->equipo_1);
                                        $equipo2 = Equipo::find($fecha->equipo_2);

                                        $fechasPartidosResultados[] = [
                                            'fecha' => $fecha,
                                            'equipo_1' => $equipo1->nombre, // Asumiendo que el campo del nombre del equipo se llama 'nombre'
                                            'equipo_2' => $equipo2->nombre,
                                            'partido' => $partido,
                                            'liga' => $liga,
                                        ];
                                    }
                                }
                            } 
                    }
                }            
            }
        }

    //INVITACION ARBITRO
        $invitaciones = [];
        $invitacionesArbitro = Arbitro::where('id_user',Auth::user()->id)
            ->where('deshabilitado',0)
            ->where('confirmado',0)
            ->get();

        foreach ($invitacionesArbitro as $invitacion) {
            $ligaInvitacion = Liga::find($invitacion->id_liga);

            $invitaciones[] = [
                'invitacion'=>$invitacion,
                'liga'=>$ligaInvitacion,
            ];
        }


        return [$fechasPartidosProx, $fechasPartidosResultados, $invitaciones];
    }
}
