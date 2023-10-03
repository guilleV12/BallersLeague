<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Jugador;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Liga;

class JugadorController extends Controller
{
    public function index(Equipo $equipo)
    {
        $jugadores = Jugador::where('equipo_id', $equipo->id)->get();
        $liga = Liga::where('id',$equipo->liga_id)->get();

        return Inertia::render('Jugadores/Index', [
            'user'=>Auth::user(),
            'liga'=>$liga[0],
            'jugadores'=>$jugadores,
            'equipo'=>$equipo,
            'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:255',
            'dni' => 'required|string|max:8|unique:jugadors,dni',
            'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
            'foto_perfil' => 'required|file|mimes:png|max:2048',
            'equipo_id' => 'required|exists:equipos,id',
        ]);

        $filename = 'foto_jugador_'.$validated['dni'].'_equipo_'.$validated['equipo_id'].'.png';
        $validated['foto_perfil']->move(public_path('images'),$filename);
        $validated['foto_perfil'] = $filename;
        
        $jugador = new Jugador([
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'],
            'dni' => $validated['dni'],
            'fecha_nacimiento' => $validated['fecha_nacimiento'],
            'equipo_id' => $validated['equipo_id'],
            'foto_perfil' => $validated['foto_perfil'],
        ]);

        $jugador->save();    
    }

    public function show(Jugador $jugador)
    {
    }

    public function edit(Jugador $jugador)
    {
    }

    public function update(Request $request, Jugador $jugadore)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:255',
            'dni' => 'required|string|max:8|unique:jugadors,dni,'.$jugadore->id,
            'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
            'foto_perfil' => 'image|mimes:png|max:2048'
        ]);

        $jugadore->nombre = $request->nombre;
        $jugadore->apellido = $request->apellido;
        $jugadore->dni = $request->dni;
        $jugadore->fecha_nacimiento = $request->fecha_nacimiento;

        if ($request->foto_perfil){
            Storage::disk('local')->delete('public/images/'.$jugadore->foto_perfil);
            $filename = 'foto_jugador_'.$validated['dni'].'_equipo_'.$request->equipo_id.'.png';
            $validated['foto_perfil']->move(public_path('images'),$filename);
            $jugadore->foto_perfil = $filename;
        }

        $jugadore->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugadore)
    {
        $jugadore->delete();
    }
}
