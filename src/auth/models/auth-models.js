import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../config/supabase"

export function FetchMetaData(phone) {
    return supabase
        .from("abasites")
        .select("*")
        .eq("phone", phone)
}

export function SignIn(payload) {
    return supabase.auth
        .signInWithPassword({
            email: payload.email,
            password: payload.password,
        })
}

// save suggested user to Localstorage
export const SaveUserAfterLogin = async (user) => { 
    try {
        await AsyncStorage.setItem("USER", JSON.stringify(user))
        return true
    } catch (e) {
        return e
    }
}



// save suggested user to Localstorage
export const SaveSuggestedUser = async (user) => {
    try {
        await AsyncStorage.setItem("SUGGESTED_USER", JSON.stringify(user))
        return true
    } catch (e) {
        return e
    }
}

// save suggested user to Localstorage
export const SaveFellowship = async (data) => {
    try {
        await AsyncStorage.setItem("FELLOWSHIP", JSON.stringify(data))
        return true
    } catch (e) {
        return e
    }
}

// check if user is logged in
export const Logout = async (logOut) => {

    try {
        await AsyncStorage.removeItem("USER");
        supabase.auth.signOut();
        logOut()
        return true
    } catch (e) {
        return e
    }

}

export const isAuth = async () => {
    try {
        const User = await AsyncStorage
            .getItem("USER")
        return User
    } catch (e) {
        Logout()
        return false
    }
}

// sign up
export function SignUpModel(payload) {
    return supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
    }, { data: payload })
}

// signup to public folder
export function PublicFolderModel(payload) {
    return supabase
        .from("abasites")
        .insert({
            name: payload.name,
            label: payload.name,
            value: payload.name,
            phone: payload.phone,
            meta: payload.meta,
            password: payload.password,
            state: payload.state,
            fellowship: payload.fellowship, 
        })
}

// update password
export var PasswordUpdate = (data) => {
    return supabase.auth.update(
        {
            email: data.email,
            password: data.password,
            // data: { password: data.saltedPwd, rawPwd: data.password }
        }
    )
}

//update password in the public folder
export function EditPassword(payload) {
    return supabase
        .from("abasites")
        .update({ password: payload.password })
        .eq('phone', payload.phone)
}
