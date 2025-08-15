@extends('admin')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Back Navigation -->
    <div class="mb-6">
        <a href="{{ route('users.index') }}"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-150">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
            </svg>
            Back to Clients
        </a>
    </div>

    <!-- Client Header -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-16 w-16">
                        <div
                            class="h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-2 border-white">
                            <span
                                class="text-2xl font-bold text-white">{{ strtoupper(substr($client->name, 0, 2)) }}</span>
                        </div>
                    </div>
                    <div class="ml-6">
                        <h1 class="text-2xl font-bold text-white">{{ $client->name }}</h1>
                        <p class="text-blue-100">Client ID: {{ $client->id }}</p>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <a href="{{ route('clients.bookings', $client) }}"
                        class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md font-medium text-sm text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-150">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        View Bookings
                    </a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ $client->name }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        @if($client->user)
                        <a href="mailto:{{ $client->user->email }}"
                            class="text-blue-600 hover:text-blue-800">{{ $client->user->email }}</a>
                        @else
                        <span class="text-gray-400">No email associated</span>
                        @endif
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        @if($client->phone)
                        <a href="tel:{{ $client->phone }}"
                            class="text-blue-600 hover:text-blue-800">{{ $client->phone }}</a>
                        @else
                        <span class="text-gray-400">No phone number</span>
                        @endif
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        @if($client->city)
                        {{ $client->city }}
                        @else
                        <span class="text-gray-400">No city provided</span>
                        @endif
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Passport Number</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        @if($client->passport_number)
                        <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ $client->passport_number }}</span>
                        @else
                        <span class="text-gray-400">No passport number</span>
                        @endif
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Member Since</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ $client->created_at->format('F j, Y') }}
                        <span class="text-gray-500 ml-2">({{ $client->created_at->diffForHumans() }})</span>
                    </dd>
                </div>
            </dl>
        </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                            <dd class="text-lg font-semibold text-gray-900">{{ $client->bookings->count() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">Active Bookings</dt>
                            <dd class="text-lg font-semibold text-gray-900">
                                {{ $client->bookings->where('status', '!=', 'cancelled')->count() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">Last Activity</dt>
                            <dd class="text-lg font-semibold text-gray-900">
                                @if($client->bookings->isNotEmpty())
                                {{ $client->bookings->last()->created_at->format('M d') }}
                                @else
                                <span class="text-gray-400">Never</span>
                                @endif
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Bookings Preview -->
    @if($client->bookings->isNotEmpty())
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Latest booking activity for this client.</p>
                </div>
                <a href="{{ route('clients.bookings', $client) }}"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150">
                    View All Bookings
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>

        <div class="overflow-hidden">
            <ul class="divide-y divide-gray-200">
                @foreach($client->bookings->take(3) as $booking)
                <li class="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <div
                                    class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                    @if($booking->flight)
                                    Flight {{ $booking->flight->flight_number ?? 'N/A' }}
                                    @else
                                    Booking #{{ $booking->id }}
                                    @endif
                                </div>
                                <div class="text-sm text-gray-500">{{ $booking->created_at->format('M d, Y H:i') }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                {{ $booking->status == 'confirmed' ? 'bg-green-100 text-green-800' : 
                                   ($booking->status == 'booked' ? 'bg-blue-100 text-blue-800' : 
                                   ($booking->status == 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')) }}">
                                {{ $booking->status }}
                            </span>
                            @if($booking->price)
                            <span
                                class="text-sm font-medium text-gray-900">${{ number_format($booking->price, 2) }}</span>
                            @endif
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
    @else
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">No Bookings Yet</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">This client hasn't made any bookings yet.</p>
        </div>
        <div class="px-4 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p class="mt-1 text-sm text-gray-500">This client will appear here once they make their first booking.</p>
        </div>
    </div>
    @endif
</div>
@endsection