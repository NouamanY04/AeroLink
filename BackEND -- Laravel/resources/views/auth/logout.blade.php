<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logging Out - AeroLink</title>
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
    <div class="w-full max-w-md text-center">
        <div class="bg-white rounded-2xl shadow-xl p-8">
            <div
                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4">
                <span class="material-icons text-white text-3xl">logout</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Logging Out</h1>
            <p class="text-gray-600 mb-6">You have been successfully logged out of the admin panel.</p>

            <a href="{{ route('admin.login') }}"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                <span class="material-icons mr-2">login</span>
                Sign In Again
            </a>
        </div>

        <div class="text-center mt-8">
            <p class="text-sm text-gray-500">
                © 2025 AeroLink. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>