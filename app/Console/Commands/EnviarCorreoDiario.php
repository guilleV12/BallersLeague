<?php

namespace App\Console\Commands;

use App\Mail\NotificacionPartidosMail;
use App\Mail\NotificacionResultadosMail;
use App\Models\Calendario;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\FechaPartidoPlayoff;
use App\Models\Liga;
use App\Models\NotificacionPartido;
use App\Models\NotificacionUsuario;
use App\Models\Partido;
use App\Models\PartidosPlayoff;
use App\Models\Playoff;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EnviarCorreoDiario extends Command
{
    protected $signature = 'enviar-correo:diario';
    protected $description = 'Enviar correo electrónico diariamente';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {   
        $fechaActual = now()->format('Y-m-d'); // Formatea la fecha actual a 'Y-m-d'
        $pasadoManana  = now()->addDays(2)->format('Y-m-d');
        $antesAyer = now()->subDays(2)->format('Y-m-d'); // Fecha de antes de ayer en formato 'Y-m-d'

        //obtener usuarios que quieren notificaciones
        $notificaciones = NotificacionUsuario::all();

        foreach ($notificaciones as $notificacion) {

            $usuario = User::where('id',$notificacion->user_id)->first();
            $liga = Liga::where('id',$notificacion->liga_id)->first();
            $calendario = Calendario::where('liga_id', $notificacion->liga_id)->first();
            $partidos = $calendario ? Partido::where('calendario_id', $calendario->id)->get() : [];
            $playoffs = Playoff::where('liga_id', $liga->id)->first();
            $partidosPlayoffs = $playoffs ? PartidosPlayoff::where('playoffs_id', $playoffs->id)->get() : [];

            $fechasPartidosProxRegular = [];
            $fechasPartidosProxPlayoffs = [];
            $fechasPartidosResultadosRegular = [];
            $fechasPartidosResultadosPlayoffs = [];

            //buscar elementos para enviar mail segun fecha y usuario (notificacion partidos)
            if ($notificacion->notificacion_partido == true){
                //fechas de hoy y manana
                $fechasPartidosHoyMan = $calendario ? 
                FechaPartido::where('calendario_id', $calendario->id)
                ->where('fecha', '>=', $fechaActual) // Hoy y mañana
                ->where('fecha', '<', $pasadoManana) // Menor que pasado mañana
                ->get() : [];
                //playoffs
                $fechasPartidosHoyManPlayoffs = $playoffs ? 
                FechaPartidoPlayoff::where('playoffs_id', $playoffs->id)
                ->where('fecha', '>=', $fechaActual) // Hoy y mañana
                ->where('fecha', '<', $pasadoManana) // Menor que pasado mañana
                ->get() : [];

                //filtrar por si algun partido de hoy ya se jugo al momento de enviar el mail

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
                                $fechasPartidosProxRegular[] = $fecha;
                            }
                        }
                    } else {
                        $fechasPartidosProxRegular = $fechasPartidosHoyMan;
                    }
                }
                
                if (count($fechasPartidosHoyManPlayoffs)>0){
                    if (count($partidosPlayoffs)>0){
                        foreach ($fechasPartidosHoyManPlayoffs as $fecha) {
                            $fechaEncontradaPartido = false;
                        
                            foreach ($partidosPlayoffs as $partido) {
                                if ($partido->fecha_partido_playoffs_id == $fecha->id) {
                                    $fechaEncontradaPartido = true;
                                    break; // Salir del bucle si se encuentra un partido
                                }
                            }
                        
                            if (!$fechaEncontradaPartido) {
                                $fechasPartidosProxPlayoffs[] = $fecha;
                            }
                        }
                    } else {
                        $fechasPartidosProxPlayoffs = $fechasPartidosHoyManPlayoffs;
                    }
                }

                
                $equipos = Equipo::where('liga_id', $liga->id)->get();

                Mail::to($usuario->email)->send(new NotificacionPartidosMail($usuario, $liga, $fechasPartidosProxRegular, $fechasPartidosProxPlayoffs, $equipos));
            }
            //buscar elementos para enviar mail segun fecha y usuario (notificacion resultados)
            if ($notificacion->notificacion_resultado == true){
                //fechas de hoy y manana
                $fechasPartidosAyerHoy = $calendario ? 
                FechaPartido::where('calendario_id', $calendario->id)
                ->where('fecha', '<=', $fechaActual) // Hoy y ayer
                ->where('fecha', '>', $antesAyer) // Mayor que antes de ayer
                ->get() : [];
                $fechasPartidosAyerHoyPlayoffs = $playoffs ? 
                FechaPartidoPlayoff::where('playoffs_id', $playoffs->id)
                ->where('fecha', '<=', $fechaActual) // Hoy y ayer
                ->where('fecha', '>', $antesAyer) // Mayor que antes de ayer
                ->get() : [];

                //filtrar por si algun partido de hoy aun no se jugo

                if (count($fechasPartidosAyerHoy)>0){
                    if (count($partidos)>0){
                        foreach ($fechasPartidosAyerHoy as $fecha) {
                            
                                foreach ($partidos as $partido) {
                                    if ($partido->fecha_partido_id == $fecha->id){
                                        $fechasPartidosResultadosRegular[] = $fecha;
                                    }
                                }
                            } 
                    }
                } 
                if (count($fechasPartidosAyerHoyPlayoffs)>0){
                    if (count($partidosPlayoffs)>0){
                        foreach ($fechasPartidosAyerHoyPlayoffs as $fecha) {
                            
                                foreach ($partidosPlayoffs as $partido) {
                                    if ($partido->fecha_partido_playoffs_id == $fecha->id){
                                        $fechasPartidosResultadosPlayoffs[] = $fecha;
                                    }
                                }
                            } 
                    }
                } 
                
                
                $equipos = Equipo::where('liga_id', $liga->id)->get();

                Mail::to($usuario->email)->send(new NotificacionResultadosMail($usuario, $liga, $fechasPartidosResultadosRegular, $fechasPartidosResultadosPlayoffs, $equipos, $partidos, $partidosPlayoffs));
            }

            //actualizar visto de notificacion
            if ($notificacion->notificacion_partido == true || $notificacion->notificacion_resultado == true){
                $hayNotificacion = count($fechasPartidosProxRegular) + count($fechasPartidosProxPlayoffs) + count($fechasPartidosResultadosRegular) + count($fechasPartidosResultadosPlayoffs);
                if ($hayNotificacion > 0){
                    $notificacion->visto = false;
                    $notificacion->save();
                }
            }
        }

    }
}
