<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampeonLiga extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipo_id',
        'liga_id'
    ];
}
