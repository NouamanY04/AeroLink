@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">CRM (Customer Relationship Management)</h2>
</div>
<div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reservations</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Booking</th>
                <th class="px-4 py-2"></th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @foreach($clients as $client)
            <tr>
                <td class="px-4 py-2">{{ $client->id }}</td>
                <td class="px-4 py-2">{{ $client->name }}</td>
                <td class="px-4 py-2">{{ $client->user->email ?? '' }}</td>
                <td class="px-4 py-2">{{ $client->phone }}</td>
                <td class="px-4 py-2">{{ $client->bookings->count() }}</td>
                <td class="px-4 py-2">
                    @if($client->bookings->isNotEmpty())
                        {{ $client->bookings->last()->created_at->format('Y-m-d H:i') }}
                    @else
                        <span class="text-gray-400">—</span>
                    @endif
                </td>
                <td class="px-4 py-2 text-right space-x-2">
                    <a href="{{ route('admin.dashboard', $client) }}" class="text-blue-600 hover:underline">View</a>
                    <a href="{{ route('admin.dashboard', $client) }}" class="text-yellow-600 hover:underline">Edit</a>
                    <a href="{{ route('admin.dashboard', $client) }}" class="text-indigo-600 hover:underline">Bookings</a>
                    <form action="{{ route('users.destroy', $client) }}" method="POST" class="inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:underline" onclick="return confirm('Delete this client?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @if($clients->isEmpty())
        <div class="p-6 text-center text-gray-500">No clients found.</div>
    @endif
</div>
@endsection