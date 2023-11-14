<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patrocinador extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'logo',
        'liga_patrocinada',
    ];

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }
}
