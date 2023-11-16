<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacionUsuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'notificacion_partido',
        'notificacion_resultado',
        'user_id',
        'liga_id',
        'visto',
    ];

    public function notificacion_partidos()
    {
        return $this->hasOne(NotificacionPartido::class);
    }

    public function notificacion_resultados()
    {
        return $this->hasOne(NotificacionResultado::class);
    }
}
