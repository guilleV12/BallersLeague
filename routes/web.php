<?php

use App\Http\Controllers\ArbitroController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\FechaPartidoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\NotificacionPartidoController;
use App\Http\Controllers\NotificacionResultadoController;
use App\Http\Controllers\NotificacionUsuarioController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SportsDBService;
use App\Models\FechaPartido;
use App\Models\Liga;
use App\Models\NotificacionUsuario;
use App\Models\User;
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
    $notificacionUsuarioController = new NotificacionUsuarioController();


    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => Auth::user(),
        'liga' => Liga::all(),
        'miLiga' => $miLiga,
        'notificaciones' => Auth::check() ? $notificacionUsuarioController->notificacionesDropDown() : null,
    ]);
});

Route::group(['prefix' => 'ligas', 'middleware' => ['auth']], function () {
    Route::resource('ligas', LigaController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
});

Route::group(['prefix' => 'notificaciones', 'middleware' => ['auth']], function () {
    Route::resource('notificaciones', NotificacionUsuarioController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
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

Route::group(['prefix' => 'calendario', 'middleware' => ['auth']], function () {
    Route::resource('calendario', CalendarioController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
    Route::patch('calendario/{calendario}', [CalendarioController::class, 'destroyFixture'])->name('calendario.destroyfixture');
});

Route::group(['prefix' => 'fechapartido', 'middleware' => ['auth']], function () {
    Route::resource('fechapartido', FechaPartidoController::class)->only(['store', 'update', 'destroy', 'show']);
    Route::patch('fechapartido/{fechapartido}', [FechaPartidoController::class, 'update'])->name('fechapartido.update');
    Route::put('fechapartido/{fechapartido}', [FechaPartidoController::class, 'asignarArbitrosTodos'])->name('fechapartido.asignarArbitros');
});

Route::group(['prefix' => 'partido', 'middleware' => ['auth']], function () {
    Route::resource('partido', PartidoController::class)->only(['index', 'store', 'update', 'destroy', 'create', 'show']);
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
