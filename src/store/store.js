import { legacy_createStore } from 'redux'
import RootReducers from './rootReducer'

const store = legacy_createStore(RootReducers)

export default store;