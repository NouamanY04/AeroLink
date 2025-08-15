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
        Schema::table('flights', function (Blueprint $table) {
            // Add type_vol field if it doesn't exist
            if (!Schema::hasColumn('flights', 'type_vol')) {
                $table->string('type_vol')->nullable()->default('Round-trip');
            }
        });

        // Update existing flights to have a default type_vol value
        DB::table('flights')->whereNull('type_vol')->update(['type_vol' => 'Round-trip']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('flights', function (Blueprint $table) {
            // Remove type_vol field if it exists
            if (Schema::hasColumn('flights', 'type_vol')) {
                $table->dropColumn('type_vol');
            }
        });
    }
};
