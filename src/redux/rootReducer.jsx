import { combineReducers } from "redux";
import authReducer from "./reducers/Authreducer";
import reducer from "./reducers/FlightReducer";
import bookingreducer from "./reducers/BookingReducer";
import paymentreducer from "./reducers/PaymentReducer";


const RootReducers = combineReducers({
    auth: authReducer,
    infoTrip: reducer,
    flights: reducer,
    booking: bookingreducer,
    payment: paymentreducer
});

export default RootReducers;