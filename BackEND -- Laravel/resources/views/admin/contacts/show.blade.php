@extends('admin')

@section('page_title', 'Client Request Details')

@section('content')
<div class="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">Client Request Details</h2>
    <div class="mb-2">
        <span class="font-medium text-gray-700">Name:</span> {{ $contact->name }}
    </div>
    <div class="mb-2">
        <span class="font-medium text-gray-700">Email:</span> {{ $contact->email }}
    </div>
    <div class="mb-2">
        <span class="font-medium text-gray-700">User:</span> {{ $contact->user->name ?? '-' }}
    </div>
    <div class="mb-2">
        <span class="font-medium text-gray-700">Date:</span> {{ $contact->created_at->format('Y-m-d H:i') }}
    </div>
    <div class="mb-4">
        <span class="font-medium text-gray-700">Message:</span>
        <div class="bg-gray-50 border rounded p-3 mt-1 text-gray-800">{{ $contact->message }}</div>
    </div>
    <a href="{{ route('contacts.index') }}" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back</a>
</div>
@endsection