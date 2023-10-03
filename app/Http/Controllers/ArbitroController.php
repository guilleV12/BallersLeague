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
    {
        $validated = $request->validate([
            'email' => 'required|exists:users,email',
            'id_liga' => 'required|exists:ligas,id',
        ]);

        $usuario = User::where('email',$validated['email'])->get();
        $liga = Liga::where('id',$validated['id_liga'])->get();

        $arbitro = new Arbitro([
            'id_user'=>$usuario[0]->id,
            'id_liga'=>$validated['id_liga'],
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
