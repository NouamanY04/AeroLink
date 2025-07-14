const setInfoTrip = (properties) => ({
    type: 'set_infoTrip',
    payload: properties
});

const store_data_flights = (data, type) => {
    function getDurationOfFlight(departureTime, arrivalTime) {
        const departure = new Date(departureTime);
        const arrival = new Date(arrivalTime);

        const diffInMilliseconds = arrival - departure;
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return { hours, minutes };
    }

    let newData;
    if (type && type === 'api') {
        newData = data.map((item) => {
            return {
                id: item.id,
                airline: item.airline.name,
                logo: item.airline.image || "../error_image_logo.png",
                heure_depart: new Date(item.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date_depart: new Date(item.departure_time).toISOString().split('T')[0],
                heure_arrive: new Date(item.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date_Arrive: new Date(item.arrival_time).toISOString().split('T')[0],
                departure_place: `${item.departure_airport.city}, (${item.departure_airport.code})`,
                arrival_place: `${item.arrival_airport.city}, (${item.arrival_airport.code})`,
                departure_airport: {
                    code: item.departure_airport.code,
                    name: item.departure_airport.name,
                    city: item.departure_airport.city,
                    country: item.departure_airport.country
                },
                arrival_airport: {
                    code: item.arrival_airport.code,
                    name: item.arrival_airport.name,
                    city: item.arrival_airport.city,
                    country: item.arrival_airport.country
                },
                type_vol: item.type_vol || "Oneway flight",
                duration: getDurationOfFlight(item.departure_time, item.arrival_time),
                price: parseFloat(item.price),
                stops: item.stops || 0,
                type: item.type || 'Economy'
            };
        });
    } else {
        newData = data;
    }

    return { type: 'store_data_flights', payload: newData };
};

const addFlight = (flightData) => {
    return {
        type: 'addFlight',
        payload: flightData
    };
};

export {
    setInfoTrip,
    store_data_flights,
    addFlight
};