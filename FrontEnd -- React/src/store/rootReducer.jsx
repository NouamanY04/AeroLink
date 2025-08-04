import { combineReducers } from "redux";
import reducer from "./reducers/FlightReducer";


const RootReducers = combineReducers({
    infoTrip: reducer,
    flights: reducer,
});

export default RootReducers;