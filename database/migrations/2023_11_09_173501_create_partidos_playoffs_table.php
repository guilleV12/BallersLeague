<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partidos_playoffs', function (Blueprint $table) {
            $table->id();
            $table->integer('puntaje_equipo_1');
            $table->integer('puntaje_equipo_2');
            $table->foreignId('fecha_partido_playoffs_id')->constrained('fecha_partido_playoffs','id')->cascadeOnDelete();
            $table->foreignId('playoffs_id')->constrained('playoffs','id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidos_playoffs');
    }
};
