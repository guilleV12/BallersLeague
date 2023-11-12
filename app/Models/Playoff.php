<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playoff extends Model
{
    use HasFactory;

    protected $fillable = [
        'cantidad_equipos',
        'cantidad_partidos',
        'liga_id',
    ];

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    public function partido_playoff()
    {
        return $this->hasMany(PartidosPlayoff::class);
    }
}
