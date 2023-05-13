import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable
} from 'react-native';
import React from 'react';
import { Divider } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';


export default function CategoriesComponent({navigation, disp_category, setLoader}) { 
    const arry = [
        {
            title: "Birthday",
            amount: 1500,
            img: require('../../assets/cart1.png')
        }, {
            title: "Wedding",
            amount: 3500,
            img: require('../../assets/cart2.png')
        }, {
            title: "Marriage",
            amount: 5500,
            img: require('../../assets/cart3.png')
        }, {
            title: "Convocation",
            amount: 4000,
            img: require('../../assets/cart2.png')
        }, {
            title: "Anniversary",
            amount: 10000,
            img: require('../../assets/cart1.png')
        }, {
            title: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png')
        },
    ]
    return (
        <View style={style.view}>
            <Text
                style={{
                    // fontWeight:100
                    paddingLeft: 20,
                    paddingBottom: 8,
                    color: "grey", 
                }}
            >
                Send gift package for the following categories.
            </Text>
            <View
                style={{
                    margin: 10,
                    marginTop: -2,
                    flexDirection: "row",
                    // backgroundColor: "rgb(255, 248, 240)",
                    // padding: 10,
                    // paddingTop: 15,
                    paddingBottom: 15,
                    flexWrap: 'wrap',
                    justifyContent: "center",
                }}>
                {arry.map((e, index) => (
                    <Pressable
                        onPress={() => {
                            // const pushAction = StackActions.push('Profile', { user: 'Wojtek' });
                            // navigation.dispatch(pushAction);
                            // disp_category(e)
                            navigation.navigate("ItemTab")
                            console.log(navigation)
                        }}
                        key={index}
                        style={{
                            backgroundColor: "rgb(255, 248, 240)",
                            height: 130,
                            width: "30%",
                            margin: 5,
                            flexDirection: "column",
                            justifyContent: "space-evenly"
                        }}>

                        <View
                            style={{
                                // backgroundColor: "white",
                                flex: 3,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={e.img}
                            />
                        </View>
                        <Divider />
                        <View
                            style={{
                                backgroundColor: "rgb(146, 20, 12)",
                                // backgroundColor: "rgb(255, 248, 240)",
                                flex: 1.4,
                                borderBottomLeftRadius: 9,
                                borderBottomRightRadius: 9,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: 900,
                                    paddingLeft: 5,
                                    color:"white"
                                }}
                            >{e.title}</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    // fontWeight: 900,
                                    paddingLeft: 5,
                                    color:"lightgrey"
                                }}
                            >₦{e.amount}</Text>
                        </View>
                        <View

                            style={{
                                backgroundColor: "#1E1E24",
                                // backgroundColor: "rgb(146, 20, 12)",
                                flex: 1,
                                borderBottomLeftRadius: 9,
                                borderBottomRightRadius: 9,
                                justifyContent: "center",
                                alignItems: "center",
                                display:"none"
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: 400,
                                    fontSize: 16,
                                }}
                            >Select</Text>

                        </View>

                    </Pressable>
                ))}


            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingRight: 20,
                   
                }}
            >
                <Text
                    style={{
                        // fontWeight:100
                        paddingLeft: 20,
                        paddingBottom: 8,
                        color: "grey"
                    }}
                >
                    Something else?

                </Text>
                <Pressable
                    onPress={() => {

                    }}

                    style={{
                        marginLeft: 10
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 900,
                            color: "rgb(146, 20, 12)",
                        }}>
                        Tell us
                    </Text>
                </Pressable>
            </View>

        </View>
    )
}


const style = StyleSheet.create({
    icons: {
        color: "rgb(146, 20, 12)",
    },

    view: {
        marginTop: 10,
        marginBottom:20
    }


})