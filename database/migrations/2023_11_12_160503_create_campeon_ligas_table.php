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
        Schema::create('campeon_ligas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('liga_id')->constrained('ligas','id')->cascadeOnDelete();
            $table->foreignId('equipo_id')->constrained('equipos','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campeon_ligas');
    }
};
