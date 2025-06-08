import { combineReducers } from "redux";
import authReducer from "./reducers/authreducer";
import reducer from "./reducers/reducer";
import bookingreducer from "./reducers/bookingreducer";
import paymentreducer from "./reducers/paymentreducer";


const RootReducers = combineReducers({
    auth: authReducer,
    infoTrip: reducer,
    flights: reducer,
    booking: bookingreducer,
    payment: paymentreducer
});

export default RootReducers;