import {
    StyleSheet,
    View,
    Text,
    Pressable, Image,
    Alert,
} from 'react-native';
import { connect } from "react-redux";
import { Divider } from 'react-native-paper';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { CartItems } from '../redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../components/buttons/primary';
import { Color } from '../components/theme';
import { NoItems } from '../utilities/404';
// import auth from './auth';

function Cart({ navigation, appState, disp_cart }) {
    const CartItems = appState.CartItems;
    const ImgBaseUrl = "https://hzxtdbfpqbdznmitwgri.supabase.co/storage/v1/object/public/images/"
    const totalAmount = CartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
    }, 0);

    function addQTY(item, type) {
        const newItem = {
            ...item,
            quantity: type == "minus" ? parseInt(item.quantity) - 1
                : parseInt(item.quantity) + 1
        }
        let getIndex = CartItems.findIndex(e => e.product_code == item.product_code)
        CartItems.splice(getIndex, 1, newItem)
        disp_cart(CartItems)
    }

    function removeFromCart(item) {
        let getIndex = CartItems.findIndex(e => e.product_code == item.product_code)
        CartItems.splice(getIndex, 1)
        disp_cart(CartItems)
    }

    const Colors = Color()
    function ItemsComponent({ index, items }) {
        console.log(items)

        return (
            <View
                key={index}
                style={{
                    // height: 150,
                    // backgroundColor: "rgb(237, 247, 237)",
                    backgroundColor: "#fffbf5",
                    width: "95%",
                    marginLeft: "2.5%",
                    marginTop: 10,
                    // padding: 12,
                    borderRadius: 7,
                    flexDirection: "row",
                }} >
                <View style={{ flex: 4, flexDirection: "row", }} >
                    <View style={{ flex: 2, flexDirection: "column" }} >
                        {/* <Pressable>
                        <FontAwesomeIcon style={{ color: "rgba(146, 20, 12,0.7)", }} size={25} icon={faTimesCircle} />
                    </Pressable> */}
                        <View style={{ justifyContent: "center", alignItems: "center" }} >
                            <Image
                                // source={items.img}
                                source={{ uri: ImgBaseUrl + items.images[0] }}
                                style={{ flex: 1, width: 50, height: 50, resizeMode: 'cover' }}
                            // resizeMode={'cover'} // cover or contain its upto you view look
                            />
                            <Pressable
                                onPress={() => {
                                    Alert.alert("Warning", `${items.name} will be removed from your cart. Do you wish to continue?`,
                                        [{ text: "Cancel" },
                                        {
                                            text: "Remove Item", onPress: () => {
                                                removeFromCart(items)
                                            }
                                        }])
                                }}
                            >
                                <Text style={{ fontSize: 15, textAlign: "left", color: "rgba(146, 20, 12,0.7)", fontWeight: 400 }} >
                                    Romove
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                    {/* <Divider /> */}
                    <View style={{ flex: 2, justifyContent: "center", padding: 2, flexDirection: "column" }} >
                        <Text style={{ fontSize: 20, textAlign: "left" }} >{items.name}</Text>
                        <Text style={{ fontSize: 20, textAlign: "left", }} >₦{items.price * items.quantity}</Text>
                    </View>
                </View>

                <View style={{
                    flex: 0.7,
                    // backgroundColor:"red",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                }} >
                    <View style={{ padding: 4 }} >
                        <Pressable
                            onPress={() => {
                                addQTY(items, "add")
                            }}
                            style={{
                                backgroundColor: "lightgrey",
                                borderTopRightRadius: 6,
                                borderTopLeftRadius: 6,
                                flex: 1, justifyContent: "center", alignItems: "center"
                            }} >
                            <View>
                                <Text style={{ fontSize: 30 }}>
                                    +
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <View>
                                <Text style={{ fontSize: 20 }} >
                                    {items.quantity}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                items.quantity > 1 && addQTY(items, "minus");
                            }}
                            style={{
                                borderBottomRightRadius: 6,
                                borderBottomLeftRadius: 6,
                                backgroundColor: "lightgrey",
                                flex: 2, justifyContent: "center", alignItems: "center",
                                opacity: items.quantity > 1 ? 1 : 0.4
                            }}  >
                            <View>
                                <Text style={{ fontSize: 30 }}>
                                    -
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                </View>

            </View >
        )
    }

    const buttonCallback = (route) => {
        // navigation.push("Checkout", { data: CartItems })
        console.log(auth)
        !auth ? Alert.alert("Error", "You have to login before you proceed to checkout.",
            [{ text: "Cancel" },
            {
                text: "Login", onPress: () => {
                    navigation.push("Login", {
                        data: {
                            CartItems,
                            Auth: true,
                            reroute: true
                        }
                    })

                }
            }]) :
            navigation.push("Checkout", {
                data: {
                    CartItems:{
                        ...CartItems,
                        amount:totalAmount + totalAmount * 2 / 100,
                    },
                    Auth: true
                }
            })
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                {
                    CartItems.length > 0 ?
                        <>

                            <ScrollView>
                                <View style={{
                                    padding: 12,
                                    borderRadius: 7,
                                    flexDirection: "column",
                                }} >
                                    {/* Recent surprises */}
                                    <View style={{ marginTop: 20, }}  >
                                        <View style={{
                                            flexDirection: "row",
                                            marginBottom: 7,
                                            margin: 20,
                                            marginBottom: 30,
                                            justifyContent: "space-between",
                                        }} >

                                            <Pressable onPress={() => {
                                                // navigation.navigate("Checkout", {data:CartItems})
                                                // console.log(CartItems)
                                            }}
                                                style={{
                                                    // marginTop: 20,
                                                    // marginBottom: 30,
                                                    // flex: 3
                                                }}
                                            >
                                                <View style={{
                                                    // marginLeft: "10%",
                                                    // padding: 8,
                                                    borderRadius: 7
                                                }} >
                                                    <Text style={{
                                                        textAlign: "left",
                                                        color: "black",
                                                        // fontWeight: 900,
                                                        fontSize: 20
                                                    }} >
                                                        <Text style={{
                                                            fontWeight: 900,
                                                        }} > {CartItems.length} </Text>
                                                        Item{CartItems.length > 1 && "s"} in your cart</Text>
                                                </View>
                                            </Pressable>

                                            {/* <PrimaryButton callBack={buttonCallback} title="Checkout" /> */}
                                            <Pressable style={{
                                                // flex: 1,
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                                onPress={buttonCallback}
                                            >

                                                <Text
                                                    style={{
                                                        fontWeight: 900,
                                                        fontSize: 20,
                                                        color: Colors.primary,
                                                        // flex:1 
                                                    }} >
                                                    Checkout
                                                </Text>
                                                <FontAwesomeIcon
                                                    size={20}
                                                    style={{ color: Colors.primary, flex: 1 }}
                                                    icon={faChevronRight}
                                                />
                                            </Pressable>
                                        </View>

                                        {/* ITEM */}
                                        {
                                            CartItems.map((items, index) => {
                                                return <ItemsComponent items={items} index={index} />
                                            })
                                        }
                                    </View>
                                    <Divider style={{ marginTop: 10, }} />
                                    <View style={{
                                        // height: 150,
                                        // backgroundColor: "rgb(237, 247, 237)",
                                        backgroundColor: "#fffbf5",
                                        width: "95%",
                                        marginLeft: "2.5%",
                                        marginTop: 10,
                                        padding: 12,
                                        // borderRadius: 7,
                                        flexDirection: "column",
                                    }} >

                                        <View style={{
                                            flexDirection: "row",
                                            marginBottom: 7
                                        }} >
                                            <Text style={{ fontSize: 15, textAlign: "left", flex: 1 }} >Number of items</Text>
                                            {/* <Text style={{ fontSize: 15, textAlign: "right", flex: 1, fontWeight: 700 }} > {CartItems.length} </Text> */}
                                        </View>

                                        <View style={{
                                            flexDirection: "row",
                                            marginBottom: 7
                                        }} >
                                            <Text style={{ fontSize: 15, textAlign: "left", flex: 1 }} >Operation duty</Text>
                                            <Text style={{ fontSize: 15, textAlign: "right", flex: 1, fontWeight: 700 }} >₦{totalAmount * 2 / 100}</Text>
                                        </View>


                                        <View style={{
                                            flexDirection: "row",
                                            marginBottom: 7
                                        }} >
                                            <Text style={{ fontSize: 15, textAlign: "left", flex: 1 }} >Cost of items</Text>
                                            <Text style={{ fontSize: 15, textAlign: "right", flex: 1, fontWeight: 700 }} >₦{totalAmount}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            marginBottom: 7
                                        }} >
                                            <Text style={{ fontSize: 15, textAlign: "left", flex: 1 }} >Total amount</Text>
                                            <Text style={{ fontSize: 15, textAlign: "right", flex: 1, fontWeight: 700 }} >₦{parseInt(totalAmount + totalAmount * 2 / 100)}</Text>
                                        </View>
                                    </View>


                                    <View style={{ marginTop: 20 }} >
                                        <PrimaryButton callBack={buttonCallback} title="Checkout" />

                                        <Pressable onPress={() => {
                                            Alert.alert("Warning", "Do you want to clear your cart?",
                                                [{ text: "Cancel" },
                                                {
                                                    text: "Clear cart", onPress: () => {

                                                        disp_cart([])
                                                        // navigation.goBack()
                                                    }
                                                }])
                                        }}
                                            style={{
                                                marginTop: -20,
                                                marginBottom: 30
                                            }}
                                        >
                                            <View style={{
                                                // backgroundColor: "rgb(146, 20, 12)",
                                                width: "80%",
                                                marginLeft: "10%",
                                                padding: 13,
                                                borderRadius: 7,
                                                flexDirection: "row",
                                                flex: 1,
                                                justifyContent: "center"
                                            }} >
                                                <FontAwesomeIcon
                                                    size={20}
                                                    style={{ color: Colors.secondary, marginRight: 1 }}
                                                    icon={faTimes}
                                                />
                                                <Text style={{
                                                    textAlign: "center",
                                                    color: Colors.secondary,
                                                    // fontWeight: 900,
                                                    fontSize: 20
                                                }} >Clear Cart</Text>
                                            </View>
                                        </Pressable>
                                    </View>


                                </View>


                            </ScrollView>

                        </> : <>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <NoItems text="Your cart is empty" textStyle={{ marginTop: 30 }} />

                                <PrimaryButton title="Add items to cart" callBack={() => navigation.push('ItemsDetails')} style={{
                                    width: "90%"
                                }} />
                            </View>
                        </>

                }

            </SafeAreaView>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_cart: (payload) => dispatch(CartItems(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);