<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;

    protected $fillable = [
        'puntaje_equipo_1',
        'puntaje_equipo_2'
    ];

    public function fecha_partidos()
    {
        return $this->belongsTo(FechaPartido::class);
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
