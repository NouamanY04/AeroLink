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
        <div class="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
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
                        <h1 class="text-2xl font-bold text-white">{{ $client->name }}'s Bookings</h1>
                        <p class="text-indigo-100">Client ID: {{ $client->id }}</p>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <a href="{{ route('clients.show', $client) }}"
                        class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md font-medium text-sm text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-150">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                            </path>
                        </svg>
                        View Profile
                    </a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Total Bookings</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ $bookings->total() }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
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
                    <dt class="text-sm font-medium text-gray-500">Phone</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        @if($client->phone)
                        <a href="tel:{{ $client->phone }}"
                            class="text-blue-600 hover:text-blue-800">{{ $client->phone }}</a>
                        @else
                        <span class="text-gray-400">No phone number</span>
                        @endif
                    </dd>
                </div>
            </dl>
        </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Booking History</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Complete list of all bookings made by this client.</p>
        </div>

        @if($bookings->isNotEmpty())
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Booking Details</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Flight Info</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status & Price</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($bookings as $booking)
                    <tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <div
                                        class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span class="text-sm font-medium text-white">#{{ $booking->id }}</span>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">Booking #{{ $booking->id }}</div>
                                    @if($booking->seat_number)
                                    <div class="text-sm text-gray-500">Seat: {{ $booking->seat_number }}</div>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($booking->flight)
                            <div class="text-sm text-gray-900">
                                <div class="font-medium">{{ $booking->flight->flight_number ?? 'N/A' }}</div>
                                @if($booking->flight->departure_airport && $booking->flight->arrival_airport)
                                <div class="text-gray-500">
                                    {{ $booking->flight->departure_airport->city ?? 'N/A' }} →
                                    {{ $booking->flight->arrival_airport->city ?? 'N/A' }}
                                </div>
                                @endif
                            </div>
                            @else
                            <div class="text-sm text-gray-400">Flight info unavailable</div>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex flex-col space-y-2">
                                <span
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                    {{ $booking->status == 'confirmed' ? 'bg-green-100 text-green-800' : 
                                       ($booking->status == 'booked' ? 'bg-blue-100 text-blue-800' : 
                                       ($booking->status == 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')) }}">
                                    {{ $booking->status }}
                                </span>
                                @if($booking->price)
                                <div class="text-sm font-semibold text-gray-900">
                                    ${{ number_format($booking->price, 2) }}</div>
                                @endif
                                @if($booking->payment_method)
                                <div class="text-xs text-gray-500">{{ ucfirst($booking->payment_method) }}</div>
                                @endif
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div class="text-sm font-medium">{{ $booking->created_at->format('M d, Y') }}</div>
                            <div class="text-gray-500">{{ $booking->created_at->format('H:i') }}</div>
                            <div class="text-xs text-gray-400">{{ $booking->created_at->diffForHumans() }}</div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($bookings->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                    @if ($bookings->onFirstPage())
                    <span
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-white cursor-not-allowed">
                        Previous
                    </span>
                    @else
                    <a href="{{ $bookings->previousPageUrl() }}"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </a>
                    @endif

                    @if ($bookings->hasMorePages())
                    <a href="{{ $bookings->nextPageUrl() }}"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </a>
                    @else
                    <span
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-white cursor-not-allowed">
                        Next
                    </span>
                    @endif
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing
                            <span class="font-medium">{{ $bookings->firstItem() }}</span>
                            to
                            <span class="font-medium">{{ $bookings->lastItem() }}</span>
                            of
                            <span class="font-medium">{{ $bookings->total() }}</span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            @if ($bookings->onFirstPage())
                            <span
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 cursor-not-allowed">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            @else
                            <a href="{{ $bookings->previousPageUrl() }}"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                            @endif

                            @foreach ($bookings->getUrlRange(1, $bookings->lastPage()) as $page => $url)
                            @if ($page == $bookings->currentPage())
                            <span
                                class="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600">
                                {{ $page }}
                            </span>
                            @else
                            <a href="{{ $url }}"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {{ $page }}
                            </a>
                            @endif
                            @endforeach

                            @if ($bookings->hasMorePages())
                            <a href="{{ $bookings->nextPageUrl() }}"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                            @else
                            <span
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400 cursor-not-allowed">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            @endif
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        @endif

        @else
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p class="mt-1 text-sm text-gray-500">This client hasn't made any bookings yet.</p>
        </div>
        @endif
    </div>
</div>
@endsection