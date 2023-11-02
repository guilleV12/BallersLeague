<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacionPartido extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_partido_id',
    ];

    public function fecha_partido()
    {
        return $this->hasOne(FechaPartido::class);
    }

    public function notificacion_usuario()
    {
        return $this->belongsToMany(NotifiacionUsuario::class);
    }
}
