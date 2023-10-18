<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JugadorPartido extends Model
{
    use HasFactory;

    protected $fillable = [
        'puntos_anotados',
        'jugador_id',
        'partido_id',
    ];

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function jugador()
    {
        return $this->hasOne(Jugador::class);
    }
}
