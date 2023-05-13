import {
    Text,
    View,
    Pressable,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping'
import IconBadge from 'react-native-icon-badge';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import Svg, { Path } from "react-native-svg";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CartIcon } from './icons';

export default function Header({ navigation, title, priceCount, cartCount, home, cart }) {

    const iconSize = 22;
    const count = 2;
    return (
        <>
            <View style={{
                // alignItems: "center",
                // flex: 1,
                // justifyContent: "space-evenly",
                // backgroundColor: "rgb(255, 248, 240)",
                // backgroundColor: "#fffffffd",
                // flexDirection: "row",
                // position:"fixed"
                // paddingBottom: 34,
                paddingLeft: 14
            }} >

                <View
                    style={{
                        alignItems: "center",
                        // flex: 1,
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        // position:"fixed"
                    }} >
                    <View
                        style={{
                            // backgroundColor: "black",
                            // padding: 12,
                            flex: 1
                        }}
                    >


                        <Pressable
                            onPress={() => {
                                navigation.goBack()
                                // console.log(navigation)
                            }}
                        >
                            <FontAwesomeIcon size={iconSize} style={style.icons} icon={faAngleLeft} />
                        </Pressable>

                    </View>


                    <View
                        style={{
                            // backgroundColor: "red",
                            padding: 12,
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "none"
                        }}
                    >
                        {title && <>
                            <Text style={{
                                fontWeight: 900,
                                fontSize: 25
                            }}>
                                {/* ₦897 */}
                                {title}
                            </Text>
                        </>}

                        {priceCount && <>
                            <Text style={{
                                fontWeight: 900,
                                fontSize: 25
                            }}> ₦{console.log(priceCount)} </Text>
                        </>}

                    </View>
                </View>
            </View>
        </>
    )
}


const style = StyleSheet.create({
    icons: {
        color: "rgb(146, 20, 12)",
    },

    view: {
        height: 100,
        marginTop: 10,
        backgroundColor: "lightblue"
    },

    taglineText: {
        color: "lightgrey",
        marginLeft: 20,
        marginTop: -3
    }




})