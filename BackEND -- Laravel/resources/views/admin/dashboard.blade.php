@extends('admin')

@section('page_title', 'Dashboard')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <!-- Total Bookings -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
            <!-- p-3 -> p-2, mr-4 -> mr-3 -->
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
            <div class="text-gray-500 text-xs">Total Website Users</div>
            <div class="text-xl font-bold">{{ $newUsers }}</div>
        </div>
    </div>
</div>

<!-- Additional Statistics -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <!-- Total Flights -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">
            <span class="material-icons" style="font-size: 20px;">flight</span>
        </div>
        <div>
            <div class="text-gray-500 text-xs">Total Flights</div>
            <div class="text-xl font-bold">{{ $totalFlights ?? 0 }}</div>
        </div>
    </div>
    <!-- Total Airlines -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
            <span class="material-icons" style="font-size: 20px;">airplanemode_active</span>
        </div>
        <div>
            <div class="text-gray-500 text-xs">Total Airlines</div>
            <div class="text-xl font-bold">{{ $totalAirlines ?? 0 }}</div>
        </div>
    </div>
    <!-- Total Airports -->
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
        <div class="bg-teal-100 text-teal-600 rounded-full p-2 mr-3">
            <span class="material-icons" style="font-size: 20px;">location_on</span>
        </div>
        <div>
            <div class="text-gray-500 text-xs">Total Airports</div>
            <div class="text-xl font-bold">{{ $totalAirports ?? 0 }}</div>
        </div>
    </div>
</div>

<!-- Recent Bookings -->
<div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-semibold">Recent Reservations</h2>
        <a href="{{ route('bookings.index') }}" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All →
        </a>
    </div>
    <div class="divide-y">
        @forelse($recentBookings as $booking)
        <div
            class="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-2">
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                    <div class="font-semibold text-sm">#{{ $booking->id }}</div>
                    <span class="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full capitalize">
                        {{ ucfirst($booking->status) }}
                    </span>
                </div>
                <div class="text-gray-700 text-sm font-medium mb-1">
                    {{ $booking->client->name ?? 'Unknown Client' }}
                </div>
                <div class="flex items-center space-x-4 text-gray-500 text-xs">
                    <div class="flex items-center space-x-1">
                        <span class="material-icons text-xs" style="font-size: 12px;">flight_takeoff</span>
                        <span>{{ $booking->flight->departureAirport->city ?? 'Unknown' }}</span>
                        <span class="material-icons text-xs mx-1" style="font-size: 12px;">arrow_forward</span>
                        <span class="material-icons text-xs" style="font-size: 12px;">flight_land</span>
                        <span>{{ $booking->flight->arrivalAirport->city ?? 'Unknown' }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <span class="text-gray-400">•</span>
                        <span>Flight: {{ $booking->flight->flight_number ?? 'Unknown' }}</span>
                        <span class="text-gray-400">•</span>
                        <span>{{ \Carbon\Carbon::parse($booking->created_at)->format('M d, Y') }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end space-y-1">
                <div class="text-base font-bold text-green-600">${{ number_format($booking->price, 2) }}</div>
                <span class="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full capitalize">
                    {{ $booking->payment_method ?? 'N/A' }}
                </span>
            </div>
        </div>
        @empty
        <div class="py-8 text-center">
            <div class="text-gray-400 mb-2">
                <span class="material-icons" style="font-size: 48px;">event_busy</span>
            </div>
            <div class="text-gray-500 text-sm">No recent reservations found</div>
            <div class="text-gray-400 text-xs mt-1">New bookings will appear here</div>
        </div>
        @endforelse
    </div>
</div>
@endsection