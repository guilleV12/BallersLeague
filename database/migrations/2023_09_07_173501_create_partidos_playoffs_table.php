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
        Schema::create('partidos_playoffs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos','id')->cascadeOnDelete();
            $table->foreignId('playoff_id')->constrained('playoffs','id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidos_playoffs');
    }
};
