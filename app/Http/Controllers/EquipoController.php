<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
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
            'nombre' => 'required|string|max:100|unique:equipos,nombre',
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
            'nombre' => 'required|string|max:255|unique:equipos,nombre,'.$equipo->id,
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

    public function destroy(Equipo $equipo)
    {
        $equipo->delete();
    }
}
