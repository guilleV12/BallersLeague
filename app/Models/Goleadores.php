<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goleadores extends Model
{
    use HasFactory;

    protected $fillable = [
        'jugador_id',
        'liga_id',
        'puntos',
        'promedio',
        'cantidad_partidos',
    ];

    public function jugador()
    {
        return $this->hasMany(Jugador::class);
    }

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }
}
