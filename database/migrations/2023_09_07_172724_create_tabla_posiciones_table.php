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
        Schema::create('tabla_posiciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipo_id')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('liga_id')->constrained('ligas','id')->cascadeOnDelete();
            $table->integer('posicion')->nullable();
            $table->integer('ganados')->nullable();
            $table->integer('perdidos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tabla_posiciones');
    }
};
