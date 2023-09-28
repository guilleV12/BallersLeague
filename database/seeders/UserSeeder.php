<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario1 = [
            'nombre' => 'Guillermo',
            'apellido' => 'Vera',
            'email' => 'guillotaso@gmail.com',
            'password' => Hash::make('12345678'),
            'dni' => '42165953',
            'fecha_nacimiento' => '1999-12-23',
        ];

        // Datos del segundo usuario
        $usuario2 = [
            'nombre' => 'Chati',
            'apellido' => 'Retirate',
            'email' => 'veraguillermo345@gmail.com',
            'password' => Hash::make('12345678'),
            'dni' => '12345678',
            'fecha_nacimiento' => '1980-01-15',
        ];

        // Insertar los usuarios en la base de datos
        User::create($usuario1);
        User::create($usuario2);
    }
}
