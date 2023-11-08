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
        Schema::create('notificacion_resultados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos','id')->cascadeOnDelete();
            $table->foreignId('fecha_partido_id')->constrained('fecha_partidos','id')->cascadeOnDelete();
            $table->foreignId('liga_id')->constrained('ligas','id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacion_resultados');
    }
};
