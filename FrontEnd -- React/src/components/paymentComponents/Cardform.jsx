import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Cardform = ({ onSubmit, onError }) => {
    const [creditCardsInfo, setCreditCardsInfo] = useState({
        holder: '',
        number: '',
        expiryDate: '',
        CCV: ''
    });
    const [isAggree, setIsAgree] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            payment_method: 'credit_card',
            card_holder_name: creditCardsInfo.holder,
            card_number: creditCardsInfo.number,
            expiry_date: creditCardsInfo.expiryDate,
            ccv: creditCardsInfo.CCV
        });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Card Holder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={creditCardsInfo.holder}
                            onChange={(e) => setCreditCardsInfo({ ...creditCardsInfo, holder: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={creditCardsInfo.number}
                            onChange={(e) => setCreditCardsInfo({ ...creditCardsInfo, number: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="month"
                            value={creditCardsInfo.expiryDate}
                            onChange={(e) => setCreditCardsInfo({ ...creditCardsInfo, expiryDate: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            CCV <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={creditCardsInfo.CCV}
                            onChange={(e) => setCreditCardsInfo({ ...creditCardsInfo, CCV: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                            placeholder="123"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        onChange={() => setIsAgree(!isAggree)}
                        className="w-3 h-3 rounded accent-blue-600"
                        required
                    />
                    <p className="text-xs text-gray-600">
                        By continuing, you agree to the{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            Terms and Conditions
                        </span>
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={!isAggree}
                    className={`w-full px-4 py-2 text-xs font-medium rounded transition-colors duration-200
                        ${isAggree
                            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                            : 'bg-blue-300 text-white cursor-not-allowed'}`}
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Cardform;
