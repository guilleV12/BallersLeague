<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use App\Models\NotificacionUsuario;
use Faker\Factory as FakerFactory;

class NotificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 5; $i++) { 
            $notificacion = [
                'notificacion_partido'=>false,
                'notificacion_resultado'=>false,
                'user_id'=>$i+1,
                'liga_id'=>1
            ];
            NotificacionUsuario::create($notificacion);
        }
        
    }
}
