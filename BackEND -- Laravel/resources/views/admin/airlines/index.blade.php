@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Airlines</h2>
    <a href="{{ route('airlines.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Add New
    </a>
</div>

<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($airlines as $airline)
            <tr>
                <td class="px-6 py-4">{{ $airline->id }}</td>
                <td class="px-6 py-4">
                    @if($airline->image)
                        <img src="{{ asset('storage/' . $airline->image) }}" alt="Airline Image" class="w-12 h-12 object-cover rounded-full">
                    @else
                        <span class="text-gray-400 italic">No image</span>
                    @endif
                </td>
                <td class="px-6 py-4">{{ $airline->name }}</td>
                <td class="px-6 py-4">{{ $airline->code }}</td>
                <td class="px-6 py-4">{{ $airline->country }}</td>
                <td class="px-6 py-4 space-x-2">


                    <a href="{{ route('airlines.edit', $airline) }}" 
                       class="text-blue-600 hover:underline mr-2">Edit</a>

                    <form action="{{ route('airlines.destroy', $airline) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this airline?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" 
                                class="text-red-600 hover:underline">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    @if($airlines->isEmpty())
        <div class="p-6 text-center text-gray-500">No airlines found.</div>
    @endif
</div>
@endsection
