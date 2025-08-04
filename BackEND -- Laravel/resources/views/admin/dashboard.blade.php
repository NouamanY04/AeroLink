@extends('admin')

@section('page_title', 'Dashboard')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> 
    <!-- Total Bookings -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center"> 
        <div class="bg-blue-100 text-blue-600 rounded-full p-2 mr-3"> <!-- p-3 -> p-2, mr-4 -> mr-3 -->
            <span class="material-icons" style="font-size: 20px;">event_note</span> <!-- smaller icon -->
        </div>
        <div>
            <div class="text-gray-500 text-xs">Total Bookings</div> <!-- text-sm -> text-xs -->
            <div class="text-xl font-bold">{{ $totalBookings }}</div> <!-- text-2xl -> text-xl -->
        </div>
    </div>
    <!-- Total Revenue -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-green-100 text-green-600 rounded-full p-2 mr-3">
            <span class="material-icons" style="font-size: 20px;">attach_money</span>
        </div>
        <div>
            <div class="text-gray-500 text-xs">Total Revenue</div>
            <div class="text-xl font-bold">${{ number_format($totalRevenue, 2) }}</div>
        </div>
    </div>
    <!-- New Registered -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
            <span class="material-icons" style="font-size: 20px;">person</span>
        </div>
        <div>
            <div class="text-gray-500 text-xs">New Registered</div>
            <div class="text-xl font-bold">{{ $newUsers }}</div>
        </div>
    </div>
</div>

<!-- Recent Bookings -->
<div class="bg-white rounded-lg shadow p-4"> <!-- p-6 -> p-4 -->
    <div class="flex items-center justify-between mb-2"> <!-- mb-4 -> mb-2 -->
        <h2 class="text-base font-semibold">Recent Reservations</h2> <!-- text-lg -> text-base -->
    </div>
    <div class="divide-y">
        @forelse($recentBookings as $booking)
            <div class="flex items-center justify-between py-2"> <!-- py-4 -> py-2 -->
                <div>
                    <div class="font-semibold text-sm">#{{ $booking->id }} - {{ $booking->name }}</div> <!-- text-sm added -->
                    <div class="text-gray-500 text-xs">
                        {{ $booking->email }} &bull; {{ $booking->phone }}
                    </div>
                    <div class="text-blue-600 text-xs mt-1">
                        <span class="material-icons text-xs" style="font-size: 14px;">flight_takeoff</span> {{ $booking->departure_place }} 
                        <span class="material-icons text-xs mx-1" style="font-size: 14px;">arrow_forward</span>
                        <span class="material-icons text-xs" style="font-size: 14px;">flight_land</span> {{ $booking->arrival_place }}
                    </div>
                </div>
                <div class="flex items-center space-x-2"> <!-- space-x-4 -> space-x-2 -->
                    <div class="text-base font-bold">${{ number_format($booking->price, 2) }}</div> <!-- text-lg -> text-base -->
                    <span class="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full capitalize">{{ $booking->payment_method }}</span> <!-- px-3 -> px-2 -->
                </div>
            </div>
        @empty
            <div class="py-2 text-gray-500 text-sm">No recent reservations.</div> <!-- py-4 -> py-2, text-sm added -->
        @endforelse
    </div>
</div>
@endsection