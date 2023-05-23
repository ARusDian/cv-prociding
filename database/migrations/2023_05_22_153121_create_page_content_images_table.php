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
        Schema::create('page_content_images', function (Blueprint $table) {
            $table->id();
            // $table->unsignedInteger("page_content_id")->foreign()->references('id')->on('page_contents')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('page_content_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->string("path")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_content_images');
    }
};
