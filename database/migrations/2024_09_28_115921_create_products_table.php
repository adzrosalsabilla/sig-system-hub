<?php

use App\Models\ProductCategory;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ProductCategory::class)->nullable();
            $table->string('name');
            $table->integer('stock')->nullable()->default(0);
            $table->decimal('price', 10, 2)->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['draft', 'active', 'archived'])->nullable()->default('draft');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
