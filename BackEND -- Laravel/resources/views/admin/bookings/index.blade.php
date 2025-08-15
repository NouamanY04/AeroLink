@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Bookings</h2>
</div>
<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($bookings as $booking)
            <tr>
                <td class="px-6 py-4">{{ $booking->id }}</td>
                <td class="px-6 py-4">{{ $booking->client->name ?? '' }}</td>
                <td class="px-6 py-4">{{ $booking->flight->flight_number ?? '' }}</td>
                <td class="px-6 py-4">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold capitalize {{ $booking->status == 'confirmed' ? 'bg-green-100 text-green-600' : ($booking->status == 'booked' ? 'bg-blue-100 text-blue-600' : ($booking->status == 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600')) }}">
                        {{ ucfirst($booking->status) }}
                    </span>
                </td>
                <td class="px-6 py-4">{{ $booking->payment_method }}</td>
                <td class="px-6 py-4">{{ $booking->created_at->format('M d, Y') }}</td>
                <td class="px-6 py-4">${{ number_format($booking->price, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if($bookings->isEmpty())
    <div class="p-6 text-center text-gray-500">No bookings found.</div>
    @endif
</div>

@if($bookings instanceof \Illuminate\Pagination\LengthAwarePaginator && $bookings->hasPages())
<div class="mt-6 flex justify-center">
    <nav class="flex items-center space-x-2" aria-label="Pagination">
        @if ($bookings->onFirstPage())
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Previous</span>
        @else
        <a href="{{ $bookings->previousPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Previous</a>
        @endif

        <div class="flex items-center space-x-1">
            @foreach ($bookings->getUrlRange(1, $bookings->lastPage()) as $page => $url)
            @if ($page == $bookings->currentPage())
            <span class="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-md">{{ $page }}</span>
            @else
            <a href="{{ $url }}"
                class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">{{ $page }}</a>
            @endif
            @endforeach
        </div>

        @if ($bookings->hasMorePages())
        <a href="{{ $bookings->nextPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Next</a>
        @else
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Next</span>
        @endif
    </nav>
</div>

<div class="mt-3 text-center text-sm text-gray-600">
    Showing {{ $bookings->firstItem() ?? 0 }} to {{ $bookings->lastItem() ?? 0 }} of {{ $bookings->total() }} bookings
    ({{ $bookings->perPage() }} per page)
</div>
@endif
@endsection