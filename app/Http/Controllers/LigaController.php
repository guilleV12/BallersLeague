<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\Equipo;
use App\Models\Liga;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LigaController extends Controller
{
    public function index()
    {
        return Inertia::render('Ligas/Index', [
            'user'=>Auth::user(),
            'ligas'=>Liga::all(),
            'users'=>User::all(),
        ]);
    }

    public function create()
    {
        $user = User::find(Auth::user()->id);
        return Inertia::render('Ligas/Create', [
            'user'=>$user,
            'liga'=>Liga::where('user_id',$user->id)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string|max:255',
            'ubicacion' => 'required|string|max:255',
            'logo' => 'required|file|mimes:png|max:2048',
        ]);
            $filename = 'logo_liga_usuario' . $request->user()->id . '.png';
            $validated['logo']->move(public_path('images'),$filename);
            $validated['logo'] = $filename;
            $request->user()->ligas()->create($validated);
            return redirect(route('ligas.index'))->with('success', 'Liga creada exitosamente.');
    }
    

    public function show(Request $request, $user)
    {
        $liga = Liga::where('user_id',$user)->get();
        if (count($liga)>0){
            $equipos = Equipo::where('liga_id',$liga[0]->id)->get();
            return Inertia::render('Ligas/Show', [
                'user'=>Auth::user(),
                'liga'=>$liga,
                'equipos'=>$equipos,
                'userAdmin'=>( count($liga)>0 )?( User::where('id',$liga[0]->user_id)->get() ):( null ),
                'arbitros'=>Arbitro::where('id_liga',$liga[0]->id)->get(),
                'users'=>User::all(),
            ]);
        }else{
            return Inertia::render('Ligas/Create', [
                'user'=>Auth::user(),
                'liga'=>(-1),
                'equipos'=>null,
                'userAdmin'=>null,
            ]);
        }
        
    }

    public function update(Request $request, Liga $liga)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'ubicacion' => 'required|string|max:255',
            'logo' => 'image|mimes:png|max:2048',
        ]);
        $liga->nombre = $request->nombre;
        $liga->descripcion = $request->descripcion;
        $liga->ubicacion = $request->ubicacion;
        if ($request->logo){
            Storage::disk('local')->delete('public/images/'.$liga->logo);
            $filename = 'logo_liga_usuario' . $request->user()->id . '.png';
            $validated['logo']->move(public_path('images'),$filename);
            $liga->logo = $filename;
        }
        $liga->save();
        return back()->with('success', 'La liga se ha actualizado correctamente');
    }
    

    public function destroy(Liga $liga)
    {
        $liga->delete();
        return redirect(route('ligas.index'))->with('success', 'Liga eliminada exitosamente.');
    }
}
