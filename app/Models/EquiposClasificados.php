<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquiposClasificados extends Model
{
    use HasFactory;

    public function playoff()
    {
        return $this->belongsTo(Playoff::class);
    }

    public function equipos()
    {
        return $this->hasMany(Equipo::class);
    }
}
