import axios from 'axios';

const API_URL = 'http://localhost:8000/api/vols';

export const getFlights = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Flights data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};
