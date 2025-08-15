@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Flights</h2>
    <a href="{{ route('flights.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add
        Flight</a>
</div>
<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($flights as $flight)
            <tr>
                <td class="px-6 py-4">{{ $flight->id }}</td>
                <td class="px-6 py-4">{{ $flight->flight_number }}</td>
                <td class="px-6 py-4">{{ $flight->airline->name ?? '' }}</td>
                <td class="px-6 py-4">
                    <div class="text-sm">
                        <div class="font-medium">{{ $flight->departureAirport->city ?? '' }}</div>
                        <div class="text-gray-500">
                            {{ \Carbon\Carbon::parse($flight->departure_time)->format('M d, Y') }}</div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold {{ $flight->status == 'scheduled' ? 'bg-blue-100 text-blue-600' : ($flight->status == 'delayed' ? 'bg-yellow-100 text-yellow-600' : ($flight->status == 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600')) }}">
                        {{ ucfirst($flight->status) }}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold {{ $flight->class == 'economy' ? 'bg-gray-100 text-gray-600' : ($flight->class == 'business' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600') }}">
                        {{ ucfirst($flight->class) }}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold {{ $flight->type_vol == 'Round-trip' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600' }}">
                        {{ $flight->type_vol ?? 'N/A' }}
                    </span>
                </td>
                <td class="px-6 py-4">${{ number_format($flight->price, 2) }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('flights.edit', $flight) }}" class="text-blue-600 hover:underline mr-2">Edit</a>
                    <form action="{{ route('flights.destroy', $flight) }}" method="POST" class="inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline"
                            onclick="return confirm('Delete this flight?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if($flights->isEmpty())
    <div class="p-6 text-center text-gray-500">No flights found.</div>
    @endif
</div>

<!-- Pagination -->
@if($flights->hasPages())
<div class="mt-6 flex justify-center">
    <nav class="flex items-center space-x-2" aria-label="Pagination">
        {{-- Previous Page Link --}}
        @if ($flights->onFirstPage())
        <span class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-300 rounded-md cursor-not-allowed">
            Previous
        </span>
        @else
        <a href="{{ $flights->previousPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition">
            Previous
        </a>
        @endif

        {{-- Pagination Elements --}}
        <div class="flex items-center space-x-1">
            @foreach ($flights->getUrlRange(1, $flights->lastPage()) as $page => $url)
            @if ($page == $flights->currentPage())
            <span class="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-md">
                {{ $page }}
            </span>
            @else
            <a href="{{ $url }}"
                class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition">
                {{ $page }}
            </a>
            @endif
            @endforeach
        </div>

        {{-- Next Page Link --}}
        @if ($flights->hasMorePages())
        <a href="{{ $flights->nextPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition">
            Next
        </a>
        @else
        <span class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-300 rounded-md cursor-not-allowed">
            Next
        </span>
        @endif
    </nav>
</div>
@endif

<!-- Page Info -->
<div class="mt-4 text-center text-sm text-gray-600">
    Showing {{ $flights->firstItem() ?? 0 }} to {{ $flights->lastItem() ?? 0 }} of {{ $flights->total() }} flights
</div>
@endsection