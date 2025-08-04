import axios from 'axios';

const API_URL = 'http://localhost:8000/api/payments';

export const storeClientPaymentInfo = async (data) => {
    try {
        const response = await axios.post(API_URL, {
            booking_id: data.BookingId,
            payment_method: data.payment_method,
            card_holder_name: data.card_holder_name || null,
            card_last4: data.card_number ? data.card_number.slice(-4) : null,
            expiry_date: data.expiry_date || null,
            ccv: data.ccv || null,
            paypal_email: data.paypal_email || null,
            payment_status: data.payment_status || null,
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};