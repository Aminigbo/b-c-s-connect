import {
    INITIALIZED,
    CATEGORIES,
    CART,
    ITEMS,
    SURPRISES,
    USER
} from '../state/types'


const initialState = {
    initialized: false,
    CartItems: [],
    Items: [],
    SurpriseState: []

}





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case USER:
            return {
                ...state,
                User: action.payload
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