import { supabase } from "../../config/supabase";

export function FetchStateData(state) {
    return supabase
        .from("data")
        .select("*")
        .eq("states", state)
}

export function AddNewBethel(payload) {
    return supabase
        .from("data")
        .update({ bethel: payload.data})
        .eq('states', payload.state)
}