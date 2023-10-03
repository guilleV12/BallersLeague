<?php

use App\Http\Controllers\ArbitroController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\ProfileController;
use App\Models\Liga;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        $miLiga = Liga::where('user_id', Auth::user()->id)->get();
    } else {
        $miLiga = null;
    }

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => Auth::user(),
        'liga' => Liga::all(),
        'miLiga' => $miLiga,
    ]);
});

Route::group(['prefix' => 'ligas', 'middleware' => ['auth']], function () {
    Route::resource('ligas', LigaController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
});

Route::group(['prefix' => 'equipos', 'middleware' => ['auth']], function () {
    Route::resource('equipos', EquipoController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
});

Route::group(['prefix' => 'jugadores', 'middleware' => ['auth']], function () {
    Route::get('jugadores/{equipo}', [JugadorController::class, 'index'])->name('jugadores.index');
    Route::resource('jugadores', JugadorController::class)->only(['store', 'update', 'destroy']);
});

Route::group(['prefix' => 'arbitros', 'middleware' => ['auth']], function () {
    Route::resource('arbitros', ArbitroController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::patch('arbitros/{arbitro}', [ArbitroController::class, 'aceptar'])->name('arbitros.aceptar');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',[
        'miLiga'=>Liga::where('user_id',Auth::user()->id)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
