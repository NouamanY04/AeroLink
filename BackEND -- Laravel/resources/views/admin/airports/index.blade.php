@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Airports</h2>
    <a href="{{ route('airports.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Add New
    </a>
</div>

<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($airports as $airport)
            <tr>
                <td class="px-6 py-4">{{ $airport->id }}</td>
                <td class="px-6 py-4">{{ $airport->code }}</td>
                <td class="px-6 py-4">{{ $airport->name }}</td>
                <td class="px-6 py-4">{{ $airport->city }}</td>
                <td class="px-6 py-4">{{ $airport->country }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    @if($airports->isEmpty())
        <div class="p-6 text-center text-gray-500">No airports found.</div>
    @endif
</div>
@endsection
