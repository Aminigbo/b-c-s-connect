import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "react-native";
import { supabase } from '../../config/supabase';
import { Session } from '@supabase/supabase-js';

export function testFunction() {


    return (
        <Text>Hello</Text>
    )
}


export const localstorageSaveUserMedata = async (data) => {
    try {
        const value = await AsyncStorage
            .setItem("USER", JSON.stringify(data))
        return true
    } catch (e) {
        return false
    }
}

export const Logout = async (data) => {
    try {
        await AsyncStorage.removeItem("USER");
        supabase.auth.signOut();
        return true
    } catch (e) {
        return false
    }

}

export const isAuth = async () => {
    try {
        const User = await AsyncStorage
            .getItem("USER")
        const userData = JSON.parse(User)
        return {
            name: userData.data.fullname,
            email: userData.data.signup_email,
            phone: userData.data.phone

        }
    } catch (e) {
        Logout()
        return false
    }
}

export const Onboard = async () => {
    try {
        const value = await AsyncStorage
            .setItem("ONBOARDED", '1')
        return true
    } catch (e) {
        return false
    }
}

export const Onborded = async () => {
    try {
        const Question = await AsyncStorage
            .getItem("ONBOARDED")
        return JSON.parse(Question)
    } catch (e) {
        return false
    }
}


export const signupService = (payload) => {
    return supabase.auth.signUp(
        {
            email: payload.signup_email,
            password: payload.signup_password,
        },
        {
            data: payload
        }
    )
}

export const SaveMetadata = (payload) => {
    supabase.from("users")
        .insert([{
            user: payload.signup_email,
            data: {
                ...payload,
                surpeises: {
                    sent: [],
                    received: []
                }
            }
        }])
        .then(response => {
            console.log("Saved metadata")
        })
        .catch(error => {
            console.log(error)
        })
}

export const fetchMetadata = (payload) => {
    return supabase.from("users")
        .select(`
        *,
        gifts(
          sender
        )
      `)
        .eq("user", payload)

    // .then(response => {
    //     console.log(response.data[0])
    // localstorageSaveUserMedata(response.data[0]).then(resp => {
    //     console.log("Saving to local")
    //     console.log(resp)
    // })
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}

export const signinService = (payload) => {
    return supabase.auth
        .signInWithPassword({
            email: payload.email,
            password: payload.password,
        }
        )
}