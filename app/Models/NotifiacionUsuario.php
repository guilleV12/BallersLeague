<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotifiacionUsuario extends Model
{
    use HasFactory;

    public function notificacion_partidos()
    {
        return $this->hasOne(NotificacionPartido::class);
    }

    public function notificacion_resultados()
    {
        return $this->hasOne(NotificacionResultado::class);
    }
}
