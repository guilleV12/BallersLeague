<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Goleadores;
use App\Models\Jugador;
use App\Models\JugadorPartido;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Liga;
use App\Models\NotificacionUsuario;
use Illuminate\Support\Facades\Http;

class JugadorController extends Controller
{
    public function index(Equipo $equipo)
    {
        $jugadores = Jugador::where('equipo_id', $equipo->id)
        ->get();
        $liga = Liga::where('id',$equipo->liga_id)->get();
        $notificacionUsuarioController = new NotificacionUsuarioController;

            return Inertia::render('Jugadores/Index', [
                'user'=>Auth::user(),
                'liga'=>$liga[0],
                'jugadores'=>$jugadores,
                'equipo'=>$equipo,
                'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
                'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
            ]);
    }

    public function store(Request $request)
    {
        $jugadorExiste = Jugador::where('dni',$request->dni)->first();
        if ($jugadorExiste){
            if ($jugadorExiste->deshabilitado === 1){
                $validated = $request->validate([
                    'nombre' => 'required|string|max:100',
                    'apellido' => 'required|string|max:255',
                    'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
                    'foto_perfil' => 'required|file|mimes:png',
                    'equipo_id' => 'required|exists:equipos,id',
                    'liga_id' => 'required|exists:ligas,id',
                ]);
        
                $filename = 'foto_jugador_'.$request->dni.'_equipo_'.$validated['equipo_id'].'.png';
                $validated['foto_perfil']->move(public_path('images'),$filename);
                $validated['foto_perfil'] = $filename;
                
                $jugadorExiste->nombre = $validated['nombre'];
                $jugadorExiste->apellido = $validated['apellido'];
                $jugadorExiste->dni = $request->dni;
                $jugadorExiste->fecha_nacimiento = $validated['fecha_nacimiento'];
                $jugadorExiste->equipo_id = $validated['equipo_id'];
                $jugadorExiste->liga_id = $validated['liga_id'];
                $jugadorExiste->foto_perfil = $validated['foto_perfil'];
                $jugadorExiste->deshabilitado = false;
                $jugadorExiste->save();

            } else {
                $validated = $request->validate([
                    'nombre' => 'required|string|max:100',
                    'apellido' => 'required|string|max:255',
                    'dni' => 'required|string|max:8|unique:jugadors,dni',
                    'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
                    'foto_perfil' => 'required|file|mimes:png',
                    'equipo_id' => 'required|exists:equipos,id',
                    'liga_id' => 'required|exists:ligas,id',
                ]);
            }
        } else {
            $validated = $request->validate([
                'nombre' => 'required|string|max:100',
                'apellido' => 'required|string|max:255',
                'dni' => 'required|string|max:8|unique:jugadors,dni',
                'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
                'foto_perfil' => 'required|file|mimes:png',
                'equipo_id' => 'required|exists:equipos,id',
                'liga_id' => 'required|exists:ligas,id',
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
                'liga_id' => $validated['liga_id'],
                'foto_perfil' => $validated['foto_perfil'],
                'deshabilitado' => false,
            ]);
    
            $jugador->save();   
            $liga = Liga::where('id', $request->liga_id)->first(); 
            $this->crearGoleadores($jugador->id, $liga->id);
        }
    }

    public function crearGoleadores($jugadorId, $ligaId)
    {
            $goleadores = new Goleadores([
                'jugador_id' => $jugadorId,
                'liga_id' => $ligaId,
                'puntos' => 0,
                'promedio' => 0,
                'cantidad_partidos' => 0,
            ]);

            $goleadores->save();
    }

    public function update(Request $request, Jugador $jugadore)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:255',
            'dni' => 'required|string|max:8|unique:jugadors,dni,'.$jugadore->id,
            'fecha_nacimiento' => 'required|date|before_or_equal:-18 years',
            'foto_perfil' => 'image|mimes:png'
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
        //desactivar al jugador para que no este en la lista de equipos ni sea seleccionable al jugar, pero sus estadisticas aun estan, al igual que partidos en los que participaron
        $jugadore->deshabilitado = true;
        $jugadore->save();
    }
}
