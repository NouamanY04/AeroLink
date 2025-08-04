import axios from 'axios';

const API_URL = 'http://localhost:8000/api/register';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};