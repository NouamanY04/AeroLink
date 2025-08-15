<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - AeroLink</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
    body {
        font-family: 'Inter', sans-serif;
    }
    </style>
</head>

<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
        <!-- Logo and Title -->
        <div class="text-center mb-6">
            <div
                class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-3">
                <span class="material-icons text-white text-2xl">flight</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-1">AeroLink</h1>
            <p class="text-gray-600 text-sm">Admin Panel Access</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="mb-4">
                <h2 class="text-xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p class="text-gray-600 text-sm">Sign in to your admin account</p>
            </div>

            @if(session('error'))
            <div class="mb-3 p-2 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center text-xs">
                <span class="material-icons mr-2 text-red-500 text-sm">error</span>
                {{ session('error') }}
            </div>
            @endif

            @if($errors->any())
            <div class="mb-3 p-2 bg-red-100 border border-red-200 text-red-700 rounded-lg text-xs">
                <div class="flex items-center mb-1">
                    <span class="material-icons mr-2 text-red-500 text-sm">error</span>
                    <span class="font-medium">Please fix the following errors:</span>
                </div>
                <ul class="list-disc list-inside ml-4">
                    @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
            @endif

            <form method="POST" action="{{ route('admin.login') }}" class="space-y-4">
                @csrf

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <span class="material-icons text-base">email</span>
                        </span>
                        <input type="email" id="email" name="email" value="{{ old('email') }}"
                            class="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                            placeholder="admin@aerolink.com" required autofocus>
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <span class="material-icons text-base">lock</span>
                        </span>
                        <input type="password" id="password" name="password"
                            class="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                            placeholder="Enter your password" required>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input type="checkbox" id="remember" name="remember"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember" class="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] text-sm">
                    <span class="flex items-center justify-center">
                        <span class="material-icons mr-2 text-base">login</span>
                        Sign In
                    </span>
                </button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-xs text-gray-600">
                    Having trouble?
                    <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6">
            <p class="text-xs text-gray-500">
                © 2025 AeroLink. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>