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
        Schema::create('fecha_partido_playoffs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('playoffs_id')->constrained('playoffs','id')->cascadeOnDelete();
            $table->foreignId('equipo_1')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('equipo_2')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('arbitro_1')->nullable()->constrained('arbitros', 'id')->onUpdate('cascade')->onDelete('set null');            
            $table->foreignId('arbitro_2')->nullable()->constrained('arbitros', 'id')->onUpdate('cascade')->onDelete('set null'); 
            $table->date('fecha')->nullable();
            $table->time('horario')->nullable();
            $table->integer('ronda');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fecha_partido_playoffs');
    }
};
