<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TablaPosiciones extends Model
{
    use HasFactory;

    protected $fillable = [
        'posicion',
        'equipo_id',
        'liga_id',
        'ganados',
        'perdidos',
    ];

    public function equipo()
    {
        return $this->hasMany(Equipo::class);
    }

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }
}
