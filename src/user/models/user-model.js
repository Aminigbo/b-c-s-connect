import { supabase } from "../../config/supabase";

export function AddUser_meta(payload) {
    return supabase
        .from("abasites")
        .update({ meta: payload.data, fellowship: payload.fellowship })
        .eq('phone', payload.user)
}


export function SaveTokenOnLogin(payload) {
    return supabase
        .from("abasites")
        .update({ meta: payload.data })
        .eq('phone', payload.user)
}



export function AddCourse(payload) {
    return supabase
        .from("abasites")
        .update({ study: payload.data })
        .eq('phone', payload.user)
}





//////////////////////////////////////////// update collage
export function UpdateCourse(payload) {
    supabase
        .from("meta_data")
        .update({
            colleges: payload.College,
            degrees: payload.Courses
        })
        .eq("id", 1)
        .then(response => {
            console.log(response)
            console.log("added collage")
        })
}

export function NewCourse(payload) {
    console.log(payload)
    supabase
        .from("meta_data")
        .select("*")
        .eq("id", 1)
        .then(res1 => {

            let Courses = res1.data[0].degrees
            let check = Courses.filter(e => e.label == payload.course.label)
            if (check.length > 0) {
                let position = Courses.findIndex(e => e.label == payload.course.label)
                Courses.splice(position, 1, payload.course);
            } else {
                Courses.push(payload.course);
            }

            // config college
            let College = res1.data[0].colleges
            let check2 = College.filter(e => e.label == payload.college.label)
            if (check2.length > 0) {
                let position2 = College.findIndex(e => e.label == payload.college.label)
                College.splice(position2, 1, payload.college);
            } else {
                College.push(payload.college);
            }

            let newPayload = {
                Courses,
                College

            }
            // console.log(newPayload)
            UpdateCourse(newPayload)
        })
}


//  Add new skill
export function AddSkillset(payload) {
    return supabase
        .from("abasites")
        .update({ skills: payload.data })
        .eq('phone', payload.user)
}

//  delete skill
export function deleteSkillset(payload) {
    return supabase
        .from("abasites")
        .update({ skills: payload.data })
        .eq('phone', payload.user)
}


// manage profile photo
export function ManagePhoto(payload) {
    return supabase
        .from("abasites")
        .update({ img: payload.data })
        .eq('phone', payload.userPhone)
}