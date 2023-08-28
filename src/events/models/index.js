import { supabase } from "../../config/supabase";
import { API_Base_URL } from "../../utilities";

export async function FetchAllDonations() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}events/all`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1);
        return data;
    } catch (error) {
        return error;
    }
}

export function FetchAllDonationsByID(id) {
    return supabase.from("donations")
        .select("*")
        .eq("id", id)
}

export async function MakeDonationModel(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": {
            "name": payload.user.name,
            "email": payload.user.email,
            "phone": payload.user.phone,
        },
        "payref": payload.payref,
        "amount": payload.amount,
        "annonymous": payload.annonymous,
        "event": payload.eventID
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}events/donate`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1); 
        return data
    } catch (error) {
        return console.log('error', error);
    }
}



export async function CreateEventModel(payload) {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": payload.title,
        "amount": payload.amount,
        "deadline": payload.deadline,
        "poster": payload.poster,
        "poster_id": payload.poster_id,
        "posterPhone": payload.posterPhone,
        "description": payload.description,
        "Img": {
            "height": payload.Img.height,
            "uri": payload.Img.uri,
            "width": payload.Img.width
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_Base_URL}events/create`, requestOptions);
        const result_1 = await response.text();
        let data = JSON.parse(result_1);
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}