<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'foto_perfil',
        'equipo_id',
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function goleadores()
    {
        return $this->belongsTo(Goleadores::class);
    }

    public function votacion()
    {
        return $this->belongsToMany(VotacionJMV::class);
    }

    public function jugador_partido()
    {
        return $this->belongsToMany(JugadorPartido::class);
    }

}
