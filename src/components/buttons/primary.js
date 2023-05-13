import React from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faBasketShopping, faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import IconBadge from 'react-native-icon-badge';
import { Color } from "../theme";

const Colors = Color()
export function PrimaryButton({ title, callBack, style }) {
    const count = 2
    return (
        <>
            <Pressable
                android_ripple={{ color: "white" }}
                onPress={() => {
                    // if (navigate == true) {
                    //     route == "back" ? navigation.goBack() : navigation.navigate(route, { data })
                    // }
                    callBack()
                }}
                style={[{
                    backgroundColor: Colors.primary,
                    height: 50,
                    // width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 2,
                    borderRadius: 9,
                    marginTop: 20,
                    marginBottom: 30,
                    paddingHorizontal:20
                }, style && style]}>
                <Text style={{ textAlign: "center", fontSize: 20, color: Colors.light }} >{title}</Text>
                {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
            </Pressable>
        </>
    )
}


export function CallbackBtn({ title, callback, data }) {
    const count = 2
    return (
        <>
            <Pressable
                android_ripple={{ color: "white" }}
                onPress={() => {
                    callback()
                }}
                // key={index}
                style={{
                    backgroundColor: Colors.primary,
                    height: 60,
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 2,
                    borderRadius: 9,
                    marginTop: 20,
                    marginBottom: 30,
                }}>
                <Text style={{ textAlign: "center", fontSize: 20, color: Colors.light }} >{title}</Text>
                {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
            </Pressable>
        </>
    )
}

const style = StyleSheet.create({
    primary: {
        backgroundColor: "red"
    }
})

