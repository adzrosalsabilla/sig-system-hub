<?php

use App\Models\User;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->string('transaction_number')->nullable()->unique(); // Unique transaction ID
            $table->decimal('amount', 10, 2)->default(0); // Transaction amount
            $table->string('status')->nullable();
            $table->string('payment_method')->nullable(); // E.g., credit card, PayPal, etc.
            $table->json('payment_details')->nullable(); // Payment processor response
            $table->string('payment_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
