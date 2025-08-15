@extends('admin')

@section('content')
<div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Airports</h2>
    <a href="{{ route('airports.create') }}"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Add New
    </a>
</div>

@php
$collection = $airports instanceof \Illuminate\Pagination\AbstractPaginator ? $airports->getCollection() :
collect($airports);
$grouped = $collection->groupBy('country')->sortKeys();
// ISO Alpha-2 mapping for FlagsAPI
$flagCode = function($country) {
$map = [
'United States'=>'US','USA'=>'US','United
Kingdom'=>'GB','UK'=>'GB','France'=>'FR','Germany'=>'DE','Spain'=>'ES','Italy'=>'IT','Portugal'=>'PT','Netherlands'=>'NL','Belgium'=>'BE','Switzerland'=>'CH','Austria'=>'AT','Ireland'=>'IE','Norway'=>'NO','Sweden'=>'SE','Denmark'=>'DK','Finland'=>'FI','Poland'=>'PL','Czech
Republic'=>'CZ','Greece'=>'GR','Turkey'=>'TR','Russia'=>'RU','Ukraine'=>'UA','Morocco'=>'MA','Algeria'=>'DZ','Tunisia'=>'TN','Egypt'=>'EG','South
Africa'=>'ZA','Nigeria'=>'NG','Kenya'=>'KE','United Arab Emirates'=>'AE','Saudi
Arabia'=>'SA','Qatar'=>'QA','India'=>'IN','China'=>'CN','Japan'=>'JP','South Korea'=>'KR','Australia'=>'AU','New
Zealand'=>'NZ','Brazil'=>'BR','Argentina'=>'AR','Mexico'=>'MX','Canada'=>'CA'
];
return $map[$country] ?? null;
};
@endphp

@if(($grouped ?? collect())->isEmpty())
<div class="p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-100 text-center text-gray-500">No airports found.</div>
@else
<div class="space-y-8">
    @foreach($grouped as $country => $items)
    <section>
        <div class="flex items-center mb-3">
            @php $cc = $flagCode($country); @endphp
            @if($cc)
            <img src="https://flagsapi.com/{{ $cc }}/flat/24.png" alt="{{ $country }} flag"
                class="w-6 h-4 rounded-sm ring-1 ring-gray-200 mr-2">
            @else
            <div
                class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mr-2 flex items-center justify-center text-[10px] font-semibold text-blue-700">
                {{ strtoupper(Str::of($country)->substr(0,2)) }}</div>
            @endif
            <h3 class="text-md font-semibold text-gray-900">{{ $country }}</h3>
            <span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{{ $items->count() }}</span>
        </div>

        <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
            <ul class="divide-y divide-gray-100">
                @foreach($items->sortBy('city')->sortBy('name') as $airport)
                <li class="p-3 sm:p-4 hover:bg-gray-50 transition">
                    <div class="flex items-center justify-between">
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2">
                                <span
                                    class="inline-flex items-center justify-center text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 ring-1 ring-blue-100">{{ $airport->code }}</span>
                                <span class="text-sm font-medium text-gray-900 truncate">{{ $airport->name }}</span>
                            </div>
                            <div class="mt-0.5 text-[11px] text-gray-500 truncate">{{ $airport->city }}</div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <a href="{{ route('airports.edit', $airport) }}"
                                class="text-xs text-blue-700 hover:text-blue-900 font-medium">Edit</a>
                            <form action="{{ route('airports.destroy', $airport) }}" method="POST"
                                onsubmit="return confirm('Delete this airport?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                    class="text-xs text-red-600 hover:text-red-700 font-medium">Delete</button>
                            </form>
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
    </section>
    @endforeach
</div>
@endif

<!-- Pagination -->
@if($airports instanceof \Illuminate\Pagination\LengthAwarePaginator && $airports->hasPages())
<div class="mt-8 flex justify-center">
    <nav class="flex items-center space-x-2" aria-label="Pagination">
        @if ($airports->onFirstPage())
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Previous</span>
        @else
        <a href="{{ $airports->previousPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Previous</a>
        @endif

        <div class="flex items-center space-x-1">
            @foreach ($airports->getUrlRange(1, $airports->lastPage()) as $page => $url)
            @if ($page == $airports->currentPage())
            <span class="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-md">{{ $page }}</span>
            @else
            <a href="{{ $url }}"
                class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">{{ $page }}</a>
            @endif
            @endforeach
        </div>

        @if ($airports->hasMorePages())
        <a href="{{ $airports->nextPageUrl() }}"
            class="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Next</a>
        @else
        <span
            class="px-3 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">Next</span>
        @endif
    </nav>
</div>
@endif

<!-- Page Info -->
@if($airports instanceof \Illuminate\Pagination\LengthAwarePaginator)
<div class="mt-3 text-center text-sm text-gray-600">
    Showing {{ $airports->firstItem() ?? 0 }} to {{ $airports->lastItem() ?? 0 }} of {{ $airports->total() }} airports
</div>
@endif
@endsection