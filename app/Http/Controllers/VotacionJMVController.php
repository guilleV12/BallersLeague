<?php

namespace App\Http\Controllers;

use App\Models\VotacionJMV;
use Illuminate\Http\Request;

class VotacionJMVController extends Controller
{
  
    public function store(Request $request)
    {
        //dd($request);
        $request->validate([
            'user_id' => 'required',
            'liga_id' => 'required',
            'jugador_id' => 'required|numeric',
        ]);

        $voto = new VotacionJMV([
            'user_id' => $request->user_id,
            'liga_id' => $request->liga_id,
            'jugador_id' => $request->jugador_id,
        ]);

        $voto->save();

    }

    public function update(Request $request, VotacionJMV $votacionJMV)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VotacionJMV $jmv)
    {
        $votacion = VotacionJMV::where('liga_id',$jmv->liga_id)->get();
        $votacion->each->delete();
    }
}
