@extends('admin')

@section('content')
<div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Edit Airline</h2>

    <form action="{{ route('airlines.update', $airline) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf
        @method('PUT')

        <div>
            <label for="name" class="block font-medium mb-1">Name</label>
            <input type="text" name="name" id="name" 
                   value="{{ old('name', $airline->name) }}" 
                   class="w-full border rounded px-3 py-2 @error('name') border-red-500 @enderror" required>
            @error('name')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="code" class="block font-medium mb-1">Code</label>
            <input type="text" name="code" id="code" 
                   value="{{ old('code', $airline->code) }}" 
                   class="w-full border rounded px-3 py-2 @error('code') border-red-500 @enderror" required>
            @error('code')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="country" class="block font-medium mb-1">Country</label>
            <input type="text" name="country" id="country" 
                   value="{{ old('country', $airline->country) }}" 
                   class="w-full border rounded px-3 py-2 @error('country') border-red-500 @enderror" required>
            @error('country')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label class="block font-medium mb-1">Current Image</label>
            @if($airline->image)
                <img src="{{ asset('storage/' . $airline->image) }}" alt="Current Image" class="w-32 h-32 object-cover rounded mb-2">
            @else
                <p class="text-gray-500 italic mb-2">No image uploaded.</p>
            @endif
        </div>

        <div>
            <label for="image" class="block font-medium mb-1">Change Image</label>
            <input type="file" name="image" id="image" accept="image/*" class="border rounded px-3 py-2 w-full @error('image') border-red-500 @enderror">
            @error('image')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Update Airline
            </button>
            <a href="{{ route('airlines.index') }}" class="ml-4 text-gray-600 hover:underline">Cancel</a>
        </div>
    </form>
</div>
@endsection
