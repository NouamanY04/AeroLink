import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import Passengers from '../components/Passengers';
import { setInfoTrip } from '../actions';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Flights() {
    const [nbrElementsToShow, setNbrElementsToShow] = useState({ airline: 4, stops: 3, type: 4 });
    const flights = useSelector((state) => state.flights.flights);
    console.log(flights)
    const infoTrip = useSelector((state) => state.infoTrip.infoTrip);
    const { type: typeTrip, from, to, date_depart, date_Arrive } = infoTrip;
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(null);


    function validate() {
        if (from.trim() === '' || to.trim() === '' || date_depart.trim() === '' || date_Arrive.trim() === '') {
            setNotification('Please complete all required fields to see available flights. Providing full details helps us find the best options for you!');
            return;
        }
        if (flights.length === 0) {
            setNotification('No flights available right now. Please try different inputs or check back later.');
            return
        }
    }
    // const minPrice = getMinAndMaxValue('price').min;
    // const maxPrice = getMinAndMaxValue('price').max;
    // const [filters, setFilters] = useState({
    //     stops: [],
    //     airlines: [],
    //     types: [],
    //     minPrice: null,
    //     maxPrice: maxPrice,
    //     minDuration: null,
    //     maxDuration: null
    // });
    // function filterFlights() {
    //     return flights.filter(flight =>
    //         (filters.stops.length === 0 || filters.stops.includes(flight.stops)) &&
    //         (filters.airlines.length === 0 || filters.airlines.includes(flight.airline)) &&
    //         (filters.types.length === 0 || filters.types.includes(flight.type)) &&
    //         (filters.minPrice === null || flight.price >= filters.minPrice) &&
    //         (filters.maxPrice === null || flight.price <= filters.maxPrice) &&
    //         (filters.minDuration === null || flight.duration >= filters.minDuration) &&
    //         (filters.maxDuration === null || flight.duration <= filters.maxDuration)
    //     );
    // }
    // const handleCheckboxChange = (category, value) => {
    //     setFilters(prevFilters => ({
    //         ...prevFilters,
    //         [category]: category === 'stops' || category === 'airlines' || category === 'types' ?
    //             prevFilters[category].includes(value)
    //                 ? prevFilters[category].filter(v => v !== value)
    //                 : [...prevFilters[category], value]
    //             :
    //             value
    //     }));
    // };

    // const filteredFlights = filterFlights();
    // function removeDuplicates(key) {
    //     return [...new Set(flights.map((item) => item[key]))];
    // }

    // function getMinAndMaxValue(key) {
    //     return { max: Math.max(...removeDuplicates(key)), min: Math.min(...removeDuplicates(key)) };
    // }
    // function getElements(array, count) {
    //     return array.slice(0, count);

    // }
    // const listStops = removeDuplicates('stops');
    // const listAirlines = removeDuplicates('airline');
    // const listFlightType = removeDuplicates('type');
    function removeDuplicates(key) {
        return [...new Set(flights.map((item) => item[key]))];
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

    const [filters, setFilters] = useState({
        stops: [],
        airlines: [],
        types: [],
        minPrice: null,
        maxPrice: maxPrice,
        minDuration: null,
        maxDuration: null
    });

    // ✅ Safely filter even if values are missing or malformed
    function filterFlights() {
        return flights.filter(flight =>
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

    function getElements(array, count) {
        return array.slice(0, count);
    }

    const listStops = removeDuplicates('stops');
    const listAirlines = removeDuplicates('airline');
    const listFlightType = removeDuplicates('type');

    useEffect(() => {
        validate();
    }, []);

    return (
        <div className='bg-[#FCFDFF] text-sm'>
            <Navbar />
            <header className='px-4 sm:px-6 lg:px-8 py-4'>
                <form onSubmit={(event) => event.preventDefault()} className='space-y-4'>
                    <div className="container text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className='type-route flex flex-col sm:flex-row sm:items-center gap-3'>
                            <div className="title text-lg font-medium">Choose Route</div>
                            <div className='flex gap-6'>
                                <label className='flex items-center'>
                                    <input type="radio" name="route" id="one-way" value={'one-way'}
                                        className='mr-2 w-4 h-4'
                                        onChange={(e) => dispatch(setInfoTrip({ type: e.target.value }))} />
                                    <span>One-way</span>
                                </label>
                                <label className='flex items-center'>
                                    <input type="radio" name="route" id="Round-Trip" value={'round-trip'}
                                        checked={typeTrip === 'round-trip'}
                                        className='mr-2 w-4 h-4'
                                        onChange={(e) => dispatch(setInfoTrip({ type: e.target.value }))} />
                                    <span>Round Trip</span>
                                </label>
                            </div>
                        </div>
                        <div className="passengers flex justify-between items-center">
                            <div className="title text-lg font-medium">Passengers</div>
                            <Passengers />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        <div className={`info-flight-container w-full grid ${typeTrip === 'round-trip' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'} gap-2`}>
                            <div className='bg-white p-2 rounded-md shadow-sm relative'>
                                <label htmlFor="from" className='text-blue-800 text-sm font-medium'>
                                    From <FontAwesomeIcon icon={faPlaneDeparture} className="ml-1" />
                                </label>
                                <input type="text" name="form" id="from"
                                    placeholder='Country, city or airport'
                                    value={from}
                                    className='w-full h-8 outline-none text-sm placeholder:text-gray-400' />
                            </div>
                            <div className='to-destination-container bg-white p-2 rounded-md shadow-sm relative'>
                                <label htmlFor="to" className='text-blue-800 text-sm font-medium'>
                                    To <FontAwesomeIcon icon={faPlaneArrival} className="ml-1" />
                                </label>
                                <input type="text" name="to" id="to"
                                    placeholder='Country, city or airport'
                                    value={to}
                                    className='to w-full h-8 outline-none text-sm placeholder:text-gray-400' />
                            </div>
                            <div className='bg-white p-2 rounded-md shadow-sm'>
                                <label htmlFor="depart" className='text-blue-800 text-sm font-medium'>
                                    Date Depart <FontAwesomeIcon icon={faCalendar} className="ml-1" />
                                </label>
                                <input type="date" name="depart" id="depart" value={date_depart} onChange={(e) => dispatch(setInfoTrip({ date_depart: e.target.value }))} className='w-full outline-none text-[#4B5563] text-lg' />
                            </div>
                            {typeTrip === 'round-trip' &&
                                <div className='bg-white p-2 rounded-md shadow-sm'>
                                    <label htmlFor="return" className='text-blue-800 text-sm font-medium'>
                                        Date Return <FontAwesomeIcon icon={faCalendar} className="ml-1" />
                                    </label>
                                    <input type="date" name="return" id="return" value={date_Arrive} onChange={(e) => dispatch(setInfoTrip({ date_Arrive: e.target.value }))} className='w-full outline-none text-[#4B5563] text-lg' />
                                </div>}
                        </div>
                    </div>
                </form>
            </header>

            <main className='px-4 sm:px-6 lg:px-8 py-4'>
                {notification !== null ?
                    <div className="bg-red-100 text-red-800 text-center text-lg p-4 rounded-md mb-4">
                        <p className="text-sm">{notification}</p>
                    </div> :
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Filter Section */}
                        <div className="filter-container w-full lg:w-64">
                            <h3 className="text-sm font-medium mb-2">Filter by</h3>
                            <div className="bg-white rounded-lg shadow-sm border divide-y">
                                {/* Stops Filter */}
                                <div className="p-3">
                                    <h4 className="text-sm font-medium mb-2">Stops</h4>
                                    {listStops.includes(0) && <><input type="checkbox" name="direct" id="direct" onClick={() => handleCheckboxChange('stops', 0)} /> Direct <br /></>}
                                    {getElements(listStops, nbrElementsToShow.stops).map((item, index) => item !== 0 && <React.Fragment key={index}>
                                        <input type="checkbox" name={item.stops + '_stop'} id={item + '_stop'} onClick={(event) => handleCheckboxChange('stops', item)} />
                                        {`${item} ${item === 0 ? 'stops' : 'stop'}`} <br />
                                        {index === 2 && nbrElementsToShow.stops === 3 && listStops.length > 3 ? (
                                            <button
                                                onClick={() => setNbrElementsToShow({ ...nbrElementsToShow, stops: listStops.length })}
                                                className='text-teal-600'
                                            >See All</button>
                                        ) : (index === listStops.length - 1 && nbrElementsToShow.stops > 3) && (
                                            <button
                                                onClick={() => setNbrElementsToShow({ ...nbrElementsToShow, stops: 3 })}
                                                className='text-teal-600'
                                            >Hide</button>
                                        )}
                                    </React.Fragment>)}
                                </div>
                                {/* Price Filter */}
                                <div className="p-3">
                                    <h4 className="text-sm font-medium mb-2">Price</h4>
                                    <div className="text-xs text-gray-600">
                                        Between {minPrice}$ - {filters.maxPrice}$
                                    </div>
                                    <input type="range"
                                        className="w-full h-1.5 mt-2"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={filters.maxPrice}
                                        onChange={(e) => handleCheckboxChange('maxPrice', e.target.value)} />
                                </div>

                                {/* Airlines Filter */}
                                <div className="p-3">
                                    <h4 className="text-sm font-medium mb-2">Airlines</h4>
                                    {getElements(listAirlines, nbrElementsToShow.airline).map((airline, index) => (
                                        <React.Fragment key={index} >
                                            <input type="checkbox" name={airline} id={airline} onChange={() => handleCheckboxChange('airlines', airline)} /> {airline} <br />
                                            {(index === 3 && nbrElementsToShow.airline === 4 && listAirlines.length > 4) ? (
                                                <button
                                                    onClick={() => setNbrElementsToShow({ ...nbrElementsToShow, airline: listAirlines.length })}
                                                    className="text-teal-400"
                                                >
                                                    See all
                                                </button>
                                            ) : (index === listAirlines.length - 1 && nbrElementsToShow.airline >= 4 && listAirlines.length !== 4) ? (
                                                <button
                                                    onClick={() => setNbrElementsToShow({ ...nbrElementsToShow, airline: 4 })}
                                                    className="text-teal-400"
                                                >
                                                    Hide
                                                </button>
                                            ) : null}
                                        </React.Fragment>
                                    ))
                                    }

                                </div>
                                {/* Flight Type Section - Horizontal Layout */}
                                <div className="flight-type p-3 border-b">
                                    <div className="title text-sm font-medium mb-2">Flight Type</div>
                                    <div className="flex flex-wrap gap-4">
                                        {listFlightType.map((item, index) => (
                                            <label key={index} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name={item}
                                                    id={item}
                                                    onChange={() => handleCheckboxChange('types', item)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-gray-600">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="duration p-5 text-lg border-b">
                                    <div className="title font-medium text-sm">Duration</div>
                                    <input type="range" name="range-price" id="range-price" className='w-full' />
                                    <div className="range text-sm">2h30min - 6h20min</div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="flights-container flex-1 overflow-hidden">
                            <div className="text-sm font-medium mb-3">
                                {filteredFlights.length === 0 ? 'No results' : `${filteredFlights.length} results found`}
                            </div>
                            <div className="space-y-3 h-[585px] overflow-y-auto">
                                {filteredFlights.map((flight, index) => (
                                    <div key={index} className="flight px-4 py-4 flex justify-between items-center bg-white shadow-md rounded-xl">
                                        <div className="bard-flight  flex flex-col justify-center items-center">
                                            <img src={`/storage/${flight.logo}`} alt="" className='w-16 h-16' />
                                            <div className="name-plane text-center  capitalize font-medium">{flight.airline}</div>
                                        </div>
                                        <div className="flight-details flex justify-between items-center">
                                            <div className="departure-container font-medium text-center text-base">
                                                <div className="time">{flight.heure_depart}</div>
                                                <div className="place capitalize">{flight.departure_place}</div>
                                            </div>
                                            <div className='flex justify-between items-center mx-8'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#2569CE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.5 6.5l3-2.9a2.05 2.05 0 0 1 2.9 2.9l-2.9 3L20 17l-2.5 2.55L14 13l-3 3v3l-2 2l-1.5-4.5L3 15l2-2h3l3-3l-6.5-3.5L7 4z"></path></svg>
                                                <div className="line-duration-stops-container w-44 mx-2 text-center">
                                                    <div className="duration">{`${flight.duration.hours}h ${flight.duration.minutes}min`}</div>
                                                    <hr className='border-dashed' />
                                                    <div className="stops">{flight.stops === 0 ? 'Direct' : flight.stops === 1 ? `${flight.stops} stop` : `${flight.stops} stops`}</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="rotate-90" viewBox="0 0 24 24"><path fill="none" stroke="#2569CE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.5 6.5l3-2.9a2.05 2.05 0 0 1 2.9 2.9l-2.9 3L20 17l-2.5 2.55L14 13l-3 3v3l-2 2l-1.5-4.5L3 15l2-2h3l3-3l-6.5-3.5L7 4z"></path></svg>
                                            </div>
                                            <div className="arrive-container font-medium text-center text-base">
                                                <div className="time">{flight.heure_arrive}</div>
                                                <div className="place capitalize">{flight.arrival_place}</div>
                                            </div>
                                        </div>
                                        <div className="price-book-container">
                                            <div className="price text-center text-2xl text-[#51D4C0] font-bold">{flight.price} $</div>
                                            <button className='font-medium mt-2 outline-none border-2 text-teal-400 border-teal-300 px-3 py-1 rounded-lg hover:scale-105'>
                                                <Link to={`/reservation/${flight.id}`}>book now</Link>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}
            </main>
            <Footer />
        </div>
    );
}

export default Flights;