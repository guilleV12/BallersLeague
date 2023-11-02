<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacionResultado extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_partido_id',
        'partido_id',
    ];

    public function partido()
    {
        return $this->hasMany(Partido::class);
    }

    public function fecha_partido()
    {
        return $this->hasMany(FechaPartido::class);
    }

    public function notificacion_usuario()
    {
        return $this->belongsToMany(NotifiacionUsuario::class);
    }
}
