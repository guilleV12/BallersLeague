<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FechaPartido extends Model
{
    use HasFactory;

    protected $fillable = [
        'hora',
        'fecha',
        'calendario_id',
        'equipo_1',
        'equipo_2',
        'arbitro_1',
        'arbitro_2',
    ];

    public function equipos()
    {
        return $this->hasMany(Equipo::class);
    }

    public function arbitros()
    {
        return $this->hasMany(Arbitro::class);
    }

    public function calendario()
    {
        return $this->belongsTo(Calendario::class);
    }

    public function partido()
    {
        return $this->hasMany(Partido::class);
    }

    public function notificacion_partido()
    {
        return $this->belongsToMany(NotificacionPartido::class);
    }

    public function notificacion_resultados()
    {
        return $this->belongsToMany(NotificacionResultado::class);
    }
}
