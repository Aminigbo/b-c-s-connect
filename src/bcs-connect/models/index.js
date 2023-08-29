import { supabase } from "../../config/supabase";
import { InviteToSupport } from "../../events/models";

export function FetchAllUsers() {
    return supabase.from("abasites")
        .select("*")
    // .eq("isActive", true)
}

//  invite user to support campaign
export function NotificationController(payload) {
    console.log(payload)

    InviteToSupport(payload)
        .then(response => {
            if (response.success == true) {
                payload.Alert.alert("Success", `You have successfully invited ${payload.invitee.name} to support ${payload.event.title}`)
            } else {
                payload.Alert.alert("Error", response.message)
            }
            payload.setLoading(false)
        })
        .catch(error => {
            payload.setLoading(false)
            alert("An error occured")
            console.log(error)
            // payload.setAlert(true)
        })
}