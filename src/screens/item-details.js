import {
    Text,
    View,
    StyleSheet,
    Pressable, Image,
} from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { CartItems } from '../redux';
import { connect } from "react-redux"
import { CallbackBtn, PrimaryButton } from '../components/buttons/primary';
import { Color } from '../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faEye } from '@fortawesome/free-solid-svg-icons';

function ItemDetails({ navigation, route, disp_cart, appState }) {
    const item = route.params.data;
    const Cart_items = appState.CartItems;
    let check = Cart_items.filter(itemSelected => itemSelected.product_code == item.product_code)
    const ImgBaseUrl = "https://hzxtdbfpqbdznmitwgri.supabase.co/storage/v1/object/public/images/"
    function addToCart() {
        // navigation.pop()
        Cart_items.push(item);
        disp_cart(Cart_items)
        setVisible(true)
    }

    useEffect(() => {
        // console.log(check)
    }, [])

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => { };
    const Colors = Color()

    return (
        <>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                elevation={4}
                duration={2000}
                action={{
                    label: 'View cart',
                    onPress: () => {
                        navigation.push("Cart")
                    },
                }}>
                Item successfully added to your cart.
            </Snackbar>
            <SafeAreaView>
                <ScrollView>

                    <View style={{ height: 300, backgroundColor: "white", }}>
                        <Image
                            style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }}
                            // source={item.img}
                            source={{ uri: ImgBaseUrl + item.images }}
                        />
                    </View>

                    <View style={{
                        flex: 1,
                        padding: 10
                    }} >
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 10
                            }}
                        >
                            <Text style={{
                                fontWeight: 700,
                                flex: 1,
                                padding: 10,
                                fontSize: 25
                            }} >
                                {item.name}
                            </Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "right",
                                padding: 10,
                                fontSize: 25
                            }} >
                                ₦{item.price}
                            </Text>
                        </View>
                        <Text style={{ padding: 10, fontSize: 17 }} >
                            {item.description}
                        </Text>
                        <Divider />

                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 10
                            }}
                        >
                            <Text style={{
                                // fontWeight: 700,
                                flex: 1,
                                padding: 10,
                                // fontSize: 25
                            }} >
                                Weight: <Text style={{ fontWeight: 900 }} >{item.weight + item.weight_type}</Text>
                            </Text>
                            <Text style={{
                                flex: 1,
                                textAlign: "right",
                                padding: 10,
                                // fontSize: 25 
                            }} >
                                <Text style={{ fontWeight: 900 }} > {item.product_code}</Text>

                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{
                                fontWeight: 700,
                                flex: 1,
                                paddingLeft: 10,
                                fontSize: 20
                            }} >
                                Location
                            </Text>
                            <Text style={{
                                flex: 1,
                                // textAlign: "right",
                                paddingLeft: 10,
                                // fontSize: 25 
                            }} >

                                {item.region}

                            </Text>
                        </View>
                        <Divider />
                        <View
                            style={{
                                flexDirection: "column",
                                marginTop: 10,
                                marginBottom: 10,
                                // width: "100%",
                                // marginLeft: "5%"
                            }}
                        >

                            {
                                check.length < 1 ?
                                    <>
                                        <CallbackBtn title="Add to cart" callback={addToCart} data={item} />
                                        <Text style={{ textAlign: "center", marginTop: -7, fontSize: 20, color: Colors.secondary }} >
                                            Add to cart and continue shopping
                                        </Text>
                                    </> :
                                    <>
                                        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: Colors.secondary }} >
                                            Item already in Cart
                                        </Text>
                                        {/* <PrimaryButton title="Keep shopping" navigate={true} route="back" navigation={navigation} /> */}

                                        <Pressable onPress={() => {
                                            navigation.pop()
                                        }}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 20

                                            }}
                                        >
                                            <FontAwesomeIcon
                                                size={20}
                                                style={{ color: Colors.primary, marginRight: 1 }}
                                                icon={faAngleLeft}
                                            />
                                            <Text style={{ textAlign: "center", fontSize: 25, color: Colors.primary, }} >
                                                Back
                                            </Text>
                                        </Pressable>
                                    </>
                            }
                        </View>
                    </View>



                </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);





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