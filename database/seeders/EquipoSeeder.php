<?php

namespace Database\Seeders;

use App\Models\Equipo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipo1 = [
            'liga_id'=>'1',
            'nombre'=>'Boston Celtics',
            'descripcion'=>'Tatum y brown pechea',
            'logo'=>'logo_equipo_Boston Celtics_user_1.png'
        ];
        $equipo2 = [
            'liga_id'=>'1',
            'nombre'=>'Atlanta Hawks',
            'descripcion'=>'Trae tira mucho y lo cubren',
            'logo'=>'logo_equipo_Atlanta Hawks_user_1.png'
        ];
        $equipo3 = [
            'liga_id'=>'1',
            'nombre'=>'Houston Rockets',
            'descripcion'=>'Juventud, a ver cuando demuestran',
            'logo'=>'logo_equipo_Houston Rockets_user_1.png'
        ];
        $equipo4 = [
            'liga_id'=>'1',
            'nombre'=>'Dallas Mavericks',
            'descripcion'=>'Luka tira y le ponen 4 alrededor',
            'logo'=>'logo_equipo_Dallas Mavericks_user_1.png'
        ];
        $equipo5 = [
            'liga_id'=>'1',
            'nombre'=>'Los Angeles Clippers',
            'descripcion'=>'Si kawhi y pg no se rompen',
            'logo'=>'logo_equipo_Los Angeles Clippers_user_1.png'
        ];

        Equipo::create($equipo1);
        Equipo::create($equipo2);
        Equipo::create($equipo3);
        Equipo::create($equipo4);
        Equipo::create($equipo5);    }
}
