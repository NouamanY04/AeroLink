// import { setInfoTrip, setInfoContact, fetch_data_flights } from '../actions';

const initialState = {
    flights: [
        {
            id: 3,
            airline: "Air Asia",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img2.png",
            heure_depart: "12:45",
            departure_place: "Turkey",
            heure_arrive: "20:30",
            arrival_place: "Thailand",
            type_vol: 'Oneway flight',
            duration: { hours: 6, minutes: 30 },
            price: 890,
            stops: 2,
            type: 'Economy'
        },
        {
            id: 4,
            airline: "Lufthansa",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img4.png",
            heure_depart: "06:45",
            departure_place: "Frankfurt",
            heure_arrive: "09:30",
            arrival_place: "Madrid Barajas",
            type_vol: 'Oneway flight',
            duration: { hours: 5, minutes: 30 },
            price: 440,
            stops: 0,
            type: 'First class'
        },
        {
            id: 5,
            airline: "Turkish Airlines",
            logo: "https://transvelo.github.io/mytravel-html/assets/img/90x90/img3.png",
            heure_depart: "20:00",
            departure_place: "Istanbul",
            heure_arrive: "23:15",
            arrival_place: "Berlin Brandenburg",
            type_vol: 'Round-trip flight',
            duration: { hours: 7, minutes: 45 },
            price: 399,
            stops: 3,
            type: 'business'
        },
        {
            id: 6,
            airline: "RAM",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_Royal_Air_Maroc.svg",
            heure_depart: "02:00",
            departure_place: "Marrakech",
            heure_arrive: "12:15",
            arrival_place: "Paris",
            type_vol: 'Onewayflight',
            duration: { hours: 2, minutes: 15 },
            price: 599,
            stops: 0,
            type: 'Economy'
        },
        {
            id: 7,
            airline: "Fly Emirates",
            logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
            heure_depart: "10:00",
            departure_place: "Dubai",
            heure_arrive: "23:15",
            arrival_place: "Marnahtten",
            type_vol: 'Round-trip flight',
            duration: { hours: 12, minutes: 45 },
            price: 1299,
            stops: 6,
            type: 'business'
        },

    ],
    infoTrip: {
        type: 'oneWay',
        nbrAdults: 1,
        nbrChildren: 0,
        nbrInfants: 0,
        from: '',
        to: '',
        date_depart: '',
        date_Arrive: '',
    },
    infoContact: {
        fname: '',
        lname: '',
        email: '',
        message: '',
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {

        case 'fetch_data_flights':
            console.log(action.payload);
            return { ...state, flights: action.payload };
        case 'set_infoTrip':
            return { ...state, infoTrip: { ...state.infoTrip, ...action.payload } };
        case 'set_infoContact':
            return { ...state, infoContact: { ...state.infoContact, ...action.payload } };
        default:
            return state;
    }
}

export default reducer;