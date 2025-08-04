<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AeroLink Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; font-size: 0.875rem; } /* text-sm */
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-40 bg-gradient-to-br from-blue-700 to-blue-900 text-white flex flex-col shadow-xl"> <!-- w-72 -> w-52 -->
            <div class="flex items-center h-14 px-4 border-b border-blue-600/30"> <!-- h-20 -> h-14, px-8 -> px-4 -->
                <span class="font-bold text-lg tracking-tight flex items-center"> <!-- text-2xl -> text-lg -->
                    <span class="material-icons mr-2" style="font-size: 20px;">flight</span> <!-- smaller icon -->
                    AeroLink
                </span>
            </div>
            <nav class="flex-1 px-2 py-4 space-y-1"> <!-- px-4 py-8 -> px-2 py-4 -->
                <a href="{{ route('admin.dashboard') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm"> <!-- px-6 py-3 -> px-3 py-2, text-sm -->
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">dashboard</span>
                    <span class="font-medium">Dashboard</span>
                </a>
                
                <div class="px-2 py-2">
                    <h3 class="text-xs font-semibold text-blue-300 uppercase tracking-wider">Management</h3>
                </div>

                <a href="{{ route('flights.index') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm">
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">flight</span>
                    <span class="font-medium">Flights</span>
                </a>

                <a href="{{ route('airlines.index') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm">
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">flight_takeoff</span>
                    <span class="font-medium">Airlines</span>
                </a>

                <a href="{{ route('airports.index') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm">
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">location_on</span>
                    <span class="font-medium">Airports</span>
                </a>

                <a href="{{ route('bookings.index') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm">
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">event_seat</span>
                    <span class="font-medium">Booking</span>
                </a>

                <div class="px-2 py-2">
                    <h3 class="text-xs font-semibold text-blue-300 uppercase tracking-wider">CRM (Customer Relationship Management)</h3>
                </div>

                <a href="{{ route('users.index') }}" 
                   class="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group text-sm">
                    <span class="material-icons mr-2 text-blue-300 group-hover:text-white" style="font-size: 18px;">group</span>
                    <span class="font-medium">Clients</span>
                </a>
            </nav>
            <div class="mt-auto px-4 py-3 text-xs text-blue-300/80 border-t border-blue-600/30"> <!-- px-8 py-6 -> px-4 py-3, text-sm -> text-xs -->
                © 2025 AeroLink Admin Panel
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Topbar -->
            <header class="h-14 bg-white flex items-center justify-between px-4 border-b shadow-sm"> <!-- h-20 -> h-14, px-8 -> px-4 -->
                <h1 class="text-lg font-semibold text-gray-800">@yield('page_title')</h1> <!-- text-xl -> text-lg -->
                <div class="flex items-center space-x-4"> <!-- space-x-6 -> space-x-4 -->
                    <button class="p-1 rounded-full hover:bg-gray-100 transition-colors"> <!-- p-2 -> p-1 -->
                        <span class="material-icons text-gray-600" style="font-size: 18px;">notifications</span>
                    </button>
                    <div class="flex items-center space-x-2"> <!-- space-x-4 -> space-x-2 -->
                        <span class="text-gray-700 text-sm">Welcome, <span class="font-medium text-blue-600">Admin</span></span>
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium shadow-lg"> <!-- w-10 h-10 -> w-8 h-8 -->
                            A
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 p-4 bg-gray-50"> <!-- p-8 -> p-4 -->
                @if(session('success'))
                    <div class="mb-4 p-2 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center text-sm"> <!-- mb-6 p-4 -> mb-4 p-2, text-sm -->
                        <span class="material-icons mr-2" style="font-size: 18px;">check_circle</span>
                        {{ session('success') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>