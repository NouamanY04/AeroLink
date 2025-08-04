import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bookings';

export const storeClientReservation = async (data) => {
    try {

        const response = await axios.post(API_URL, {
            client_email: data.client_email,
            flight_id: data.flight_id,
            seat_number: data.seat_number,
            booking_status: data.booking_status,
            booking_date: data.booking_date,
            payment_method: data.payment_method,
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

export const updateBookingWithPaymentId = async (bookingId, paymentId) => {
    try {
        const response = await axios.patch(`${API_URL}/${bookingId}`, {
            payment_id: paymentId
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};
