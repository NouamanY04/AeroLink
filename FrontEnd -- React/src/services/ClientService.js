import axios from 'axios';

const API_URL = 'http://localhost:8000/api/clients';

export const AddClient = async (data) => {
    try {
        const response = await axios.post(API_URL, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country,
            city: data.city,
            passport_number: data.passport_number
        });
        return response.data;

    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
}

export const getClientInfo = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
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

export const UpdateClient = async (username, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${username}`, {
            name: data.name,
            email: data.email,
            password: data.password, // optional
            phone: data.phone,
            country: data.country,
            city: data.city,
            passport_number: data.passport_number
        });
        return response.data;

    } catch (error) {
        console.error('Update API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

export const ChangePassword = async (username, passwordData) => {
    try {
        const response = await axios.post(`${API_URL}/change-password/${username}`, {
            current_password: passwordData.currentPassword,
            new_password: passwordData.newPassword,
            new_password_confirmation: passwordData.newPasswordConfirmation
        });
        return response.data;

    } catch (error) {
        console.error('Change Password API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

export const getUpcomingFlights = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/flights/${encodeURIComponent(username)}`);
        return response.data;
    } catch (error) {
        console.error('Search API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
}