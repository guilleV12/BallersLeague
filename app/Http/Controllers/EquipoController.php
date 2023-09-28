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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
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
            return back()->with('success', 'Equipo agregado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipo $equipo)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipo $equipo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
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
        }
        $equipo->save();
        return back()->with('success', 'El equipo se ha actualizado correctamente');
    }

    public function destroy(Equipo $equipo)
    {
        $equipo->delete();
        return back()->with('success', 'Liga eliminada exitosamente.');
    }
}
