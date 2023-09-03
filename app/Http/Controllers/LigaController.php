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
        $user = Auth::user();

        return Inertia::render('Ligas/Index', [
            'user'=>$user,
        ]);
    }

    public function store(Request $request)
    {
        //
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
