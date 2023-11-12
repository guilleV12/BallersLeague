<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartidosPlayoff extends Model
{
    use HasFactory;

    protected $fillable = [
        'puntaje_equipo_1',
        'puntaje_equipo_2',
        'fecha_partido_playoffs_id',
        'playoffs_id',
    ];

    public function fecha_partidos()
    {
        return $this->belongsTo(FechaPartidoPlayoff::class);
    }

    public function partido_playoff()
    {
        return $this->belongsToMany(PartidosPlayoff::class);
    }

    public function jugador_partido()
    {
        return $this->hasMany(JugadorPartido::class);
    }

    public function notificacion_resultados()
    {
        return $this->belongsTo(NotificacionResultado::class);
    }
}
