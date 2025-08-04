@extends('admin')

@section('content')
<div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
    <h2 class="text-2xl font-bold mb-6">Edit Flight</h2>
    <form action="{{ route('flights.update', $flight) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-4">
            <label class="block text-gray-700">Flight Number</label>
            <input type="text" name="flight_number" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('flight_number', $flight->flight_number) }}">
            @error('flight_number')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Airline</label>
            <select name="airline_id" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required>
                <option value="">Select Airline</option>
                @foreach($airlines as $airline)
                    <option value="{{ $airline->id }}" {{ old('airline_id', $flight->airline_id) == $airline->id ? 'selected' : '' }}>{{ $airline->name }}</option>
                @endforeach
            </select>
            @error('airline_id')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Departure Airport</label>
            <select name="departure_airport_id" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required>
                <option value="">Select Departure</option>
                @foreach($airports as $airport)
                    <option value="{{ $airport->id }}" {{ old('departure_airport_id', $flight->departure_airport_id) == $airport->id ? 'selected' : '' }}>{{ $airport->code }} - {{ $airport->name }}</option>
                @endforeach
            </select>
            @error('departure_airport_id')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Arrival Airport</label>
            <select name="arrival_airport_id" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required>
                <option value="">Select Arrival</option>
                @foreach($airports as $airport)
                    <option value="{{ $airport->id }}" {{ old('arrival_airport_id', $flight->arrival_airport_id) == $airport->id ? 'selected' : '' }}>{{ $airport->code }} - {{ $airport->name }}</option>
                @endforeach
            </select>
            @error('arrival_airport_id')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Departure Time</label>
            <input type="datetime-local" name="departure_time" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('departure_time', date('Y-m-d\TH:i', strtotime($flight->departure_time))) }}">
            @error('departure_time')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Arrival Time</label>
            <input type="datetime-local" name="arrival_time" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('arrival_time', date('Y-m-d\TH:i', strtotime($flight->arrival_time))) }}">
            @error('arrival_time')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Status</label>
            <select name="status" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required>
                <option value="scheduled" {{ old('status', $flight->status) == 'scheduled' ? 'selected' : '' }}>Scheduled</option>
                <option value="delayed" {{ old('status', $flight->status) == 'delayed' ? 'selected' : '' }}>Delayed</option>
                <option value="cancelled" {{ old('status', $flight->status) == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                <option value="completed" {{ old('status', $flight->status) == 'completed' ? 'selected' : '' }}>Completed</option>
            </select>
            @error('status')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Price</label>
            <input type="number" step="0.01" name="price" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('price', $flight->price) }}">
            @error('price')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Seats Total</label>
            <input type="number" name="seats_total" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('seats_total', $flight->seats_total) }}">
            @error('seats_total')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="mb-4">
            <label class="block text-gray-700">Seats Available</label>
            <input type="number" name="seats_available" class="mt-1 block w-full border-gray-300 rounded shadow-sm" required value="{{ old('seats_available', $flight->seats_available) }}">
            @error('seats_available')<div class="text-red-500 text-sm">{{ $message }}</div>@enderror
        </div>
        <div class="flex justify-end">
            <a href="{{ route('flights.index') }}" class="mr-4 text-gray-600 hover:underline">Cancel</a>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update</button>
        </div>
    </form>
</div>
@endsection 