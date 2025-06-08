import axios from 'axios';

const API_URL = 'http://localhost:8000/api/clients';

export const createUser = async (userData) => {
    console.log('Creating user with data:', userData);
    try {
        const response = await axios.post(API_URL, {
            name: userData.username,
            email: userData.email,
            password: userData.password,
            phone: userData.phone || null,
            address: userData.address || null,
            passport_number: userData.passport_number || null
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};