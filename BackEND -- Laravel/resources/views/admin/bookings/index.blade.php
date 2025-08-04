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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Card Holder</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Card Number</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CCV</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paypal Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($bookings as $booking)
            <tr>
                <td class="px-6 py-4">{{ $booking->id }}</td>
                <td class="px-6 py-4">{{ $booking->client->name ?? '' }}</td
                <td class="px-6 py-4">{{ $booking->flight->flight_number ?? '' }}</td>
                <td class="px-6 py-4">{{ $booking->seat_number }}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold capitalize {{ $booking->status == 'confirmed' ? 'bg-green-100 text-green-600' : ($booking->status == 'booked' ? 'bg-blue-100 text-blue-600' : ($booking->status == 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600')) }}">
                        {{ ucfirst($booking->status) }}
                    </span>
                </td>
                <td class="px-6 py-4">{{ $booking->payment_method }}</td>
                <td class="px-6 py-4">{{ $booking->card_holder_name }}</td>
                <td class="px-6 py-4">{{ $booking->card_number }}</td>
                <td class="px-6 py-4">{{ $booking->expiry_date }}</td>
                <td class="px-6 py-4">{{ $booking->ccv }}</td>
                <td class="px-6 py-4">{{ $booking->paypal_email }}</td>
                <td class="px-6 py-4">{{ $booking->price }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('bookings.edit', $booking) }}" class="text-blue-600 hover:underline mr-2">Edit</a>
                    <form action="{{ route('bookings.destroy', $booking) }}" method="POST" class="inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline" onclick="return confirm('Delete this booking?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if($bookings->isEmpty())
        <div class="p-6 text-center text-gray-500">No bookings found.</div>
    @endif
</div>
@endsection 