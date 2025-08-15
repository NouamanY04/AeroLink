@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Airlines</h2>
    <a href="{{ route('airlines.create') }}"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Add New
    </a>
</div>

<!-- Cards Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
    @forelse($airlines as $airline)
    <div
        class="group bg-white rounded-xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:-translate-y-0.5 transition duration-200">
        <div class="relative">
            <div class="h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-xl overflow-hidden">
                @if($airline->image)
                <img src="{{ asset('storage/' . $airline->image) }}" alt="{{ $airline->name }} logo"
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300">
                @else
                <div class="w-full h-full flex items-center justify-center text-blue-400">
                    <span class="material-icons" style="font-size: 32px;">flight_takeoff</span>
                </div>
                @endif
            </div>
            <div
                class="absolute top-3 left-3 px-2 py-0.5 text-[10px] tracking-wide rounded-full bg-white/80 text-gray-600 shadow-sm">
                #{{ $airline->id }}
            </div>
        </div>
        <div class="p-3">
            <h3 class="text-sm font-semibold text-gray-900 truncate">{{ $airline->name }}</h3>
            <div class="mt-1 text-xs text-gray-500">
                <span class="font-medium text-gray-700">{{ $airline->code }}</span>
                <span class="mx-1">•</span>
                <span>{{ $airline->country }}</span>
            </div>

            <div class="mt-3 flex items-center justify-between">
                <a href="{{ route('airlines.edit', $airline) }}"
                    class="inline-flex items-center text-xs font-medium text-blue-700 hover:text-blue-900">
                    <span class="material-icons mr-1" style="font-size: 14px;">edit</span>
                    Edit
                </a>
                <form action="{{ route('airlines.destroy', $airline) }}" method="POST"
                    onsubmit="return confirm('Are you sure you want to delete this airline?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit"
                        class="inline-flex items-center text-xs font-medium text-red-600 hover:text-red-700">
                        <span class="material-icons mr-1" style="font-size: 14px;">delete</span>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    </div>
    @empty
    <div class="col-span-full">
        <div class="p-10 bg-white rounded-2xl shadow-sm text-center text-gray-500">No airlines found.</div>
    </div>
    @endforelse
</div>

@if($airlines instanceof \Illuminate\Pagination\LengthAwarePaginator && $airlines->hasPages())
<div class="mt-8 flex items-center justify-center">
    <nav class="flex items-center space-x-2" aria-label="Pagination">
        @if ($airlines->onFirstPage())
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Previous</span>
        @else
        <a href="{{ $airlines->previousPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Previous</a>
        @endif

        <div class="flex items-center space-x-1">
            @foreach ($airlines->getUrlRange(1, $airlines->lastPage()) as $page => $url)
            @if ($page == $airlines->currentPage())
            <span class="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-md">{{ $page }}</span>
            @else
            <a href="{{ $url }}"
                class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">{{ $page }}</a>
            @endif
            @endforeach
        </div>

        @if ($airlines->hasMorePages())
        <a href="{{ $airlines->nextPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Next</a>
        @else
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Next</span>
        @endif
    </nav>
</div>
<div class="mt-3 text-center text-sm text-gray-600">Showing {{ $airlines->firstItem() ?? 0 }} to
    {{ $airlines->lastItem() ?? 0 }} of {{ $airlines->total() }} airlines</div>
@endif
@endsection