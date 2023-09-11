<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'logo'
    ];

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    public function jugador()
    {
        return $this->hasMany(Jugador::class);
    }

    public function tabla_posiciones()
    {
        return $this->belongsTo(TablaPosiciones::class);
    }

    public function fecha_partido()
    {
        return $this->belongsToMany(FechaPartido::class);
    }
}
