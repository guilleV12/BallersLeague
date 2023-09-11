<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LigaController extends Controller
{
    public function index()
    {
        return Inertia::render('Ligas/Index', [
            'user'=>Auth::user(),
            'ligas'=>Liga::with('user:id,name')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Ligas/Create', [
            'user'=>Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'body' => 'required|string|max:255'
        ]);

        $request->user()->ligas()->create($validated);

        return redirect(route('ligas.index'));
    }

    public function show()
    {
        return Inertia::render('Ligas/Show', [
            'user'=>Auth::user(),
            'ligas'=>Liga::with('user:id,name')->whereBelongsTo(Auth::user())->get(),
        ]);
    }

    public function liga($liga)
    {
        return Inertia::render('Ligas/Liga',[
            'user'=>Auth::user(),
            'liga'=>Liga::with('user:id,name')->whereKey($liga)->get(),
        ]);
    }

    public function update(Request $request, Liga $liga)
    {
        //
    }

    public function destroy(Liga $liga)
    {
        //
    }
}
