<?php

namespace Database\Seeders;

use App\Models\Jugador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\Http;

class JugadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        $jugadores = [];
        $faker = FakerFactory::create('es_AR');
        
        // Crear jugadores para cada equipo
        for ($equipoID = 1; $equipoID <= 5; $equipoID++) {
            for ($i = 1; $i <= 5; $i++) {
                $response = Http::get('https://randomuser.me/api/', [
                    'gender' => 'male',
                    'nat' => 'AR',
                ]);
                $user = $response->json()['results'][0];
                $jugador = [
                    'dni' => '012345' . $equipoID . $i,
                    'nombre' => $user['name']['first'],
                    'apellido' => $user['name']['last'],
                    'fecha_nacimiento' => '2000-10-10',
                    'foto_perfil' => 'foto_jugador_'.'012345' . $equipoID . $i.'_equipo_'.$equipoID.'.png',
                    'deshabilitado' => false,
                    'equipo_id' => $equipoID,
                    'liga_id' => 1,
                ];
                array_push($jugadores, $jugador);
            }
        }
        
        // Ahora puedes crear los jugadores en la base de datos
        Jugador::insert($jugadores);
        

    }
}
