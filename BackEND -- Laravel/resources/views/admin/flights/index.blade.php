@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Flights</h2>
    <a href="{{ route('flights.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Flight</a>
</div>
<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrival</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
                <td class="px-6 py-4">{{ $flight->departureAirport->code ?? '' }}</td>
                <td class="px-6 py-4">{{ $flight->arrivalAirport->code ?? '' }}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold {{ $flight->status == 'scheduled' ? 'bg-blue-100 text-blue-600' : ($flight->status == 'delayed' ? 'bg-yellow-100 text-yellow-600' : ($flight->status == 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600')) }}">
                        {{ ucfirst($flight->status) }}
                    </span>
                </td>
                <td class="px-6 py-4">${{ number_format($flight->price, 2) }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('flights.edit', $flight) }}" class="text-blue-600 hover:underline mr-2">Edit</a>
                    <form action="{{ route('flights.destroy', $flight) }}" method="POST" class="inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline" onclick="return confirm('Delete this flight?')">Delete</button>
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
@endsection 