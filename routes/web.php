<?php

use App\Http\Controllers\ArbitroController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => Auth::user(),
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
