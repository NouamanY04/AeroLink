@extends('admin')

@section('content')
<div class="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
    <h2 class="text-2xl font-bold mb-6">Edit Airport</h2>

    <form action="{{ route('airports.update', $airport) }}" method="POST" class="space-y-6">
        @csrf
        @method('PUT')

        <div>
            <label for="code" class="block font-medium mb-1">Code</label>
            <input type="text" name="code" id="code"
                   value="{{ old('code', $airport->code) }}"
                   class="w-full border  rounded px-3 py-2 @error('code') border-red-500 @enderror" required>
            @error('code')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="name" class="block font-medium mb-1">Name</label>
            <input type="text" name="name" id="name"
                   value="{{ old('name', $airport->name) }}"
                   class="w-full border  rounded px-3 py-2 @error('name') border-red-500 @enderror" required>
            @error('name')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="city" class="block font-medium mb-1">City</label>
            <input type="text" name="city" id="city"
                   value="{{ old('city', $airport->city) }}"
                   class="w-full border  rounded px-3 py-2 @error('city') border-red-500 @enderror" required>
            @error('city')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="country" class="block font-medium mb-1">Country</label>
            <input type="text" name="country" id="country"
                   value="{{ old('country', $airport->country) }}"
                   class="w-full border  rounded px-3 py-2 @error('country') border-red-500 @enderror" required>
            @error('country')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Update Airport
            </button>
            <a href="{{ route('airports.index') }}" class="ml-4 text-gray-600