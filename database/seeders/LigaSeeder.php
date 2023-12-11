<?php

namespace Database\Seeders;

use App\Models\Liga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
  

        $liga1 = [
            'user_id' => '1',
            'mejor_jugador_id' => null,
            'nombre' => 'Liga Amateur Neuquen',
            'descripcion' => 'Liga para competir pero con flexibilidad para trabajadores.',
            'ubicacion' => 'Neuquen Capital',
            'logo' => 'logo_liga_usuario1.png',
            'categoria' => 'Mayores',
        ];

        Liga::create($liga1);
    }
}
