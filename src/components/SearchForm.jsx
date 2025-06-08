import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoTrip, fetch_data_flights } from '../actions';

function SearchForm() {
    const dispatch = useDispatch();
    const infoTrip = useSelector((state) => state.infoTrip.infoTrip);
    const { type: typeTrip, from, to, date_depart, date_Arrive } = infoTrip;

    const [isLoading, setIsLoading] = useState(false);

    const handleTripTypeChange = (e) => {
        dispatch(setInfoTrip({ ...infoTrip, type: e.target.value }));
    };

    const handleInputChange = (e) => {
        dispatch(setInfoTrip({ ...infoTrip, [e.target.name]: e.target.value }));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            await dispatch(fetch_data_flights(infoTrip));
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl mx-auto mt-10">
            {/* Trip Type Selection */}
            <div className="flex justify-center space-x-8 mb-8">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio text-blue-600 w-5 h-5"
                        name="tripType"
                        value="oneWay"
                        checked={typeTrip === 'oneWay'}
                        onChange={handleTripTypeChange}
                    />
                    <span className="ml-3 text-gray-800 font-medium text-lg">One-way</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio text-blue-600 w-5 h-5"
                        name="tripType"
                        value="roundTrip"
                        checked={typeTrip === 'roundTrip'}
                        onChange={handleTripTypeChange}
                    />
                    <span className="ml-3 text-gray-800 font-medium text-lg">Round Trip</span>
                </label>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Departure city"
                            name="from"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 text-gray-700"
                            value={from}
                            onChange={handleInputChange}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Destination city"
                            name="to"
                            className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                            value={to}
                            onChange={handleInputChange}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="date_depart"
                            className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                            value={date_depart}
                            onChange={handleInputChange}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="date_Arrive"
                            className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                            value={date_Arrive}
                            onChange={handleInputChange}
                            disabled={typeTrip === 'oneWay'}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Passengers and Search Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">Passengers:</span>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <span className="text-gray-800">1 Adult, 0 Child, 0 Infant</span>
                    </div>
                </div>

                <button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Searching...</span>
                        </div>
                    ) : (
                        'Search Flights'
                    )}
                </button>
            </div>
        </div>
    );
}

export default SearchForm;

