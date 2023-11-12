<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\Calendario;
use App\Models\CampeonLiga;
use App\Models\Equipo;
use App\Models\FechaPartido;
use App\Models\FechaPartidoPlayoff;
use App\Models\Jugador;
use App\Models\JugadorPartido;
use App\Models\Liga;
use App\Models\NotificacionUsuario;
use App\Models\Partido;
use App\Models\PartidosPlayoff;
use App\Models\Playoff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LigaController extends Controller
{
    public function index()
    {
        $notificacionUsuarioController = new NotificacionUsuarioController;

        return Inertia::render('Ligas/Index', [
            'user'=>Auth::user(),
            'ligas'=>Liga::all(),
            'users'=>User::all(),
            'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
            'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
        ]);
    }

    public function create()
    {
        $user = User::find(Auth::user()->id);
        $notificacionUsuarioController = new NotificacionUsuarioController;
        //dd($user->roles);
        return Inertia::render('Ligas/Create', [
            'user'=>$user,
            'liga'=>Liga::where('user_id',$user->id)->get(),
            'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string|max:255',
            'ubicacion' => 'required|string|max:255',
            'logo' => 'required|file|mimes:png|max:2048',
            'categoria' => 'required|string',
        ]);

            $filename = 'logo_liga_usuario' . $request->user()->id . '.png';
            $validated['logo']->move(public_path('images'),$filename);
            $validated['logo'] = $filename;
            $request->user()->ligas()->create($validated);
            $notificacionUsuarioController = new NotificacionUsuarioController;

            return Inertia::render('Ligas/Index', [
                'user'=>Auth::user(),
                'ligas'=>Liga::all(),
                'users'=>User::all(),
                'tituloAlert'=>'Liga creada con exito!',
                'activarAlert'=>true,
                'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
                'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
            ]);
    }
    

    public function show(Request $request, $user)
    {
        $userRol = User::find(Auth::user()->id);
        $liga = Liga::where('user_id',$user)->get();
        $rol = $userRol->roles->first();
        $notificacionUsuarioController = new NotificacionUsuarioController;
        //dd(FechaPartidoPlayoff::where('playoffs_id',Playoff::where('liga_id',1)->first()->id));

        if (count($liga)>0){
            $calendario = Calendario::where('liga_id',$liga[0]->id)->first();
            $equipos = Equipo::where('liga_id',$liga[0]->id)->get();
            $playoffs = $calendario ? Playoff::where('liga_id',$calendario->liga_id)->first() : null;

            return Inertia::render('Ligas/Show', [
                'rol'=> $rol ? $rol->name : $rol,
                'user'=>Auth::user(),
                'liga'=>$liga,
                'equipos'=>$equipos,
                'userAdmin'=>( count($liga)>0 )?( User::where('id',$liga[0]->user_id)->get() ):( null ),
                'arbitros'=>Arbitro::where('id_liga',$liga[0]->id)->get(),
                'users'=>User::all(),
                'miLiga'=>Liga::where('user_id', Auth::user()->id)->get(),
                'calendario'=>$calendario,
                'fechas' =>$calendario ? FechaPartido::where('calendario_id', $calendario->id)->get() : FechaPartido::where('id', -1)->get(),
                'jugadores'=>Jugador::all(),
                'partidos'=>$calendario ? Partido::where('calendario_id', $calendario->id)->get() : Partido::where('id', -1)->get(),
                'jugadorPartido'=>$calendario ? JugadorPartido::all() : JugadorPartido::where('id',-1)->get(),
                'notificacionesUsuario'=>NotificacionUsuario::where('user_id', Auth::user()->id)->where('liga_id', $liga[0]->id)->first(),
                'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
                'playoffs' => $calendario ? $playoffs : null,
                'fechasPlayoffs' => $playoffs ? FechaPartidoPlayoff::where('playoffs_id',$playoffs->id)->get() : null,
                'partidosPlayoffs' => $playoffs ? PartidosPlayoff::where('playoffs_id',$playoffs->id)->get() : null,
                'campeon' => CampeonLiga::where('liga_id',$liga[0]->id)->first(),
            ]);
        }else{
            return Inertia::render('Ligas/Show', [
                'user'=>Auth::user(),
                'liga'=>$liga,
                'miLiga'=>$liga,
                'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
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
            'categoria' => 'required|string',
        ]);

        $liga->nombre = $request->nombre;
        $liga->descripcion = $request->descripcion;
        $liga->ubicacion = $request->ubicacion;
        $liga->categoria = $request->categoria;

        if ($request->logo){
            Storage::disk('local')->delete('public/images/'.$liga->logo);
            $filename = 'logo_liga_usuario' . $request->user()->id . '.png';
            $validated['logo']->move(public_path('images'),$filename);
            $liga->logo = $filename;
        }

        $liga->save();
    }
    

    public function destroy(Liga $liga)
    {
        $liga->delete();
        $notificacionUsuarioController = new NotificacionUsuarioController;

        return Inertia::render('Ligas/Index', [
            'user'=>Auth::user(),
            'ligas'=>Liga::all(),
            'users'=>User::all(),
            'tituloAlert'=>'Liga eliminada con exito!',
            'activarAlert'=>true,
            'miLiga'=>Liga::where('user_id',Auth::user()->id),
            'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
        ]);    
    }
}
