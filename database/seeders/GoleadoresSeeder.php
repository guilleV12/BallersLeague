<?php

namespace Database\Seeders;

use App\Models\Goleadores;
use App\Models\Jugador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;

class GoleadoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        $goleadores = [];

        for ($i=1; $i <= 25; $i++) { 
            $goleador = [
                'jugador_id' => $i,
                'liga_id' => 1,
                'puntos' => 0,
                'promedio' => 0,
                'cantidad_partidos' => 0,
            ];
            array_push($goleadores, $goleador);
        }
        
        
        // Ahora puedes crear los jugadores en la base de datos
        Goleadores::insert($goleadores);
        

    }
}
