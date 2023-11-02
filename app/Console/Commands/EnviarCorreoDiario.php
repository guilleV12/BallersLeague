<?php

namespace App\Console\Commands;

use App\Mail\NotificacionPartidosMail;
use App\Models\Calendario;
use App\Models\FechaPartido;
use App\Models\Liga;
use App\Models\NotificacionUsuario;
use App\Models\Partido;
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
    {    info('Comando de envío de correo ejecutado');

        //obtener usuarios que quieren notificaciones
        $notificaciones = NotificacionUsuario::all();

        foreach ($notificaciones as $notificacion) {
            //buscar elementos para enviar mail segun fecha y usuario
            $usuario = User::where('id',$notificacion->user_id)->first();
            $liga = Liga::where('id',$notificacion->liga_id)->first();
            $calendario = Calendario::where('liga_id', $notificacion->liga_id)->first();
            $fechaPartidos = $calendario ? FechaPartido::where('calendario_id',$calendario->id)->get() : null;
            $partidos = $calendario ? Partido::where('calendario_id',$calendario->id)->get() : null;

            if ($notificacion->notificacion_partido == true){
                Mail::to($usuario->email)->send(new NotificacionPartidosMail($usuario, $liga, $fechaPartidos, $partidos));
            }
        }

    }
}
