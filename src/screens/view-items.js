import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { Divider } from 'react-native-paper';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import Header from './header2';
import { faCheckDouble, faTimes, faTimesCircle, faTimesRectangle } from '@fortawesome/free-solid-svg-icons';



export default function Cart({ navigation, route }) {
    const category = route.params.data;

    const [count, setCount] = useState(1)
    const [cart, setCart] = useState(category.amount)
    const [cartCount, setCartCount] = useState(0)


    const arry = [
        {
            name: "Birthday",
            amount: 1500,
            img: require('../../assets/cart1.png'),
            code: "AK7RDH4"
        }, {
            name: "Birthday",
            amount: 1500,
            img: require('../../assets/cart1.png'),
            code: "AK7RDHD4"
        }, {
            name: "Wedding",
            amount: 3500,
            img: require('../../assets/cart2.png'),
            code: "AK7DDH4"
        }, {
            name: "Marriage",
            amount: 5500,
            img: require('../../assets/cart3.png'),
            code: "KK7JDH4"
        }, {
            name: "Convocation",
            amount: 4000,
            img: require('../../assets/cart2.png'),
            code: "AK3JDH4"
        }, {
            name: "Anniversary",
            amount: 10000,
            img: require('../../assets/cart1.png'),
            code: "AK2EDH4"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKOODH4"
        }, {
            name: "Convocation",
            amount: 4000,
            img: require('../../assets/cart2.png'),
            code: "AKYTDH4"
        }, {
            name: "Anniversary",
            amount: 10000,
            img: require('../../assets/cart1.png'),
            code: "AK2REH4"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AK7EEH4"
        }, {
            name: "Convocation",
            amount: 4000,
            img: require('../../assets/cart2.png'),
            code: "AK3MDH4"
        }, {
            name: "Anniversary",
            amount: 10000,
            img: require('../../assets/cart1.png'),
            code: "AK2JDS4"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4R"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4W"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4X"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4S"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4NS"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4ZS"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4SQ"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4SW"
        }, {
            name: "Engagement",
            amount: 4500,
            img: require('../../assets/cart3.png'),
            code: "AKRLDH4SA"
        },
    ]
    const [XX, setXX] = useState([])
    const navigate = navigation;
    const addToCart = (item) => {
        setCart(parseInt(cart) + parseInt(item.amount))
        setCartCount(cartCount + 1)
        XX.push(item);
        setXX(XX)
    }

    const unSelect = (item) => {
        let check = XX.filter(itemSelected => itemSelected.code == item.code)
        let checkPositon = XX.findIndex(itemSelected => itemSelected.code == item.code)
        XX.splice(checkPositon, 1)
        setXX(XX)
        setCount(count + 1)
    }
    useEffect(() => {
        // console.log(category)
    }, [])

    return (
        <ScrollView>
            <Header navigation={navigation} priceCount={XX} cartCount={XX} />
            <View style={style.view}>
                <Text
                    style={{
                        // fontWeight:100
                        // paddingLeft: 20,
                        // paddingBottom: 8,
                        color: "lightgrey",
                        marginTop: 25,
                        backgroundColor: "rgb(30, 30, 36)",
                        width: "90%",
                        marginLeft: "5%",
                        padding: 20,
                        textAlign: "center",
                        fontSize: 20,
                        borderRadius: 6
                    }}
                >
                    Send gift package for the following categories.
                </Text>
                <View
                    style={{
                        margin: 10,
                        marginTop: 25,
                        flexDirection: "row",
                        // backgroundColor: "rgb(255, 248, 240)",
                        // padding: 10,
                        // paddingTop: 15,
                        paddingBottom: 15,
                        flexWrap: 'wrap',
                        justifyContent: "center"
                    }}>
                    {arry.map((e, index) => {
                        // check if product already in cart
                        let check = XX.filter(item => item.code == e.code)

                        return (
                            <View
                                key={e.code}
                                index={index}
                                style={{
                                    backgroundColor: "rgb(255, 248, 240)",
                                    height: 130,
                                    width: "30%",
                                    margin: 5,
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                    borderColor:"lightgrey",
                                    borderStyle:"solid",
                                    borderWidth:0.2
                                    // #fffffffd
                                }}>

                                <Pressable
                                    onPress={() => {
                                        // count.push(e)
                                        addToCart(e)
                                        // setCount(count)

                                    }}
                                    style={{
                                        // backgroundColor: "white",
                                        flex: 3,
                                        justifyContent: "center",
                                        alignItems: "center",
                                       
                                    }}
                                >

                                    {check.length > 0 && <>
                                        <Pressable
                                            onPress={() => { unSelect(e) }}
                                            style={{
                                                backgroundColor: "rgba(255, 248, 240,0.9)",
                                                flex: 3,
                                                // justifyContent: "center",
                                                // alignItems: "center",
                                                height: "100%",
                                                position: 'absolute',
                                                width: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                                // textAlign:"right"
                                                // opacity: 0.9

                                            }}>
                                            <FontAwesomeIcon size={20} style={{color:"mediumseagreen"}} icon={faCheckDouble} />
                                        </Pressable>
                                    </>}

                                    {/* <Text>{XX.length}</Text> */}
                                    <Image
                                        source={e.img}
                                        // source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                                    />
                                </Pressable>
                                <Divider />
                                <Pressable
                                    onPress={() => {
                                        navigate.push("FullItemsDetails", { data: e, })
                                    }}
                                    style={{
                                        backgroundColor: "#fffffffd",
                                        flex: 1.4,
                                    }} >
                                    <View

                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                // fontWeight: 900,
                                                paddingLeft: 5
                                            }}
                                        >{e.name}</Text>

                                        <View
                                            style={{
                                                flexDirection: "row"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 11,
                                                    fontWeight: 900,
                                                    paddingLeft: 5,
                                                    flex: 2
                                                }}
                                            >₦{e.amount}</Text>
                                            <View
                                                style={{
                                                    flex: 1
                                                }} >
                                                <FontAwesomeIcon size={14} style={style.icons} icon={faEye} />
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })}


                </View>

            </View>
        </ScrollView>
    )
}


const style = StyleSheet.create({
    icons: {
        color: "rgb(146, 20, 12)",
    },

    view: {
        // marginTop: 10,
        // backgroundColor:"#fffffffd"
    }


})