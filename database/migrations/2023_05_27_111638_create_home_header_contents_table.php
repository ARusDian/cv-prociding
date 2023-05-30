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
        Schema::create('home_header_contents', function (Blueprint $table) {
            $table->id();
            $table->string('background_image_path')->nullable(false);
            $table->string('logo_path')->nullable(false);
            $table->date('date_stamp')->nullable(false);
            $table->string('title')->nullable(false);
            $table->string('subtitle')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_header_contents');
    }
};
