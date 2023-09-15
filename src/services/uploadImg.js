import { supabase } from "../config/supabase";

export function UploadImage(Payload) {
    return supabase.storage
        .from("images")
        .upload(Payload.fileName, Payload.formData) 

}