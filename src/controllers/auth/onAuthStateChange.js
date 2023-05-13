import { connect } from "react-redux"
const { supabase } = require("../../config/supabase")
import { surprise_state } from "../../redux";

function onAuthStateChange() {
    // const AuthState = [auth, setAuth] = useState()
    supabase.auth.getSession().then(({ data: { session } }) => {
        // setSession(session)
    })


    supabase.auth.onAuthStateChange((_event, session) => {
        setAuth(session)
        if (auth == null) {
            console.log("Logged out")
            surprise_state([])
        } else {
            console.log("Logged In")
            // console.log(auth.user)
        }
    })
    // console.log(auth)
}


export default onAuthStateChange


