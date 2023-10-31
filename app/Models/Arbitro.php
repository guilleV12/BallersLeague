<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arbitro extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_liga',
        'confirmado',
        'deshabilitado',
        'email',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    public function fecha_partidos()
    {
        return $this->belongsToMany(FechaPartido::class);
    }
}
