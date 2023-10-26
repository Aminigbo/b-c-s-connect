import { supabase } from "../../config/supabase";
import { InviteToSupport } from "../../events/models";
import { API_Base_URL } from "../../utilities";

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


export async function RequestContactDetails(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": {
            "name": payload.user.name,
            "phone": payload.user.phone
        },
        "RequestingFrom": {
            "name": payload.RequestingFrom.name,
            "phone": payload.RequestingFrom.phone
        },
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}user/requestContact`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1);
        return data
    } catch (error) {
        return error;
    }
}


export async function AcceptRequestContactDetails(payload) {
    console.log(payload)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": {
            "name": payload.user.name,
            "phone": payload.user.phone
        },
        "WhoRequested": {
            "name": payload.WhoRequested.name,
            "phone": payload.WhoRequested.phone
        },
        "notificationId": payload.notificationId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}user/acceptContactRequest`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1);
        return data
    } catch (error) {
        return error;
    }
}