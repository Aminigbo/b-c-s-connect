import {
  INITIALIZED,
  CATEGORIES,
  CART,
  ITEMS,
  SURPRISES,
  USER
} from "../state/types";


export const Items = (payload) => {
  return {
    type: ITEMS,
    payload
  }
}

export const user_state = (payload) => {
  return {
    type: USER,
    payload
  }
}

export const surprise_state = (payload) => {
  return {
    type: SURPRISES,
    payload
  }
}

export const categories = (payload) => {
  return {
    type: CATEGORIES,
    payload
  }
}

export const initAuth = () => {
  return {
    type: INITIALIZED,

  };
};

export const CartItems = (payload) => {
  return {
    type: CART,
    payload

  };
}; 