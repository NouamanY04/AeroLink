import { addCard, addpaypal } from "../actions";

const storedCreditCards = JSON.parse(localStorage.getItem('credit_cards')) || [];
const storedPaypalAccounts = JSON.parse(localStorage.getItem('paypal_account')) || [];


const initialState = {
    paypalAccounts: storedPaypalAccounts,
    creditCards: storedCreditCards
}

const paymentreducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CARD":
            const updatedCards = [...state.creditCards, action.payload]
            localStorage.setItem("credit_cards", JSON.stringify(updatedCards))

            return {
                ...state,
                creditCards: updatedCards
            }
        case "ADD_PAYPAL":
            const updatedAccounts = [...state.paypalAccounts, action.payload]
            localStorage.setItem("paypal_accounts", JSON.stringify(updatedAccounts))

            return {
                ...state,
                paypalAccounts: updatedAccounts
            }
        default:
            return state;
    }
}

export default paymentreducer;