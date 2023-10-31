<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'password',
        'dni',
        'fecha_nacimiento'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function ligas()
    {
        return $this->hasOne(Liga::class);
    }

    public function arbitro()
    {
        return $this->belongsTo(Arbitro::class);
    }

    public function votacion()
    {
        return $this->hasOne(VotacionJMV::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
