import { supabase } from "../../config/supabase";

export const onboardedStates = (payload) => {
    return supabase
        .from("onboarded")
        .select("*")
        .eq("state", payload.onboardstate)
        .eq("fellowship", payload.onboardfellowship)
        .eq("active", true)
};

export function AddFellowship(payload) {
    return supabase
        .from("abasites")
        .update({ fellowship: payload.data })
        .eq('phone', payload.user)
}