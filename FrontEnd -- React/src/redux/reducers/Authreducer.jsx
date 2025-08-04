import { signupSuccess, signupFailed } from './actions';

const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

const initialState = {
    users: storedUsers,
    isAuthenticated: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    // console.log('Action Despatched',action);
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            //verify the execution of the reducer
            console.log('Adding user ', action.payload)

            const updatedUsers = [...state.users, action.payload];
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            return {
                ...state,
                users: updatedUsers,
                isAuthenticated: true,
                error: null
            }

        case 'SIGNUP_FAILED':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;