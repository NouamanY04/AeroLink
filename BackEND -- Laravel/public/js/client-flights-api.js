// API URL - Update this to match your Laravel application URL
const API_URL = 'http://localhost:8000/api';

/**
 * Get flights for a specific username
 * @param {string} username - The username to search for
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const getClientFlights = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/clients/${encodeURIComponent(username)}/flights`);
        return response.data;
    } catch (error) {
        console.error('Get Client Flights API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Get upcoming flights for a specific username (alias for getClientFlights)
 * @param {string} username - The username to search for
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const getUpcomingFlights = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/clients/flights/${encodeURIComponent(username)}`);
        return response.data;
    } catch (error) {
        console.error('Get Upcoming Flights API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Search for clients by username
 * @param {string} username - The username to search for
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const getClientInfo = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/clients/search`, {
            params: {
                username: username
            }
        });
        return response.data;
    } catch (error) {
        console.error('Search API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Update client information
 * @param {string} username - The username to update
 * @param {Object} clientData - The client data to update
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const updateClientInfo = async (username, clientData) => {
    try {
        const response = await axios.put(`${API_URL}/clients/update/${encodeURIComponent(username)}`, clientData);
        return response.data;
    } catch (error) {
        console.error('Update Client API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Change client password
 * @param {string} username - The username to change password for
 * @param {Object} passwordData - The password data
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const changeClientPassword = async (username, passwordData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/change-password/${encodeURIComponent(username)}`, passwordData);
        return response.data;
    } catch (error) {
        console.error('Change Password API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Create a new client
 * @param {Object} clientData - The client data to create
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const createClient = async (clientData) => {
    try {
        const response = await axios.post(`${API_URL}/clients`, clientData);
        return response.data;
    } catch (error) {
        console.error('Create Client API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Get all clients
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const getAllClients = async () => {
    try {
        const response = await axios.get(`${API_URL}/clients`);
        return response.data;
    } catch (error) {
        console.error('Get All Clients API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Get client by ID
 * @param {number} id - The client ID
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const getClientById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get Client by ID API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

/**
 * Delete client by ID
 * @param {number} id - The client ID to delete
 * @returns {Promise<Object>} - Promise that resolves to the API response
 */
export const deleteClient = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Delete Client API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
}; 