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
        Schema::create('fecha_partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendario_id')->constrained('calendarios','id')->cascadeOnDelete();
            $table->foreignId('equipo_1')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('equipo_2')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('arbitro_1')->constrained('arbitros','id')->nullable()->cascadeOnDelete();
            $table->foreignId('arbitro_2')->constrained('arbitros','id')->nullable()->cascadeOnDelete();
            $table->date('fecha')->nullable();
            $table->time('horario')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fecha_partidos');
    }
};
