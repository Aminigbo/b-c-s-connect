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
    CONNECT_USER,
    LOCATION,
    NOTIFICATION,
    SCANEUSER,
    AUTHENTICATIONFELLOWSHIP,
    MEETINGS,
    BETHELS,
    DELTAS,
    ENROUTE
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
    User_State: null,
    myLocation: null,
    Notifications: [],

    ScannedUser: {},
    AuthFellowship: {},
    Meetings: [],

    Bethels: [],

    Deltas: {
        latitudeDelta: 0.12,
        longitudeDelta: 0.12,
    },

    Enroute: {
        status: null,
        location: {},
        destination: {},
        bethel: {}
    }
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
        case BETHELS:
            return {
                ...state,
                Bethels: action.payload
            }
        case DELTAS:
            return {
                ...state,
                Deltas: action.payload
            }
        case ENROUTE:
            return {
                ...state,
                Enroute: action.payload
            }
        case CONNECT_USER:
            return {
                ...state,
                ViewUser: action.payload
            }
        case SCANEUSER:
            return {
                ...state,
                ScannedUser: action.payload
            }

        case AUTHENTICATIONFELLOWSHIP:
            return {
                ...state,
                AuthFellowship: action.payload
            }

        case MEETINGS:
            return {
                ...state,
                Meetings: action.payload
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
                Events: action.payload
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
        case LOCATION:
            return {
                ...state,
                myLocation: action.payload
            }
        case NOTIFICATION:
            return {
                ...state,
                Notifications: action.payload
            }
        default: return state
    }
}

export default reducer