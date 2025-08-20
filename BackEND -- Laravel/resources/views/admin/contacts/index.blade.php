
@extends('admin')

@section('page_title', 'Client Requests')

@section('content')
<div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Client Requests</h2>
    @if($contacts->count())
    <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
            <thead>
                <tr class="bg-blue-50 text-blue-900">
                    <th class="px-4 py-2 text-left">Name</th>
                    <th class="px-4 py-2 text-left">Email</th>
                    <th class="px-4 py-2 text-left">Message</th>
                    <th class="px-4 py-2 text-left">User</th>
                    <th class="px-4 py-2 text-left">Date</th>
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                @foreach($contacts as $contact)
                <tr class="border-b hover:bg-blue-50">
                    <td class="px-4 py-2">{{ $contact->name }}</td>
                    <td class="px-4 py-2">{{ $contact->email }}</td>
                    <td class="px-4 py-2 truncate max-w-xs">{{ Str::limit($contact->message, 40) }}</td>
                    <td class="px-4 py-2">{{ $contact->user->name ?? '-' }}</td>
                    <td class="px-4 py-2">{{ $contact->created_at->format('Y-m-d H:i') }}</td>
                    <td class="px-4 py-2 flex space-x-2">
                        <a href="{{ route('contacts.show', $contact->id) }}" class="text-blue-600 hover:underline">View</a>
                        <form action="{{ route('contacts.destroy', $contact->id) }}" method="POST" onsubmit="return confirm('Delete this request?')">
                            @csrf
                            @method('DELETE')
                            <button class="text-red-500 hover:underline" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="mt-4">
        {{ $contacts->links() }}
    </div>
    @else
    <div class="text-gray-500">No client requests found.</div>
    @endif
</div>
@endsection