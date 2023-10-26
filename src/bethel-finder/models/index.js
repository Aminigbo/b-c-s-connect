import { supabase } from "../../config/supabase";

export function FetchStateData(state) {
    return supabase
        .from("data")
        .select("*")
        .eq("states", state)
}

export function FetchAllBethels() {
    return supabase
        .from("bethels")
        .select("*")
}
export function FetchBethel(name) {
    return supabase
        .from("bethels")
        .select("*")
        .eq("bethelName", name)
}

// export function AddNewBethel(payload) {
//     return supabase
//         .from("data")
//         .update({ bethel: payload.data })
//         .eq('states', payload.state)
// }

export function AddNewBethel(payload) {
    return supabase
        .from("bethels")
        .insert({
            state: payload.state,
            bethelName: payload.data.bethel,
            metadata: payload
        })
}

export function FetchAllNotifications(phone) {
    return supabase
        .from("notifications")
        .select("*")
        .or(`invitee.eq.ALL,invitee.eq.${phone}`)
        .order('id', { ascending: false })
}

export function MarkNotificationRead(id, userPhone) {
    supabase
        .from("notifications")
        .select("*")
        .eq("id", id)
        .then(res => {
            let seenArray = res.data[0].seen_arry
            let FilterSeen_arry = seenArray.filter(e => e == userPhone)
            if (FilterSeen_arry.length < 1) {
                seenArray.push(userPhone)
                supabase
                    .from("notifications")
                    .update({ seen: true, seen_arry: seenArray })
                    .eq("id", id)
                    .then(res2 => {
                        console.log("marked seen", res2)
                    })
            }


        })


}

export function ConfigContectRequest({ id, status }) {
    return supabase
        .from("notifications")
        .update({ status: status })
        .eq("id", id)

}