<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VotacionJMV extends Model
{
    use HasFactory;

    public function liga()
    {
        return $this->belongsTo(Liga::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function jugador()
    {
        return $this->hasOne(Jugador::class);
    }
}
