<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\Goleadores;
use App\Models\Liga;
use App\Models\TablaPosiciones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100|unique:equipos,nombre,NULL,id,liga_id,' . $request->liga_id,
            'descripcion' => 'required|string|max:255',
            'logo' => 'required|file|mimes:png|max:2048',
            'liga_id' => 'required|exists:ligas,id',
        ]);

        $filename = 'logo_equipo_'.$validated['nombre'].'_user_'.$request->user()->id.'.png';
        $validated['logo']->move(public_path('images'),$filename);
        $validated['logo'] = $filename;
        $equipo = new Equipo([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'],
            'logo' => $validated['logo'],
            'liga_id' => $validated['liga_id'],
        ]);

        //si llega la variable destruirEstructuraActual se eliminara fixture/partidos/tablas posiciones y goleadores
       //dd($request);
        if ($request->destruirEstructuraActual === "1" || $request->destruirEstructuraActual === true){
            
            $calendario = Calendario::where('liga_id', $request->liga_id)->first();
            $fechasFixture = FechaPartido::where('calendario_id', $calendario->id)->get();
            $fechasFixture->each->delete();
            $tablaPosiciones = TablaPosiciones::where('liga_id', $request->liga_id)->get();
            $tablaPosiciones->each->delete();
            $goleadores = Goleadores::where('liga_id', $request->liga_id)->get();
            foreach ($goleadores as $goleador) {
                $goleador->puntos = 0;
                $goleador->cantidad_partidos = 0;
                $goleador->promedio = 0;
                $goleador->save();
            }
        }

        $equipo->save();    
    }

    public function show(Equipo $equipo)
    {
        //
    }

    public function edit(Equipo $equipo)
    {
        
    }

    public function update(Request $request, Equipo $equipo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100|unique:equipos,nombre,'.$equipo->id.',id,liga_id,' . $request->liga_id,
            'descripcion' => 'required|string|max:255',
            'logo' => 'image|mimes:png|max:2048',
        ]);

        $equipo->nombre = $request->nombre;
        $equipo->descripcion = $request->descripcion;

        if ($request->logo){
            Storage::disk('local')->delete('public/images/'.$equipo->logo);
            $filename = 'logo_equipo_'.$validated['nombre'].'_user_'.$request->user()->id.'.png';
            $validated['logo']->move(public_path('images'),$filename);
            $equipo->logo = $filename;
        };

        $equipo->save();
    }

    public function destroy(Equipo $equipo, Request $request)
    {
        if ($request->destruirEstructuraActual === "1" || true){
            $liga = Liga::where('id', $equipo->liga_id)->first();
            $calendario = Calendario::where('liga_id', $liga->id)->first();
            $fechasFixture = FechaPartido::where('calendario_id', $calendario->id)->get();
            $fechasFixture->each->delete();
            $tablaPosiciones = TablaPosiciones::where('liga_id', $request->liga_id)->get();
            $tablaPosiciones->each->delete();
            $goleadores = Goleadores::where('liga_id', $request->liga_id)->get();
            foreach ($goleadores as $goleador) {
                $goleador->puntos = 0;
                $goleador->cantidad_partidos = 0;
                $goleador->promedio = 0;
                $goleador->save();
            }
        
        }
        $equipo->delete();

    }
}
