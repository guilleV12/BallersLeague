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
            'nombre' => 'Pagame juga y no te quejes',
            'descripcion' => 'Liga donde se paga, si no cumplis te sancionan, pero si ellos no cumplen te aguantas.',
            'ubicacion' => 'Neuquen Capital',
            'logo' => 'images/LigaLogo1.png',
        ];

        Liga::create($liga1);
    }
}
