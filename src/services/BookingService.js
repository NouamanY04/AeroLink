import axios from 'axios';

const API_URL = 'http://localhost:8000/api/clients-reserved';

export const storeClientReservation = async (data) => {
    console.log(data)
    try {
        const storedName = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('userLoggedEmail');

        if (!storedName || !storedEmail) {
            throw new Error('User information not found');
        }

        const response = await axios.post(API_URL, {
            name: storedName,
            email: storedEmail,
            phone: data.phone,
            country: data.country,
            city: data.city,
            payment_method: data.payment_method,
            card_holder_name: data.card_holder_name,
            card_number: data.card_number,
            expiry_date: data.expiry_date,
            ccv: data.ccv,
            paypal_email: data.paypal_email,
            price: data.price,
            flight_id: data.flight_id,
            departure_place: data.departure_place,
            arrival_place: data.arrival_place
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};