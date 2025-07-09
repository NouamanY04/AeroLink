import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoTrip, fetch_data_flights } from '../../redux/reducers/actions';
import { Link, useNavigate } from 'react-router-dom';


function SearchForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infoTrip = useSelector((state) => state.infoTrip.infoTrip);
    const { type: typeTrip = 'oneWay', from, to, date_depart, date_Arrive, nbrAdults, nbrChildren } = infoTrip;

    const [isLoading, setIsLoading] = useState(false);

    const [returnDateError, setReturnDateError] = useState('');

    const [destinationInput, setDestinationInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const airports = [
        { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
        { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
        { code: 'ORD', name: 'O"Hare International Airport', city: 'Chicago', country: 'USA' },
        { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'USA' },

        { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
        { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
        { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },

        { code: 'AMS', name: 'Amsterdam Schiphol Airport', city: 'Amsterdam', country: 'Netherlands' },
        { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
        { code: 'FRA', name: 'Frankfurt am Main Airport', city: 'Frankfurt', country: 'Germany' },
        { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain' },
        { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },

        { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
        { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },

        { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
        { code: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada' },
        { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
        { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
        { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },

        { code: 'GRU', name: 'São Paulo-Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
        { code: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires', country: 'Argentina' },
        { code: 'JNB', name: 'O. R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
        { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' }
    ];


    const handleTripTypeChange = (e) => {
        dispatch(setInfoTrip({ ...infoTrip, type: e.target.value }));
    };

    const handleAdultsIncrement = () => {
        dispatch(setInfoTrip({ ...infoTrip, nbrAdults: Math.max(1, Number(nbrAdults) + 1) }));
    };

    const handleAdultsDecrement = () => {
        dispatch(setInfoTrip({ ...infoTrip, nbrAdults: Math.max(1, Number(nbrAdults) - 1) }));
    };

    const handleChildrenIncrement = () => {
        dispatch(setInfoTrip({ ...infoTrip, nbrChildren: Math.max(0, Number(nbrChildren) + 1) }));
    };

    const handleChildrenDecrement = () => {
        dispatch(setInfoTrip({ ...infoTrip, nbrChildren: Math.max(0, Number(nbrChildren) - 1) }));
    };

    const handlePassangersAdultsChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        dispatch(setInfoTrip({ ...infoTrip, nbrAdults: value }));
    };

    const handlePassagersChildsChange = (e) => {
        const value = Math.max(0, Number(e.target.value));
        dispatch(setInfoTrip({ ...infoTrip, nbrChildren: value }));
    };

    function isFormValid() {
        if (!from || !to || !date_depart) return false;
        if (typeTrip === 'roundTrip' && !date_Arrive) return false;
        return true;
    }

    const handleSearch = async () => {
        if (!isFormValid()) {
            alert('Please fill in all required fields.');
            return;
        }
        setIsLoading(true);
        try {
            // Dispatch the latest infoTrip to Redux
            dispatch(setInfoTrip({
                ...infoTrip,
                to: destinationInput // ensure destinationInput is used
            }));
            navigate('/FlightsDisplay');
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        setDestinationInput(infoTrip.to || '');
    }, [infoTrip.to]);

    const handleDestinationInputChange = (e) => {
        const value = e.target.value;
        setDestinationInput(value);
        if (value.length > 0) {
            const searchTerm = value.toLowerCase();
            const filtered = airports.filter(destination =>
                destination.city.toLowerCase().includes(searchTerm) ||
                destination.country.toLowerCase().includes(searchTerm)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        dispatch(setInfoTrip({ ...infoTrip, to: value }));
    };

    const handleDateDepartChange = (e) => {
        dispatch(setInfoTrip({ ...infoTrip, date_depart: e.target.value }));
    };

    const handleDateArriveChange = (e) => {
        const value = e.target.value;
        dispatch(setInfoTrip({ ...infoTrip, date_Arrive: value }));

        if (date_depart && value && value < date_depart) {
            setReturnDateError('Return date cannot be before departure date.');
        } else {
            setReturnDateError('');
        }
    };

    const handleSuggestionClick = (destination) => {
        setDestinationInput(destination.city);
        setSuggestions([]);
        setShowSuggestions(false);
        dispatch(setInfoTrip({ ...infoTrip, to: destination.city }));
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl mx-auto mt-10" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
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
                            value={from || ""}
                            onChange={e => dispatch(setInfoTrip({ ...infoTrip, from: e.target.value }))}
                            autoComplete="off"
                            required
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
                            name="to"
                            autoComplete="off"
                            placeholder="Search by city or country"
                            className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                            value={destinationInput}
                            onChange={handleDestinationInputChange}
                            onFocus={() => destinationInput && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            required
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 left-0 right-0 bg-white text-black border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                                {suggestions.map((destination, index) => {
                                    const searchTerm = destinationInput.toLowerCase();

                                    const cityIndex = destination.city.toLowerCase().indexOf(searchTerm);
                                    const countryIndex = destination.country.toLowerCase().indexOf(searchTerm);

                                    let mainText = '';
                                    let matchStart = -1;
                                    let matchEnd = -1;

                                    if (cityIndex !== -1) {
                                        mainText = `${destination.city} , ${destination.country}`;
                                        matchStart = cityIndex;
                                        matchEnd = cityIndex + searchTerm.length;
                                    } else if (countryIndex !== -1) {
                                        mainText = `${destination.country}, ${destination.city} `;
                                        matchStart = 0;
                                        matchEnd = searchTerm.length;
                                    } else {
                                        mainText = `${destination.city} , ${destination.country}`;
                                        matchStart = 0;
                                        matchEnd = 0;
                                    }

                                    const beforeMatch = mainText.slice(0, matchStart);
                                    const match = mainText.slice(matchStart, matchEnd);
                                    const afterMatch = mainText.slice(matchEnd);

                                    return (
                                        <li
                                            key={index}
                                            className="py-3 px-4 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                                            onMouseDown={() => handleSuggestionClick(destination)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span>
                                                    <span className="font-semibold text-black">{beforeMatch}</span>
                                                    <span className="font-bold text-black">{match}</span>
                                                    <span className="text-gray-500 font-normal">{afterMatch}</span>
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
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
                            onChange={handleDateDepartChange}
                            required
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
                            className={`w-full p-4 border ${returnDateError ? 'border-red-500' : 'border-gray-300'} text-gray-700 rounded-lg focus:outline-none focus:ring-2 ${returnDateError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent pl-12`}
                            value={date_Arrive}
                            onChange={handleDateArriveChange}
                            disabled={typeTrip === 'oneWay'}
                            required={typeTrip === 'roundTrip'}
                            min={date_depart || undefined}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    {returnDateError && (
                        <p className="text-red-600 text-xs mt-1">{returnDateError}</p>
                    )}
                </div>
            </div>

            {/* Passengers and Search Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
                <div className="flex flex:col sm:flex-row sm:justify-between items-center gap-8 bg-gray-50 px-6 py-4 rounded-xl shadow-sm w-full md:w-auto md:gap-10 flex-wrap">                    {/* Adults */}
                    <div className="flex flex-col items-center w-full sm:w-auto">
                        <span className="text-gray-700 font-medium mb-1">Adults</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-blue-100 transition"
                                onClick={handleAdultsDecrement}
                                disabled={Number(nbrAdults) <= 1}
                            >-</button>
                            <input
                                id="adults"
                                type="text"
                                min={1}
                                value={nbrAdults}
                                onChange={handlePassangersAdultsChange}
                                className="w-12 h-8 text-center border border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-blue-100 transition"
                                onClick={handleAdultsIncrement}
                            >+</button>
                        </div>
                    </div>
                    {/* Children */}
                    <div className="flex flex-col items-center w-full sm:w-auto">
                        <span className="text-gray-700 font-medium mb-1">Children</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-blue-100 transition"
                                onClick={handleChildrenDecrement}
                                disabled={Number(nbrChildren) <= 0}
                            >-</button>
                            <input
                                id="children"
                                type="text"
                                min={0}
                                value={nbrChildren}
                                onChange={handlePassagersChildsChange}
                                className="w-12 h-8 text-center border border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-blue-100 transition"
                                onClick={handleChildrenIncrement}
                            >+</button>
                        </div>
                    </div>
                </div>


                <button
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 md:mt-0"
                    onClick={handleSearch}
                    disabled={isLoading || !isFormValid()}
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

