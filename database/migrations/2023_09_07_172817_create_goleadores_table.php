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
        Schema::create('goleadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->constrained('jugadors','id')->cascadeOnDelete();
            $table->foreignId('liga_id')->constrained('ligas','id')->cascadeOnDelete();
            $table->integer('puntos')->nullable();
            $table->integer('promedio')->nullable();
            $table->integer('cantidad_partidos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goleadores');
    }
};
