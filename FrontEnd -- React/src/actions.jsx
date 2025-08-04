const setInfoTrip = (properties) =>({type:'set_infoTrip',payload:properties});
const setInfoContact = (properties) => ({ type: 'set_infoContact', payload: properties });

// const fetch_data_flights = (data) =>{
//     function getDurationOfFlight(startTime, endTime) {
//         const [startHours, startMinutes] = startTime.split(":").map(Number);
//         const [endHours, endMinutes] = endTime.split(":").map(Number);
    
//         let start = startHours * 60 + startMinutes; // Convert to total minutes
//         let end = endHours * 60 + endMinutes; // Convert to total minutes
    
//         // Handle cases where endTime is on the next day
//         if (end < start) {
//             end += 24 * 60;
//         }
    
//         let diff = end - start;
//         let hours = Math.floor(diff / 60);
//         let minutes = diff % 60;
    
//         return { hours, minutes };
//     }
//     const newData = data.map((item)=>{
//         return {...item,duration:getDurationOfFlight(item.heure_depart,item.heure_arrive)}
//     });
//     return{type:'fetch_data_flights',payload:newData}
// };

const fetch_data_flights = (data,type) => {
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
                departure_place: `${item.departure_airport.city}, (${item.departure_airport.code})`,
                heure_arrive: new Date(item.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                arrival_place: `${item.arrival_airport.city}, (${item.arrival_airport.code})`,
                duration: getDurationOfFlight(item.departure_time, item.arrival_time),
                price: parseFloat(item.price),
                stops: item.stops || 0,
                type: item.type || 'Economy'
            };
        });
    }
    else{
        newData = data;
    }

    return { type: 'fetch_data_flights', payload: newData };
};


const signupSuccess = (userData) => {
    return {
        type: 'SIGNUP_SUCCESS',
        payload: userData
    }
}

const signupFailed = (error) => {
    return {
        type: 'SIGNUP_FAILED',
        payload: error
    }
}

const addClient = (clientData) => {
    return {
        type: 'ADD_CLIENT',
        payload :clientData
    }
}

const addCard = (cardData) => {
    return {
        type: 'ADD_CARD',
        payload :cardData
    }
}

const addpaypal = (paypalData) => {
    return {
        type: 'ADD_PAYPAL',
        payload: paypalData
    }
}

export {
    setInfoTrip, setInfoContact, fetch_data_flights,
    signupSuccess, signupFailed, addClient, addCard, addpaypal
};