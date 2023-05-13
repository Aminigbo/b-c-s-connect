import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    FlatList,
    Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { CartItems, Items } from '../redux';
import { connect } from "react-redux"
import Spinner from 'react-native-loading-spinner-overlay';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FAB, Portal, Divider, AnimatedFAB, Chip } from 'react-native-paper';
import { supabase } from "../config/supabase";
import { Color } from "../components/theme";
import { NoItems } from "../utilities/404";
import FilterCategories from "../components/filterCategories";

const Colors = Color()

const GiftItemsComponents = ({ navigation, route, disp_cart, appState, disp_items }) => {

    const ImgBaseUrl = "https://hzxtdbfpqbdznmitwgri.supabase.co/storage/v1/object/public/images/"
    const fetch = () => {
        setLoader(true)
        supabase
            .from("products")
            .select("*")
            .then(response => {
                if (response.data != null) {
                    disp_items(response.data)
                    setLoader(false)
                } else {
                    disp_items([])
                    setLoader(false)
                    return Alert.alert("Error", "A network error occured, make sure you are connected to the internet",
                        [{ text: "Cancel", onPress: () => { navigation.pop() } },
                        { text: "Retry", onPress: () => { fetch()} }])
                }

                console.log(response)

            })
            .catch(error => {
                disp_items([])
                // console.log("error")
                console.log(error)
                setLoader(false)
                return Alert.alert("Error", "A network error occured, make sure you are connected to the internet",
                    [{ text: "Retry", onPress: () => { } }])
            })
    }

    const [loader, setLoader] = useState(false)
    const [filteredCategory, setFilteredCategory] = useState("stationary")
    const [overlay, setOverlay] = useState() // the overlay that comes when the bottom drawer is active


    useEffect(() => {

        fetch()
        // setInterval(() => {
        //     setLoader(loader);
        // }, 3000);
        console.log("item page");
    }, [])

    // const category = route.params.data;
    const CartItems = appState.CartItems;

    const addToCart = (item) => {
        let check = CartItems.filter(itemSelected => itemSelected.product_code == item.product_code)
        if (check.length < 1) {
            CartItems.push(item)
            disp_cart(CartItems)
        } else {
            // let checkPositon = CartItems.findIndex(itemSelected => itemSelected.code == item.code)
            // CartItems.splice(checkPositon, 1)
            // disp_cart(CartItems)
        }
        // console.log(appState.CartItems)
        // console.log(appState)

    }

    const unSelect = (item) => {
        let checkPositon = CartItems.findIndex(itemSelected => itemSelected.product_code == item.product_code)
        CartItems.splice(checkPositon, 1)
        disp_cart(CartItems)
    }
    

    function ItemsCard({ data, check }) {
        return (
            <Pressable
                key={data.product_code}
                style={{
                    backgroundColor: Colors.light,
                    // backgroundColor: "rgb(255, 248, 240)",
                    height: 130,
                    width: "30%",
                    margin: 5,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    elevation: 4,
                }}>

                <Pressable
                    onPress={() => {
                        addToCart(data)
                    }}
                    style={{
                        flex: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 30,
                        backgroundColor: Colors.light,

                        // backgroundColor:"white"
                    }}
                    android_ripple={{ color: Colors.secondary }}
                >

                    {check.length > 0 && <>
                        <Pressable
                            android_ripple={{ color: Colors.secondary }}
                            onPress={() => { unSelect(data) }}
                            style={{
                                backgroundColor: "rgba(255, 248, 240,0.9)",
                                flex: 3,
                                height: "100%",
                                position: 'absolute',
                                width: "100%",
                                left: 0,
                                zIndex: 1000,
                                alignItems: "flex-end"
                                // textAlign:"right"
                                // opacity: 0.9

                            }}>
                            <FontAwesomeIcon size={15} style={{ color: "mediumseagreen" }} icon={faCheck} />
                        </Pressable>
                    </>}

                    <Image source={{ uri: ImgBaseUrl + data.images }}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: 'cover',
                        }}
                    />
                </Pressable>


                <Divider />
                <Pressable
                    onPress={() => {
                        addToCart(data)
                    }}
                    style={{
                        backgroundColor: "white",
                        flex: 1.4,
                    }} >
                    <View

                    >
                        <Text
                            style={{
                                fontSize: 12,
                                // fontWeight: 900,
                                paddingLeft: 5,
                                color: "black"
                            }}
                        >{data.name}</Text>

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
                            >₦{data.price}</Text>
                        </View>
                    </View>
                </Pressable>

                <View

                    style={{
                        // marginTop: 5,
                        marginBottom: 6
                    }}
                >
                    <Pressable
                        android_ripple={{ color: "white" }}
                        onPress={() => {
                            navigation.push("FullItemsDetails", { data: data })
                        }}
                        style={{
                            // backgroundColor: "rgb(146, 20, 12)",
                            backgroundColor: "#D05F3D",
                            width: "90%",
                            marginLeft: "5%",
                            padding: 5,
                            borderRadius: 5,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                        <Text style={{
                            textAlign: "center",
                            color: "white",
                            flex: 1
                        }} >View </Text>
                        <FontAwesomeIcon size={14} style={{ color: "white", flex: 1 }} icon={faEye} />

                    </Pressable>
                </View>

            </Pressable>
        )
    }






    // hooks///////////////////////////////////////////////////////////
    const sheetRef = useRef(null);


    const snapPoints = useMemo(() => ["50%", "50%",], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
        index == 1 ? setOverlay(true) : setOverlay(false)
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
        setOverlay(true)
    }, []);
    const handleClosePress = useCallback((item) => {
        setFilteredCategory(item.name)
        console.log(item.name)
        sheetRef.current?.close();
        // setOverlay(false)
    }, []);



    // render items or empty cart when no item
    let filtered = []
    if (appState.Items && appState.Items.length > 0) {
        filtered = appState.Items.filter(e => e.category == filteredCategory)
    }
    console.log(appState)
    function RenderItems() {
        if (appState.Items.length < 1) {
            return <NoItems filter callBack={handleClosePress} text=" No item available for this category." />
        } else {
            if (filtered.length < 1) {
                return <NoItems filter callBack={handleClosePress} text=" No item available for this category." />
            } else {
                return (
                    <View style={{ marginHorizontal: 10 }}>
                        <FlatList
                            numColumns={3}
                            data={filtered}
                            renderItem={(listItem) => {
                                let check = CartItems.filter(item => item.product_code == listItem.item.product_code)
                                return <ItemsCard data={listItem.item} check={check} />
                                // return <Text style={{ backgroundColor: "red", margin: 10, padding: 10 }}>Hello</Text>
                            }
                            }
                        />
                    </View>
                )
            }

        }

    }


    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>

                <View
                    style={{
                        color: "lightgrey",
                        backgroundColor: "rgb(30, 30, 36)",
                        padding: 20,
                        textAlign: "center",
                        fontSize: 15,
                        borderRadius: 6,
                        width: "95%",
                        marginHorizontal: "2.5%"
                    }}
                >
                    {/* Send gift package for the following {appState.category.title}. */}

                    <Text
                        style={{
                            color: "lightgrey",
                            textAlign: "center",
                            fontSize: 15,
                        }}
                    >
                        Tap on items to add to your cart. &nbsp;&nbsp; Filter with the icon below
                    </Text>
                    {/* <Text
                        style={{
                            color: "lightgrey",
                            textAlign: "center",
                            fontSize: 15,
                        }}
                    >
                        Tap on items to add to your cart.
                    </Text> */}
                </View>
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
            </View>

            {appState.Items && <RenderItems />}

            {appState.Items && appState.Items.length > 0 && <>
                {filtered.length > 0 && <>
                    <AnimatedFAB
                        icon={'filter'}
                        label={'Label'}
                        // extended={isExtended}
                        onPress={() => handleSnapPress(1)}
                        visible={true}
                        animateFrom={'right'}
                        iconMode={'static'}
                        style={[styles.fabStyle]}
                        color="white"
                    />
                </>}
            </>}


            <BottomSheet
                ref={sheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                enablePanDownToClose={true}

            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    <FilterCategories callBack={handleClosePress} />
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.light
        // paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: "rgb(30, 30, 36)",
        color: "white",
        zIndex: 100
    },
});

const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        // items
        disp_items: (payload) => dispatch(Items(payload)),
        disp_cart: (payload) => dispatch(CartItems(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(GiftItemsComponents);


