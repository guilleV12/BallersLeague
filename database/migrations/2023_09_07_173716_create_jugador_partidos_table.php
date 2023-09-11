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
        Schema::create('jugador_partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->constrained('jugadors','id')->cascadeOnDelete();
            $table->foreignId('partido_id')->constrained('partidos','id')->cascadeOnDelete();
            $table->integer('puntos_anotados');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugador_partidos');
    }
};
