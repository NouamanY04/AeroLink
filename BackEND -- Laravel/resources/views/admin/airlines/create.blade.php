@extends('admin')

@section('content')
<div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Create New Airline</h2>

    @if ($errors->any())
        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded">
            <ul class="list-disc pl-5 space-y-1">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('airlines.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf

        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Airline Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                   class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200">
        </div>

        <div>
            <label for="code" class="block text-sm font-medium text-gray-700">Code</label>
            <input type="text" name="code" id="code" value="{{ old('code') }}" required
                   class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200">
        </div>

        <div>
            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" name="country" id="country" value="{{ old('country') }}" required
                   class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200">
        </div>

        <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image (optional)</label>
            <input type="file" name="image" id="image"
                   class="mt-1 block w-full text-sm text-gray-700 file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2">
        </div>

        <div class="flex justify-between">
            <a href="{{ route('airlines.index') }}" class="text-gray-600 hover:underline">← Back</a>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Create Airline
            </button>
        </div>
    </form>
</div>
@endsection
