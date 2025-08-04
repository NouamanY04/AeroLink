import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoTrip, store_data_flights } from '../../store/reducers/actions';
import { Link, useNavigate } from 'react-router-dom';
import { getFlights } from '../../services/flightsService';

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
            const params = {
                departure_city: infoTrip.from,
                arrival_city: infoTrip.to,
                departure_time: infoTrip.date_depart, // format: YYYY-MM-DD
                return_time: infoTrip.date_Arrive,       // format: YYYY-MM-DD (optional)
            };


            // Fetch flights based on infoTrip
            const flights = await getFlights(params); // Pass search params if needed

            // console.log('Fetched flights:', flights);

            // Save flights to Redux - the 'api' parameter tells the action to transform the data
            dispatch(store_data_flights(flights, 'api'));

            navigate('/FlightsDisplay');
        } catch (error) {
            console.error('Search failed:', error);
            // Optional: Show error message to user
            alert('Failed to search flights. Please try again.');
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
        <div className="bg-white rounded-2xl shadow-lg max-w-7xl mx-auto mt-6" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
            {/* Trip Type Selection */}
            <div className="flex justify-start space-x-8 p-6 pb-4">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio text-blue-600 w-4 h-4"
                        name="tripType"
                        value="oneWay"
                        checked={typeTrip === 'oneWay'}
                        onChange={handleTripTypeChange}
                    />
                    <span className="ml-2 text-gray-700 font-medium text-sm">One-way</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        className="form-radio text-blue-600 w-4 h-4"
                        name="tripType"
                        value="roundTrip"
                        checked={typeTrip === 'roundTrip'}
                        onChange={handleTripTypeChange}
                    />
                    <span className="ml-2 text-gray-700 font-medium text-sm">Round Trip</span>
                </label>
            </div>

            {/* Search Fields Container */}
            <div className="flex items-end bg-gray-50 rounded-xl mx-6 mb-6 overflow-hidden border border-gray-200">
                {/* From Field */}
                <div className="flex-1 bg-white border-r border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Departure city"
                            name="from"
                            className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                            value={from || ""}
                            onChange={e => dispatch(setInfoTrip({ ...infoTrip, from: e.target.value }))}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center px-2 bg-white border-r border-gray-200">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </button>
                </div>

                {/* To Field */}
                <div className="flex-1 bg-white border-r border-gray-200 p-4 hover:bg-gray-50 transition-colors relative">
                    <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="to"
                            autoComplete="off"
                            placeholder="Search by city or country"
                            className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                            value={destinationInput}
                            onChange={handleDestinationInputChange}
                            onFocus={() => destinationInput && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            required
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-20 left-0 right-0 top-full bg-white text-black border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-xl">
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

                {/* Departure Date */}
                <div className="flex-1 bg-white border-r border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Depart</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="date_depart"
                            className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none"
                            value={date_depart}
                            onChange={handleDateDepartChange}
                            required
                        />
                    </div>
                </div>

                {/* Return Date */}
                <div className={`flex-1 bg-white p-4 hover:bg-gray-50 transition-colors ${typeTrip === 'oneWay' ? 'opacity-50' : ''} ${typeTrip !== 'oneWay' ? 'border-r border-gray-200' : ''}`}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Return</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="date_Arrive"
                            className={`w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none ${returnDateError ? 'text-red-500' : ''}`}
                            value={date_Arrive}
                            onChange={handleDateArriveChange}
                            disabled={typeTrip === 'oneWay'}
                            required={typeTrip === 'roundTrip'}
                            min={date_depart || undefined}
                        />
                    </div>

                </div>

                {/* Search Button */}
                <div className="bg-blue-600 hover:bg-blue-700 transition-colors">
                    <button
                        className="h-full px-8 py-4 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                        onClick={handleSearch}
                        disabled={isLoading || !isFormValid()}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Searching...</span>
                            </div>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;

