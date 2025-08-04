import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Paypalform = ({ onSubmit }) => {
    const [paypalInfo, setPaypalInfo] = useState({ email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            payment_method: 'paypal',
            paypal_email: paypalInfo.email
        });
    };

    return (
        <div className="max-w-md mx-auto px-4 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="PayPal Email"
                            value={paypalInfo.email}
                            onChange={(e) => setPaypalInfo({ ...paypalInfo, email: e.target.value })}
                            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded"
                            required
                        />
                        <Icon
                            icon="mdi:user"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-1.5 bg-blue-600 text-white text-xs font-medium rounded 
                    hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1
                    transition-colors duration-200"
                >
                    Log in to PayPal
                </button>
            </form>
        </div>
    );
}

export default Paypalform;
