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
        // AIRLINES
        Schema::create('airlines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 10)->unique();
            $table->string('country');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // AIRPORTS
        Schema::create('airports', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name');
            $table->string('city');
            $table->string('country');
            $table->timestamps();
        });

        // CLIENTS
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('country');
            $table->string('city');
            $table->timestamps();
        });

        // FLIGHTS
        Schema::create('flights', function (Blueprint $table) {
            $table->id(); // id: 13
            $table->string('flight_number')->unique(); // Not in JS, but required
            $table->foreignId('airline_id')->constrained('airlines')->onDelete('cascade'); // airline: "Fly Emirates"
            $table->foreignId('departure_airport_id')->constrained('airports'); // departure_place: "Frankfurt"
            $table->foreignId('arrival_airport_id')->constrained('airports'); // arrival_place: "Madrid"
            $table->dateTime('departure_time'); // date_depart + heure_depart: "2025-07-12 06:45"
            $table->dateTime('arrival_time'); // date_Arrive + heure_arrive: "2025-07-12 09:30"
            $table->enum('status', ['scheduled', 'delayed', 'cancelled', 'completed'])->default('scheduled'); // Not in JS, but required
            $table->decimal('price', 10, 2); // price: 15500
            $table->enum('class', ['economy', 'business', 'first'])->default('economy'); // type: 'Business class'
            $table->integer('stops')->default(0); // stops: 0
            $table->string('type_vol')->nullable(); // type_vol: 'Round-trip flight'
            $table->timestamps();
        });

            // BOOKINGS
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('flight_id')->constrained('flights')->onDelete('cascade');
            $table->string('seat_number')->nullable();
            $table->enum('status', ['booked', 'cancelled', 'checked-in', 'confirmed'])->default('booked');
            $table->enum('payment_method', ['credit_card', 'debit_card', 'paypal']);
            $table->integer('price')->unsigned()->default(0);
            $table->foreignId('payment_id')->nullable()->constrained('payments')->nullOnDelete();
            $table->timestamps();
        });

         Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->nullOnDelete();
            $table->enum('payment_method', ['credit_card', 'debit_card', 'paypal']);
            $table->string('card_holder_name')->nullable();
            $table->string('card_last4', 4)->nullable();
            $table->string('expiry_date')->nullable();
            $table->string('paypal_email')->nullable();
            $table->enum('payment_status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamp('payment_date')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airlines');
        Schema::dropIfExists('airports');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('flights');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('payments');
    }
};
