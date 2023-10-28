<?php

namespace App\Http\Controllers;

use App\Models\Arbitro;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\InvitacionArbitro;
use App\Models\Liga;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ArbitroController extends Controller
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
    {//dd($request);
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

        $usuario = User::where('email',$validated['email'])->get();
        $liga = Liga::where('id',$validated['id_liga'])->get();

        $arbitro = new Arbitro([
            'id_user'=>$usuario[0]->id,
            'id_liga'=>$validated['id_liga'],
            'email'=>$validated['email'],
            'confirmado'=>false,
        ]);

        (Mail::to($validated['email'])->send(new InvitacionArbitro($usuario[0], $liga[0])));

        $arbitro->save();
    }

    public function show(Arbitro $arbitro)
    {
    }

    public function aceptar(Arbitro $arbitro)
    {
        $arbitro->confirmado = true;
        $arbitro->save();
    }

    public function edit(Arbitro $arbitro)
    {
        //
    }

    public function update(Request $request, Arbitro $arbitro)
    {
        //
    }

    public function destroy(Arbitro $arbitro)
    {
        $arbitro->delete();
    }
}
