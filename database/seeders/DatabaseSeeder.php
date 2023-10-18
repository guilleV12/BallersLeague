<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\LigaSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\EquipoSeeder;
use Database\Seeders\JugadorSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            LigaSeeder::class,
            EquipoSeeder::class,
            JugadorSeeder::class,
            GoleadoresSeeder::class,
        ]);
    }
    
}
