/**
 * Client Flights API Functions
 * Functions to interact with the client flights API endpoints
 */

/**
 * Get flights for a specific username
 * @param {string} username - The username to search for
 * @param {string} baseUrl - Base URL for the API (optional, defaults to current domain)
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
async function getFlightsByUsername(username, baseUrl = '') {
    try {
        // Validate input
        if (!username || typeof username !== 'string') {
            throw new Error('Username is required and must be a string');
        }

        // Construct the API URL
        const apiUrl = `${baseUrl}/api/clients/${encodeURIComponent(username)}/flights`;

        // Make the API request
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add any authentication headers if needed
                // 'Authorization': `Bearer ${token}`,
            },
        });

        // Parse the response
        const data = await response.json();

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching flights by username:', error);
        throw error;
    }
}

/**
 * Display flights in a table format
 * @param {Array} flights - Array of flight objects
 * @param {string} containerId - ID of the container element to display the table
 */
function displayFlightsTable(flights, containerId = 'flights-container') {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }

    if (!flights || flights.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No flights found for this user.</p>';
        return;
    }

    const tableHTML = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Booking ID</th>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Seat</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${flights.map(flight => `
                        <tr>
                            <td>${flight.booking_id}</td>
                            <td>${flight.flight.flight_number}</td>
                            <td>${flight.flight.airline?.name || 'N/A'}</td>
                            <td>${flight.flight.departure_airport?.name || 'N/A'}</td>
                            <td>${flight.flight.arrival_airport?.name || 'N/A'}</td>
                            <td>${formatDateTime(flight.flight.departure_time)}</td>
                            <td>${formatDateTime(flight.flight.arrival_time)}</td>
                            <td>${flight.seat_number || 'N/A'}</td>
                            <td>
                                <span class="badge bg-${getStatusBadgeColor(flight.booking_status)}">
                                    ${flight.booking_status}
                                </span>
                            </td>
                            <td>$${parseFloat(flight.price).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = tableHTML;
}

/**
 * Format date and time for display
 * @param {string} dateTimeString - ISO date string
 * @returns {string} - Formatted date and time
 */
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return 'N/A';

    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Get badge color based on booking status
 * @param {string} status - Booking status
 * @returns {string} - Bootstrap badge color class
 */
function getStatusBadgeColor(status) {
    const statusColors = {
        'confirmed': 'success',
        'pending': 'warning',
        'cancelled': 'danger',
        'completed': 'info',
        'active': 'primary'
    };

    return statusColors[status?.toLowerCase()] || 'secondary';
}

/**
 * Search and display flights for a username
 * @param {string} username - Username to search for
 * @param {string} containerId - ID of the container to display results
 * @param {string} baseUrl - Base URL for the API
 */
async function searchAndDisplayFlights(username, containerId = 'flights-container', baseUrl = '') {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }

    // Show loading state
    container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';

    try {
        const response = await getFlightsByUsername(username, baseUrl);

        if (response.success) {
            // Display client info
            const clientInfo = `
                <div class="alert alert-info mb-3">
                    <h5>Client Information</h5>
                    <p><strong>Name:</strong> ${response.data.client.name}</p>
                    <p><strong>Email:</strong> ${response.data.client.email}</p>
                    <p><strong>Total Bookings:</strong> ${response.data.total_bookings}</p>
                </div>
            `;

            container.innerHTML = clientInfo;

            // Display flights table
            displayFlightsTable(response.data.flights, containerId);
        } else {
            container.innerHTML = `<div class="alert alert-warning">${response.message}</div>`;
        }
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
}

/**
 * Create a search form for flights by username
 * @param {string} containerId - ID of the container to create the form in
 * @param {string} resultsContainerId - ID of the container to display results
 * @param {string} baseUrl - Base URL for the API
 */
function createFlightsSearchForm(containerId = 'search-form-container', resultsContainerId = 'flights-container', baseUrl = '') {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }

    const formHTML = `
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Search Flights by Username</h5>
            </div>
            <div class="card-body">
                <form id="flights-search-form">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="username-input">Username or Email:</label>
                                <input type="text" 
                                       class="form-control" 
                                       id="username-input" 
                                       name="username" 
                                       placeholder="Enter username or email"
                                       required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>&nbsp;</label>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-search"></i> Search Flights
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = formHTML;

    // Add event listener to the form
    document.getElementById('flights-search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username-input').value.trim();

        if (username) {
            searchAndDisplayFlights(username, resultsContainerId, baseUrl);
        }
    });
}

// Export functions for use in other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getFlightsByUsername,
        displayFlightsTable,
        searchAndDisplayFlights,
        createFlightsSearchForm
    };
} 