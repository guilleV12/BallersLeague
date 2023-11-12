<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FechaPartidoPlayoff extends Model
{
    use HasFactory;

    protected $fillable = [
        'horario',
        'fecha',
        'playoffs_id',
        'equipo_1',
        'equipo_2',
        'arbitro_1',
        'arbitro_2',
        'ronda',
    ];
}
