import React from "react"
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faBasketShopping, faCalendar, faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import IconBadge from 'react-native-icon-badge';
import { Color } from "../theme";
import { Style } from "../../../assets/styles";

const Colors = Color()
export function SecondaryButton({ title, callBack, style, titleColor, icon }) {
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
                    // backgroundColor:Colors.lightgrey,
                    height: 46,
                    // width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // elevation: 2,
                    borderRadius: 9,
                    paddingHorizontal: 10,
                    // marginLeft:"5%"
                }, style && style]}>
                <Text style={[Style.boldText, { textAlign: "center", color: !titleColor ? Colors.light : titleColor }]} >{title}</Text>
                {icon &&
                    <FontAwesomeIcon style={{
                        flex: 1,
                        color: Colors.dark,
                    }} size={25} icon={faCalendar} />
                }
            </Pressable>
        </>
    )
}

export function PrimaryButton({ title, callBack, style, loading }) {
    const count = 2
    return (
        <>
            {loading && loading == true ? <ActivityIndicator style={{ marginVertical: 25 }} /> :
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
                        width: "90%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 2,
                        borderRadius: 9,
                        paddingHorizontal: 10,

                    }, style && style]}>
                    <Text style={{ textAlign: "center", fontSize: 15, color: Colors.light }} >{title}</Text>
                    {/* <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                }} size={25} icon={faHeart} /> */}
                </Pressable>
            }

        </>
    )
}



export function PillButton({ title, callBack, style, loading, icon, textColor }) {
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
                    height: 33,
                    // width: "90%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 2,
                    borderRadius: 19,
                    paddingHorizontal: 10,
                    // marginHorizontal:5

                }, style && style]}>
                {loading && loading == true ? 
                <ActivityIndicator style={{ paddingHorizontal: 25 }} /> :
                    <>
                        {icon && <FontAwesomeIcon size={13} style={{
                            marginRight: 5,
                            color: Colors.lightgrey,
                        }}
                            icon={icon} />}
                        <Text style={{ textAlign: "center", fontSize: 15, color: textColor ? textColor : Colors.light }} >{title}</Text>
                    </>
                }
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

