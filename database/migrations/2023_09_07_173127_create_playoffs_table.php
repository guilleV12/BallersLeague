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
        Schema::create('playoffs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('liga_id')->constrained('ligas','id')->cascadeOnDelete();
            $table->integer('cantidad_equipos');
            $table->integer('cantidad_partidos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('playoffs');
    }
};
