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
        Schema::create('patrocinadors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('liga_patrocinada')->constrained('ligas','id')->cascadeOnDelete();
            $table->string('nombre');
            $table->char('descripcion');
            $table->binary('logo');
            $table->boolean('prioridad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patrocinadors');
    }
};
