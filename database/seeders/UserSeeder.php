<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Faker\Factory as FakerFactory;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Usuarios manuales
        $superAdmin = [
            'nombre' => 'Alberto',
            'apellido' => 'Diaz',
            'email' => 'guillermo.vera@est.fi.uncoma.edu.ar',
            'password' => Hash::make('12345678'),
            'dni' => '00000000',
            'fecha_nacimiento' => '1999-12-23',
        ];

        $usuario1 = [
            'nombre' => 'Guillermo',
            'apellido' => 'Vera',
            'email' => 'guillotaso@gmail.com',
            'password' => Hash::make('12345678'),
            'dni' => '42165953',
            'fecha_nacimiento' => '1999-12-23',
        ];

        $usuario2 = [
            'nombre' => 'Carlos',
            'apellido' => 'Renteria',
            'email' => 'veraguillermo345@gmail.com',
            'password' => Hash::make('12345678'),
            'dni' => '12345666',
            'fecha_nacimiento' => '1980-01-15',
        ];

        // Insertar los usuarios manuales en la base de datos
        User::create($usuario1);
        User::create($usuario2);
        User::create($superAdmin);
        
        //Crear usuarios con datos de API
        for ($i=0; $i < 2; $i++) { 
            $response = Http::get('https://randomuser.me/api/', [
                'gender' => 'male',
                'nat' => 'AR',
            ]);
    
            $faker = FakerFactory::create();
            $numeroAleatorio = $faker->randomNumber(8, true); // Genera un número de 8 dígitos
            $user = $response->json()['results'][0];
            $usuario = [
                'nombre' => $user['name']['first'],
                'apellido' => $user['name']['last'],
                'email' => $user['email'],
                'password' => Hash::make('12345678'),
                'dni' => $numeroAleatorio,
                'fecha_nacimiento' => '1980-01-15',
            ];
            User::create($usuario);
        }
    }
}
