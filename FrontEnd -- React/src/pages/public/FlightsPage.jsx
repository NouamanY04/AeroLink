import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar';

function FlightsDisplay() {
    const [nbrElementsToShow, setNbrElementsToShow] = useState({ airline: 4, stops: 3, type: 4 });
    // the const flights should contains data from API instead of redux
    const flights = useSelector((state) => state.flights.flights);
    const infoTrip = useSelector((state) => state.infoTrip.infoTrip);
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    // console.log(flights)
    // console.log(infoTrip)

    const { type: typeTrip, from, to, date_depart, date_Arrive } = infoTrip;
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(null);

    const [sortOption, setSortOption] = useState('price-asc');

    const filterFlightsBasedOnUserTrip = () => {
        if (!infoTrip || (!infoTrip.from && !infoTrip.to && !infoTrip.date_depart)) {
            return flights;
        }
        const filtered = flights.filter(flight => {
            return (
                (!infoTrip.from || flight.departure_place.toLowerCase().includes(infoTrip.from.toLowerCase())) &&
                (!infoTrip.to || flight.arrival_place.toLowerCase().includes(infoTrip.to.toLowerCase())) &&
                (!infoTrip.date_depart || flight.date_depart === infoTrip.date_depart)
            );
        });
        return filtered;
    }

    const flightsWanted = filterFlightsBasedOnUserTrip();
    //console.log(flightsWanted)

    function removeDuplicates(key) {
        return [...new Set(flightsWanted.map((item) => item[key]))];
    }

    // ⬇️ Enhanced to handle when there's only one value
    function getMinAndMaxValue(key) {
        const values = removeDuplicates(key).filter(v => typeof v === 'number' && !isNaN(v));

        if (values.length === 0) {
            return { min: 0, max: 0 };
        }

        if (values.length === 1) {
            return { min: 0, max: values[0] };
        }

        return {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    }

    const minPrice = getMinAndMaxValue('price').min;
    const maxPrice = getMinAndMaxValue('price').max;

    //console.log(minPrice, maxPrice);

    const [filters, setFilters] = useState({
        stops: [],
        airlines: [],
        types: [],
        minPrice: null,
        maxPrice: maxPrice,
        minDuration: null,
        maxDuration: null
    });

    function filterFlights() {
        return flightsWanted.filter(flight =>
            (filters.stops.length === 0 || filters.stops.includes(flight.stops)) &&
            (filters.airlines.length === 0 || filters.airlines.includes(flight.airline)) &&
            (filters.types.length === 0 || filters.types.includes(flight.type)) &&
            (filters.minPrice === null || (typeof flight.price === 'number' && flight.price >= filters.minPrice)) &&
            (filters.maxPrice === null || (typeof flight.price === 'number' && flight.price <= filters.maxPrice)) &&
            (filters.minDuration === null || (typeof flight.duration === 'number' && flight.duration >= filters.minDuration)) &&
            (filters.maxDuration === null || (typeof flight.duration === 'number' && flight.duration <= filters.maxDuration))
        );
    }

    const handleCheckboxChange = (category, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: category === 'stops' || category === 'airlines' || category === 'types' ?
                prevFilters[category].includes(value)
                    ? prevFilters[category].filter(v => v !== value)
                    : [...prevFilters[category], value]
                :
                value
        }));
    };

    const filteredFlights = filterFlights();

    ////console.log(filteredFlights);

    function getElements(array, count) {
        return array.slice(0, count);
    }

    function sortByPriceAsc(a, b) {
        return a.price - b.price;
    }
    function sortByPriceDesc(a, b) {
        return b.price - a.price;
    }
    function sortByDuration(a, b) {
        const aMinutes = a.duration.hours * 60 + a.duration.minutes;
        const bMinutes = b.duration.hours * 60 + b.duration.minutes;
        return aMinutes - bMinutes;
    }
    function sortByDepartureTime(a, b) {
        // Assumes heure_depart is "HH:mm"
        const [aH, aM] = a.heure_depart.split(':').map(Number);
        const [bH, bM] = b.heure_depart.split(':').map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
    }

    const sortedFlights = [...filteredFlights].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return sortByPriceAsc(a, b);
            case 'price-desc': return sortByPriceDesc(a, b);
            case 'duration': return sortByDuration(a, b);
            case 'departure': return sortByDepartureTime(a, b);
            default: return 0;
        }
    });

    const listStops = removeDuplicates('stops');
    const listAirlines = removeDuplicates('airline');
    const listFlightType = removeDuplicates('type');


    return (
        <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'>
            <Navbar />

            <main className='container mx-auto px-3 py-4 max-w-7xl'>
                {notification !== null ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="font-medium">{notification}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Compact Filter Section */}
                        <div className={`filter-container ${isFilterVisible ? 'w-full lg:w-64' : 'w-auto'} flex-shrink-0 transition-all duration-300 ease-in-out`}>
                            <div className="sticky top-4">
                                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                    {/* Filter Header with Toggle */}
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-white font-medium text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                                </svg>
                                                Filter Results
                                            </h3>
                                            <button
                                                onClick={() => setIsFilterVisible(!isFilterVisible)}
                                                className="text-white hover:text-blue-200 transition-colors duration-200 p-1 rounded-full hover:bg-blue-500/20"
                                                aria-label={isFilterVisible ? "Hide filters" : "Show filters"}
                                            >
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isFilterVisible ? 'rotate-180' : 'rotate-0'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Collapsible Filter Content */}
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="divide-y divide-gray-100">
                                            {/* Stops Filter */}
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
                                                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="3" />
                                                        <path d="M12 1v6m0 6v6" />
                                                    </svg>
                                                    Stops
                                                </h4>
                                                <div className="space-y-2">
                                                    {listStops.includes(0) && (
                                                        <label className="flex items-center group cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                                                onClick={() => handleCheckboxChange('stops', 0)}
                                                            />
                                                            <span className="ml-2 text-gray-700 text-sm group-hover:text-gray-900">Direct</span>
                                                        </label>
                                                    )}
                                                    {getElements(listStops, nbrElementsToShow.stops).map((item, index) => item !== 0 && (
                                                        <label key={index} className="flex items-center group cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                                                onClick={(event) => handleCheckboxChange('stops', item)}
                                                            />
                                                            <span className="ml-2 text-gray-700 text-sm group-hover:text-gray-900">
                                                                {`${item} ${item === 1 ? 'stop' : 'stops'}`}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {listStops.length > 3 && (
                                                    <button
                                                        onClick={() => setNbrElementsToShow({
                                                            ...nbrElementsToShow,
                                                            stops: nbrElementsToShow.stops === 3 ? listStops.length : 3
                                                        })}
                                                        className='text-blue-600 hover:text-blue-700 font-medium text-xs mt-2'
                                                    >
                                                        {nbrElementsToShow.stops === 3 ? '+ Show All' : '- Show Less'}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Price Filter */}
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
                                                    <svg className="w-3 h-3 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    Price Range
                                                </h4>

                                                <div className="bg-gray-50 rounded-lg p-3">

                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm  text-gray-800">
                                                            Min: ${minPrice}
                                                        </span>
                                                        <span className="text-sm  text-blue-700">
                                                            Max: ${filters.maxPrice}
                                                        </span>
                                                    </div>

                                                    {/* Range Slider */}
                                                    <input
                                                        type="range"
                                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                        min={minPrice}
                                                        max={maxPrice}
                                                        value={filters.maxPrice}
                                                        onChange={(e) => handleCheckboxChange('maxPrice', parseInt(e.target.value))}
                                                    />
                                                </div>
                                            </div>


                                            {/* Airlines Filter */}
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
                                                    <svg className="w-3 h-3 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                    Airlines
                                                </h4>
                                                <div className="space-y-2">
                                                    {getElements(listAirlines, nbrElementsToShow.airline).map((airline, index) => (
                                                        <label key={index} className="flex items-center group cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                                                onChange={() => handleCheckboxChange('airlines', airline)}
                                                            />
                                                            <span className="ml-2 text-gray-700 text-sm group-hover:text-gray-900 capitalize">{airline}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {listAirlines.length > 3 && (
                                                    <button
                                                        onClick={() => setNbrElementsToShow({
                                                            ...nbrElementsToShow,
                                                            airline: nbrElementsToShow.airline === 3 ? listAirlines.length : 3
                                                        })}
                                                        className="text-blue-600 hover:text-blue-700 font-medium text-xs mt-2"
                                                    >
                                                        {nbrElementsToShow.airline === 3 ? '+ Show All' : '- Show Less'}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Flight Type Filter */}
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
                                                    <svg className="w-3 h-3 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                                                    </svg>
                                                    Flight Type
                                                </h4>
                                                <div className="space-y-2">
                                                    {listFlightType.map((item, index) => (
                                                        <label key={index} className="flex items-center group cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                                                onChange={() => handleCheckboxChange('types', item)}
                                                            />
                                                            <span className="ml-2 text-gray-700 text-sm group-hover:text-gray-900 capitalize">{item}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Compact Results Section */}
                        <div className="flights-container flex-1 min-w-0">
                            {/* Results Header */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 mb-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                            {sortedFlights.length === 0 ? 'No flights found' : `${sortedFlights.length} flights found`}
                                        </h2>

                                        {/* Trip Info Display */}
                                        {infoTrip && (infoTrip.from || infoTrip.to || infoTrip.date_depart) ? (
                                            <div className="border border-blue-200 bg-blue-50/30 rounded-lg p-2 sm:p-3">
                                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-600">
                                                    {infoTrip.from && (
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                                                            From: {infoTrip.from}
                                                        </span>
                                                    )}
                                                    {infoTrip.to && (
                                                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                                                            To: {infoTrip.to}
                                                        </span>
                                                    )}
                                                    {infoTrip.date_depart && (
                                                        <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full font-medium">
                                                            Depart: {infoTrip.date_depart}
                                                        </span>
                                                    )}
                                                    {infoTrip.date_Arrive && (
                                                        <span className="bg-red-50 text-red-700 px-2 py-1 rounded-full font-medium">
                                                            Return: {infoTrip.date_Arrive}
                                                        </span>
                                                    )}
                                                    {typeTrip && typeTrip !== 'one-way' && (
                                                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium">
                                                            {typeTrip === 'round-trip' ? 'Round Trip' : typeTrip}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border border-gray-200 bg-gray-50/30 rounded-lg p-2 sm:p-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">Choose your departure place, destination, and travel dates to search for flights</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                                        <select
                                            className="appearance-none border border-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 cursor-pointer"
                                            value={sortOption}
                                            onChange={e => setSortOption(e.target.value)}
                                        >
                                            <option value="price-asc">Price (Low to High)</option>
                                            <option value="price-desc">Price (High to Low)</option>
                                            <option value="duration">Duration (Shortest)</option>
                                            <option value="departure">Departure Time (Earliest)</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {/* Compact Flight Cards */}
                            <div className="space-y-2 lg:space-y-3 max-h-[700px] overflow-y-auto pr-1">
                                {sortedFlights.map((flight, index) => (
                                    <div
                                        key={index}
                                        className="flight-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
                                    >
                                        <div className="p-3 lg:p-4">
                                            <div className="flex items-center gap-3 lg:gap-4">
                                                {/* Airline Info */}
                                                <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
                                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                                        <img
                                                            src={`http://localhost:8000/storage/${flight.logo}`}
                                                            alt={flight.airline}
                                                            className='w-6 h-6 lg:w-8 lg:h-8 object-contain'
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 text-xs lg:text-sm capitalize">{flight.airline}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {flight.stops === 0 ? 'Direct' : flight.stops === 1 ? '1 stop' : `${flight.stops} stops`}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Flight Route */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        {/* Departure */}
                                                        <div className="text-center">
                                                            <div className="text-sm lg:text-lg font-bold text-gray-900">{flight.heure_depart}</div>
                                                            <div className="text-xs text-gray-600 capitalize truncate max-w-16 lg:max-w-none">{flight.departure_airport.name}</div>
                                                        </div>

                                                        {/* Flight Path */}
                                                        <div className="flex-1 mx-2 lg:mx-4 relative">
                                                            <div className="flex items-center justify-center">
                                                                <div className="flex-1 border-t border-dashed border-gray-300"></div>
                                                                <div className="mx-1 lg:mx-2 text-center">
                                                                    <div className="bg-blue-100 text-blue-600 rounded-full p-0.5 lg:p-1 inline-block">
                                                                        <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 mt-0.5 lg:mt-1">
                                                                        {`${flight.duration.hours}h ${flight.duration.minutes}m`}
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 border-t border-dashed border-gray-300"></div>
                                                            </div>
                                                        </div>

                                                        {/* Arrival */}
                                                        <div className="text-center">
                                                            <div className="text-sm lg:text-lg font-bold text-gray-900">{flight.heure_arrive}</div>
                                                            <div className="text-xs text-gray-600 capitalize truncate max-w-16 lg:max-w-none">{flight.arrival_airport.name}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price and Booking */}
                                                <div className="flex flex-col items-end space-y-0.5 lg:space-y-2 flex-shrink-0">
                                                    <div className="text-right">
                                                        <div className="text-xs lg:text-xl font-bold text-green-600">${flight.price}</div>
                                                        <div className="text-xs text-gray-500 hidden lg:block">per person</div>
                                                    </div>
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-1.5 py-0.5 lg:px-4 lg:py-2 rounded lg:rounded-lg transition-colors text-xs lg:text-sm flex items-center"
                                                    >
                                                        <Link to={`/reservation/${flight.id}`} className="text-xs lg:text-sm">book</Link>
                                                        <svg className="w-2 h-2 lg:w-3 lg:h-3 ml-0.5 lg:ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default FlightsDisplay;