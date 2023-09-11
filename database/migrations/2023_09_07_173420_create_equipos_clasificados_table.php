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
        Schema::create('equipos_clasificados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipos_id')->constrained('equipos','id')->cascadeOnDelete();
            $table->foreignId('playoffs_id')->constrained('playoffs','id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos_clasificados');
    }
};
