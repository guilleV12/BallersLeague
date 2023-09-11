<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_inicial',
        'fecha_final'
    ];

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    public function fechaPartido()
    {
        return $this->hasMany(FechaPartido::class);
    }
}
