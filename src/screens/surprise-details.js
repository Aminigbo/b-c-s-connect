import {
    StyleSheet,
    View,
    Text,
    Pressable, Image
} from 'react-native';
import { Divider } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Header from '../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight, faBasketShopping, faCheckDouble, faEye, faHeart, faLocation, faLocationDot, faLocationPin, faMapLocation, faMarker, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';


export default function SurpriseDetails({ navigation, route }) {
const [item, setItem] = useState()
    useEffect(() => { 
        setItem(route.params.data)
        console.log(route.params.data.data.items.CartItems)
    }, [])

    function ItemsComponent() {
        return (
            <>
                {
                    [1, 3, 7, 2].map((items, index) => {
                        return (
                            <>
                                <View index={index} style={{
                                    height: 150,
                                    // backgroundColor: "rgb(237, 247, 237)",
                                    backgroundColor: "#ececec",
                                    width: "95%",
                                    marginLeft: "2.5%",
                                    marginTop: 20,
                                    // padding: 12,
                                    borderRadius: 7,
                                    flexDirection: "row",
                                }} >
                                    <View style={{ flex: 5, flexDirection: "column" }} >

                                        <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }} >
                                            {/* <FontAwesomeIcon style={{ color: "grey", flex: 4 }} size={15} icon={faCheckDouble} /> */}
                                            <Image
                                                // style={{ width: 150, height: 150 }}
                                                source={require('../../assets/cart1.png')}
                                                resizeMode={'cover'} // cover or contain its upto you view look
                                            />
                                        </View>
                                        <Divider />
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 2, flexDirection: "row" }} >
                                            <Text style={{ fontSize: 20, }} >Belt</Text><Text style={{ fontSize: 20, marginLeft: 10 }} >₦1,299</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.8,
                                        // backgroundColor:"red",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        padding: 5
                                    }} >
                                        <View style={{ backgroundColor: "rgba(30, 30, 36, 0.05)", flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 7 }} >
                                            <View>
                                                <Text style={{ fontSize: 16 }} >
                                                    QTY
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 30, fontWeight: "normal" }} >
                                                    {items}
                                                </Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                            </>
                        )
                    })
                }
            </>
        )
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView> 

                    <View style={{
                        // height: 100,
                        // backgroundColor: "rgb(255, 248, 240)",
                        // backgroundColor: "#fffffffd",
                        // width: "90%",
                        // marginLeft: "5%",
                        // marginTop: 20,
                        padding: 12,
                        borderRadius: 7,
                        flexDirection: "column",
                    }} >


                        <View style={{
                            height: 100,
                            backgroundColor: "rgb(237, 247, 237)",
                            width: "95%",
                            marginLeft: "2.5%",
                            marginTop: 20,
                            padding: 12,
                            borderRadius: 7,
                            flexDirection: "row",
                        }} >
                            <View style={{ flex: 1, flexDirection: "column", }} >
                                <FontAwesomeIcon style={{
                                    color: "grey"
                                }} size={15} icon={faCheckDouble} />
                            </View>
                            <View style={{
                                flex: 10,
                            }} >

                                <Text
                                    style={{
                                        fontSize: 25,
                                        color: "rgb(30, 70, 32)",
                                        textAlign: "center"
                                    }}
                                >
                                    DELIVERED
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "rgb(30, 70, 32)",
                                        textAlign: "center"
                                    }}
                                >
                                    Your surprise has been delivered to Tessa Tehila
                                </Text>
                            </View>

                        </View>


                        {/* Recent surprises */}
                        <View style={{ marginTop: 20, }}  >

                            <View
                                style={{ marginTop: 10, marginBottom: 10 }} >
                                <View style={{ flexDirection: "row", marginTop: 5, }} >
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "left", marginLeft: 5, fontWeight: 700 }} >Receiver</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "left", marginLeft: 5 }} > {item && item.data.receiver.name} </Text>
                                    </View>
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "right", marginLeft: 5, fontWeight: 700 }} >Relationship</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "right", marginLeft: 5 }} > {item && item.data.receiver.relationship} </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 5, }} >
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "left", marginLeft: 5, fontWeight: 700 }} >Gender</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "left", marginLeft: 5 }} >{item && item.data.receiver.gender}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "right", marginLeft: 5, fontWeight: 700 }} >Phone</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "right", marginLeft: 5 }} > {item && item.data.receiver.phone} </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 5, }} >
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "left", marginLeft: 5, fontWeight: 700 }} >Amount</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "left", marginLeft: 5 }} >₦8,500</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                        <Text style={{ flex: 1, fontSize: 19, color: "grey", textAlign: "right", marginLeft: 5, fontWeight: 700 }} >Date</Text>
                                        <Text style={{ flex: 1, fontSize: 15, color: "grey", textAlign: "right", marginLeft: 5 }} >2023-01-31</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                    <Text style={{ flex: 1, fontSize: 18, color: "grey", marginLeft: 5, fontWeight: 700 }} >Note</Text>
                                    <Text style={{ flex: 1, fontSize: 16, color: "grey", marginLeft: 5 }} >
                                       {item && item.data.receiver.note ? item.data.receiver.note : <Text>No note.</Text> }
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                    <Text style={{ flex: 1, fontSize: 18, color: "grey", marginLeft: 5, fontWeight: 700 }} >Address</Text>
                                    <Text style={{ flex: 1, fontSize: 16, color: "grey", marginLeft: 5 }} >
                                        {item && item.data.receiver.location}
                                    </Text>
                                </View>

                                <Divider style={{ marginTop: 10 }} />


                            </View>
                            <View style={{ flexDirection: "column", flex: 1, padding: 10 }} >
                                <Text style={{ flex: 1, fontSize: 18, color: "grey", marginLeft: 5, fontWeight: 700 }} >Items</Text>

                            </View>

                            {/* ITEM */}


                            <View style={{
                                flexDirection: "row",
                                paddingBottom: 15,
                                flexWrap: 'wrap',
                                // justifyContent:"ce"
                            }}  >
                                {
                                    [1, 2, 3, 4, 5].map(items => {
                                        return (<>
                                            <View
                                                // key={e.code}
                                                // index={index}
                                                style={{
                                                    backgroundColor: "rgb(255, 248, 240)",
                                                    height: 130,
                                                    width: "30%",
                                                    margin: 5,
                                                    flexDirection: "column",
                                                    justifyContent: "space-evenly",
                                                    borderColor: "lightgrey",
                                                    borderStyle: "solid",
                                                    borderWidth: 0.2
                                                }}>

                                                <Pressable
                                                    onPress={() => {
                                                        // count.push(e)
                                                        // addToCart(e)
                                                        // setCount(count)

                                                    }}
                                                    style={{
                                                        // backgroundColor: "white",
                                                        flex: 3,
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                >

                                                    {/* <Text>{XX.length}</Text> */}
                                                    <Image
                                                        // source={e.img}
                                                        // source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                                                        source={require('../../assets/cart1.png')}
                                                    />
                                                </Pressable>
                                                <Divider />
                                                <Pressable
                                                    onPress={() => {
                                                        // navigate.push("FullItemsDetails", { data: e, })
                                                    }}
                                                    style={{
                                                        backgroundColor: "white",
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
                                                        >Name</Text>

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
                                                            >₦900</Text>
                                                            <View
                                                                style={{
                                                                    flex: 1
                                                                }} >
                                                                <FontAwesomeIcon size={14} style={{}} icon={faEye} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        </>)
                                    })
                                }
                            </View>
                        </View>
                    </View>




                </ScrollView>
            </SafeAreaView>
        </>
    )
} 