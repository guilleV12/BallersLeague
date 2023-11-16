<?php

namespace App\Http\Controllers;

use App\Models\Patrocinador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PatrocinadorController extends Controller
{
    public function store(Request $request)
    {
       //dd($request->prioridad);

        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string|max:255',
            'logo' => 'required|file|mimes:png',
            'liga_patrocinada' => 'required|exists:ligas,id',
            'prioridad' => 'required',
        ]);

        $filename = 'logo_patrocinador_'.$request->nombre.'_liga_'.$request->liga_patrocinada.'.png';
        $request->logo->move(public_path('images'),$filename);
        $logo_patrocinador = $filename;

        //si es prioridad los demas no
        if ($request->prioridad == true){
            $this->sacarPrioridad($request->liga_patrocinada);
        }

        $patrocinador = new Patrocinador([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'logo' => $logo_patrocinador,
            'liga_patrocinada' => $request->liga_patrocinada,
            'prioridad' => $request->prioridad,
        ]);

        $patrocinador->save();
    }

    public function sacarPrioridad($ligaId)
    {
        $patrocinadores = Patrocinador::where('liga_patrocinada',$ligaId)->get();
        //dd($patrocinadores);
        if (count($patrocinadores)>0){
            foreach ($patrocinadores as $patrocinador) {
                $patrocinador->prioridad = false;
                $patrocinador->save();
            }
        }
    }

    public function update(Request $request, Patrocinador $patrocinadore)
    {
        //dd($patrocinadore);
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string|max:255',
            'logo' => 'file|mimes:png',
            'liga_patrocinada' => 'required|exists:ligas,id',
            'prioridad' => 'required',
        ]);

        if ($request->logo){
            Storage::disk('local')->delete('public/images/'.$patrocinadore->logo);
            $filename = 'logo_patrocinador_'.$request->nombre.'_liga_'.$request->liga_patrocinada.'.png';
            $request->logo->move(public_path('images'),$filename);
            $patrocinadore->logo = $filename;
        };

        //si es prioridad los demas no
        if ($request->prioridad === true){
            $this->sacarPrioridad($request->liga_patrocinada);
        }

        $patrocinadore->nombre = $request->nombre;
        $patrocinadore->descripcion = $request->descripcion;
        $patrocinadore->prioridad = $request->prioridad;

        $patrocinadore->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patrocinador $patrocinadore)
    {
        //dd($patrocinadore);
        $patrocinadore->delete();
    }
}
