import { FetchAllUsers } from "../models";

export function SameStateUsers(state) {
    return FetchAllUsers()
        .then(data => {
            if (data.data.length < 0) {
                return {
                    status: false,
                    msg: "EMPTY",
                    data: null
                }
            } else {
                let stateSpecific = data.data.filter(e => e.state == state.state)
                return {
                    status: true,
                    msg: "SUCCESS",
                    data: stateSpecific
                }
            }
        })
}