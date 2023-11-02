<?php

namespace App\Http\Controllers;

use App\Models\NotificacionUsuario;
use Illuminate\Http\Request;

class NotificacionUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'notificacion_partido'=>'required',
            'notificacion_resultado'=>'required',
            'liga_id'=>'required',
            'user_id'=>'required',
        ]);
        //dd($request);

        $notificacion = NotificacionUsuario::where('user_id',$request->user_id)->first();
        $notificacion->notificacion_partido = $request->notificacion_partido;
        $notificacion->notificacion_resultado = $request->notificacion_resultado;
        $notificacion->liga_id = $request->liga_id;
        $notificacion->user_id = $request->user_id;

        $notificacion->save();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NotificacionUsuario $notifiacionUsuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NotificacionUsuario $notifiacionUsuario)
    {
        //
    }
}
