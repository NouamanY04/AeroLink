import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contact';

export const AddContactRequest = async (data) => {
    try {
        const response = await axios.post(API_URL, {
            name: data.name,
            email: data.email,
            message: data.message,
        });
        return response.data;

    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
}