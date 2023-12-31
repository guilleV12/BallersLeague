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
        Schema::create('arbitros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users','id')->cascadeOnDelete();
            $table->foreignId('id_liga')->constrained('ligas','id')->cascadeOnDelete();
            $table->string('email');
            $table->boolean('deshabilitado');
            $table->boolean('confirmado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arbitros');
    }
};
