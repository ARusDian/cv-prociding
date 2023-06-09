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
        Schema::create('home_keynote_contents', function (Blueprint $table) {
            $table->id();
            $table->string('img_path')->nullable(true);
            $table->string('name')->nullable(false);
            $table->string('title')->nullable(false);
            $table->string('affiliation')->nullable(false);
            $table->unsignedInteger('rank')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_keynote_contents');
    }
};
