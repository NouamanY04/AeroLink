@extends('admin')

@section('content')
<div class="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
    <h2 class="text-2xl font-bold mb-6">Add Airport</h2>

    <form action="{{ route('airports.store') }}" method="POST">
        @csrf

        <div class="mb-4">
            <label class="block text-gray-700">Code</label>
            <input type="text" name="code" class="mt-1 block w-full border-gray-300 rounded shadow-sm" value="{{ old('code') }}" required>
            @error('code') <div class="text-red-500 text-sm">{{ $message }}</div> @enderror
        </div>

        <div class="mb-4">
            <label class="block text-gray-700">Name</label>
            <input type="text" name="name" class="mt-1 block w-full border-gray-300 rounded shadow-sm" value="{{ old('name') }}" required>
            @error('name') <div class="text-red-500 text-sm">{{ $message }}</div> @enderror
        </div>

        <div class="mb-4">
            <label class="block text-gray-700">City</label>
            <input type="text" name="city" class="mt-1 block w-full border-gray-300 rounded shadow-sm" value="{{ old('city') }}" required>
            @error('city') <div class="text-red-500 text-sm">{{ $message }}</div> @enderror
        </div>

        <div class="mb-4">
            <label class="block text-gray-700">Country</label>
            <input type="text" name="country" class="mt-1 block w-full border-gray-300 rounded shadow-sm" value="{{ old('country') }}" required>
            @error('country') <div class="text-red-500 text-sm">{{ $message }}</div> @enderror
        </div>

        <div class="flex justify-end">
            <a href="{{ route('airports.index') }}" class="mr-4 text-gray-600 hover:underline">Cancel</a>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
        </div>
    </form>
</div>
@endsection
