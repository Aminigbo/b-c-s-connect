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
} from "../state/types";


export const Scan_User = (payload) => {
  return {
    type: SCANEUSER,
    payload
  }
}
export const EnrouteDispath = (payload) => {
  return {
    type: ENROUTE,
    payload
  }
}
export const DeltaDispatch = (payload) => {
  return {
    type: DELTAS,
    payload
  }
}
export const AllBethels = (payload) => {
  return {
    type: BETHELS,
    payload
  }
}

export const DispMeeting = (payload) => {
  return {
    type: MEETINGS,
    payload
  }
}

export const Authenticating_fellowship = (payload) => {
  return {
    type: AUTHENTICATIONFELLOWSHIP,
    payload
  }
}

export const Items = (payload) => {
  return {
    type: ITEMS,
    payload
  }
}

export const Connect_user = (payload) => {
  return {
    type: CONNECT_USER,
    payload
  }
}
export const Fell_to_pay = (payload) => {
  return {
    type: FELLOWSHIPTOPAY,
    payload
  }
}

export const All_Events = (payload) => {
  return {
    type: EVENTS,
    payload
  }
}


export const SelectedState = (payload) => {
  return {
    type: STATE,
    payload
  }
}


export const FetchUserTime = (payload) => {
  return {
    type: FETCH_USER_TIME,
    payload
  }
}

export const Brethren = (payload) => {
  return {
    type: BRETHREN,
    payload
  }
}

export const FetchJobs = (payload) => {
  return {
    type: JOBS,
    payload
  }
}

export const user_state = (payload) => {
  return {
    type: USER,
    payload
  }
}

export const logoutUser = (payload) => {
  return {
    type: LOGOUT,
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

// user current location
export const MyLocation = (payload) => {
  return {
    type: LOCATION,
    payload
  }
}

export const myNotification = (payload) => {
  return {
    type: NOTIFICATION,
    payload
  }
}