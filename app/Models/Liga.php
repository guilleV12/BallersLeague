<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Liga extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'ubicacion',
        'logo',
        'categoria'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mejor_jugador()
    {
        return $this->hasOne(Jugador::class);
    }

    public function equipo()
    {
        return $this->hasMany(Equipo::class);
    }

    public function arbitro()
    {
        return $this->hasMany(Arbitro::class);
    }

    public function tabla_posiciones()
    {
        return $this->hasMany(TablaPosiciones::class);
    }

    public function goleadores()
    {
        return $this->hasMany(Goleadores::class);
    }

    public function patrocinador()
    {
        return $this->hasMany(Patrocinador::class);
    }

    public function calendario()
    {
        return $this->hasOne(Calendario::class);
    }

    public function playoffs()
    {
        return $this->hasOne(Playoff::class);
    }

    public function votacion()
    {
        return $this->hasMany(VotacionJMV::class);
    }
}
