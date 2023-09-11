<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TablaPosiciones extends Model
{
    use HasFactory;

    protected $fillable = [
        'posicion'
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
