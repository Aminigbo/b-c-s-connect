import {
    INITIALIZED,
    CATEGORIES,
    CART,
    ITEMS,
    SURPRISES,
    USER,
    LOGOUT,
    FETCH_USER_TIME,
    BRETHREN,
    JOBS,
    EVENTS,
    FELLOWSHIPTOPAY,
    STATE,
    CONNECT_USER
} from '../state/types'


const initialState = {
    initialized: false,
    CartItems: [],
    Items: [],
    Brethren: [],
    User: null,
    ViewUser: null,
    FetchUserTime: {
        jobFetch: "0",
        usersFetch: "0"
    },
    Jobs: [],
    Events: [],
    FellowshipToPay: null,
    User_State: null
}





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case LOGOUT:
            return {
                ...state,
                User: null,
                FellowshipToPay: null,
                User_State: null
            }

        case CONNECT_USER:
            return {
                ...state,
                ViewUser: action.payload
            }

        case STATE:
            return {
                ...state,
                User_State: action.payload
            }


        case BRETHREN:
            return {
                ...state,
                Brethren: action.payload
            }

        case FELLOWSHIPTOPAY:
            return {
                ...state,
                FellowshipToPay: action.payload
            }

        case JOBS:
            return {
                ...state,
                Jobs: action.payload
            }

        case EVENTS:
            return {
                ...state,
                Event: action.payload
            }

        case USER:
            return {
                ...state,
                User: action.payload
            }

        case FETCH_USER_TIME:

            return {
                ...state,
                FetchUserTime: action.payload
            }


        case CATEGORIES:
            return {
                ...state,
                category: action.payload
            }
        case CART:
            return {
                ...state,
                CartItems: action.payload
            }

        case ITEMS:
            return {
                ...state,
                Items: action.payload
            }

        case SURPRISES:
            return {
                ...state,
                SurpriseState: action.payload
            }


        default: return state
    }
}

export default reducer