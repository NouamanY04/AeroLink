import { addClient } from "./actions"

const storedClients = JSON.parse(localStorage.getItem('clients')) || [];

const initialState = {
    clients: storedClients
}

const bookingreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CLIENT':
            console.log('adding client')
            const updatedclients = [...state.clients, action.payload];
            localStorage.setItem('clients', JSON.stringify(updatedclients));
            return {
                ...state,
                clients: updatedclients
            }
        default:
            return state;
    }
}

export default bookingreducer;