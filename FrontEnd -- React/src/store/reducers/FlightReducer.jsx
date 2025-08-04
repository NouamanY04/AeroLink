// Updated reducer - simplified for API data
const initialState = {
    flights: [], // Start with empty array - will be populated from API
    infoTrip: {
        type: 'oneWay',
        from: '',
        to: '',
        date_depart: '',
        date_Arrive: '',
    },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'store_data_flights':
            return {
                ...state,
                flights: action.payload
            };

        case 'addFlight':
            return {
                ...state,
                flights: [...state.flights, action.payload]
            };

        case 'set_infoTrip':
            return {
                ...state,
                infoTrip: { ...state.infoTrip, ...action.payload }
            };

        default:
            return state;
    }
}

export default reducer;