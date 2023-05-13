import { supabase } from "../../config/supabase";
import { User, isAuth } from "../auth/authController";

function RecordToDatabase(payload) {
    return supabase
        .from("gifts")
        .insert([{
            status: "Pending",
            sender: payload.sender.email,
            data: payload.data
        }])
        .then(response => {
            if (response.error != null) {
                console.log(response);
                return {
                    success: false,
                    message: "An error occured"
                }
            } else {
                console.log(response);
                return {
                    success: true,
                    message: "Order placed successfully",
                    data: response
                }
            }
        })
        .catch(error => {
            console.log(response);
            return {
                success: false,
                message: "An error occured"
            }
        })
}

export function createGift(payload) {
    return isAuth().then(res => {
        // return res
        if (res != null) {
            const newPayload = {
                sender: payload.sender,
                data: {
                    sender: payload.sender,
                    receiver: payload.receiver,
                    items: payload.items,
                }

            }
            return RecordToDatabase(newPayload)
        } else {
            return {
                success: false,
                message: "Login to continue"
            }
        }
    })
}

export function FetchGifts(sender, disp_surprise) {
    supabase
        .from("gifts")
        .select("*")
        .eq("sender", sender)
        .order('id', { ascending: false })
        .then(res => {
            if (res.data == null) {
                disp_surprise([])
            } else { 
                // console.log("============================")
                // console.log(res.data.length)
                // appState.SurpriseState.push(data)
                disp_surprise(res.data)
            }

        })
        .catch(error => {
            console.log(error)
        })
}