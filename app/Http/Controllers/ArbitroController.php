<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\InvitacionArbitro;
use App\Models\FechaPartido;
use App\Models\FechaPartidoPlayoff;
use App\Models\Liga;
use App\Models\Partido;
use App\Models\PartidosPlayoff;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ArbitroController extends Controller
{
    public function store(Request $request)
    {//dd($request);
        $arbitroExiste = Arbitro::where('email', $request->email)->where('id_liga',$request->id_liga)->first();
        if ($arbitroExiste){
            if ($arbitroExiste->deshabilitado == true){
                $usuario = User::where('email',$request->email)->get();
                $liga = Liga::where('id',$request->id_liga)->get();
                $arbitroExiste->deshabilitado = false;
                $arbitroExiste->confirmado = false;
                (Mail::to($request->email)->send(new InvitacionArbitro($usuario[0], $liga[0])));
                $arbitroExiste->save();
            } else {
                $messages = [
                    'email.required' => 'El campo email es obligatorio.',
                    'email.exists' => 'El correo electrónico no esta registrado en Baller League.',
                    'email.unique' => 'Este correo electrónico ya está en uso por un árbitro.',
                    'id_liga.required' => 'El campo id_liga es obligatorio.',
                    'id_liga.exists' => 'La liga seleccionada no existe en la tabla de ligas.',
                ];
        
                $validated = $request->validate([
                    'email' => 'required|exists:users,email|unique:arbitros,email',
                    'id_liga' => 'required|exists:ligas,id',
                ], $messages);
            }
        }else{
            $messages = [
                'email.required' => 'El campo email es obligatorio.',
                'email.exists' => 'El correo electrónico no esta registrado en Baller League.',
                'id_liga.required' => 'El campo id_liga es obligatorio.',
                'id_liga.exists' => 'La liga seleccionada no existe en la tabla de ligas.',
            ];
    
            $validated = $request->validate([
                'email' => 'required|exists:users,email',
                'id_liga' => 'required|exists:ligas,id',
            ], $messages);
    
            $usuario = User::where('email',$validated['email'])->get();
            $liga = Liga::where('id',$validated['id_liga'])->get();
    
            $arbitro = new Arbitro([
                'id_user'=>$usuario[0]->id,
                'id_liga'=>$validated['id_liga'],
                'email'=>$validated['email'],
                'confirmado'=>false,
                'deshabilitado'=>false,
            ]);
    
            (Mail::to($validated['email'])->send(new InvitacionArbitro($usuario[0], $liga[0])));
    
            $arbitro->save();
        }
    }

    public function aceptar(Arbitro $arbitro)
    {
        $arbitro->confirmado = true;
        $arbitro->save();
    }

    public function destroy(Arbitro $arbitro, Request $request)
    {//dd($request->canDelete);
        if ($request->canDelete == true){
            $arbitro->delete();
        } else {
            $arbitro->deshabilitado = true;
            //buscar en las fechas que esta el arbitro, si alguna ya se jugo, sea como arbitro 1 o 2, si hay partido jugado no se desacocia, si no hay si
            $fechaPartido = FechaPartido::where('arbitro_1',$arbitro->id)->get();
            $fechaPartido2 = FechaPartido::where('arbitro_2', $arbitro->id)->get();
            $fechaPartidoPO = FechaPartidoPlayoff::where('arbitro_1',$arbitro->id)->get();
            $fechaPartidoPO2 = FechaPartidoPlayoff::where('arbitro_2', $arbitro->id)->get();

            if ($fechaPartido){
                for ($i=0; $i < count($fechaPartido); $i++) { 
                    $seJugo = false;

                    $partido = Partido::where('fecha_partido_id', $fechaPartido[$i]->id)->first();

                    if ($partido){
                        $seJugo = true;
                    }

                    if ($seJugo == false){
                        $fechaPartido[$i]->arbitro_1 = null;
                        $fechaPartido[$i]->save();
                    }
                }
            }
            
            if ($fechaPartido2){
                for ($i=0; $i < count($fechaPartido2); $i++) { 
                    $seJugo = false;

                    $partido = Partido::where('fecha_partido_id', $fechaPartido2[$i]->id)->first();

                    if ($partido){
                        $seJugo = true;
                    }

                    if ($seJugo == false){
                        $fechaPartido2[$i]->arbitro_2 = null;
                        $fechaPartido2[$i]->save();
                    }
                }
            }

            if ($fechaPartidoPO){
                for ($i=0; $i < count($fechaPartidoPO); $i++) { 
                    $seJugo = false;

                    $partidoPO = PartidosPlayoff::where('fecha_partido_playoffs_id', $fechaPartidoPO[$i]->id)->first();

                    if ($partidoPO){
                        $seJugo = true;
                    }

                    if ($seJugo == false){
                        $fechaPartidoPO[$i]->arbitro_1 = null;
                        $fechaPartidoPO[$i]->save();
                    }
                }
            }
            
            if ($fechaPartidoPO2){
                for ($i=0; $i < count($fechaPartidoPO2); $i++) { 
                    $seJugo = false;

                    $partidoPO = PartidosPlayoff::where('fecha_partido_playoffs_id', $fechaPartidoPO2[$i]->id)->first();

                    if ($partidoPO){
                        $seJugo = true;
                    }

                    if ($seJugo == false){
                        $fechaPartidoPO2[$i]->arbitro_2 = null;
                        $fechaPartidoPO2[$i]->save();
                    }
                }
            }
            
            $arbitro->save();
        }
    }
}
