import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Header from '../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../controllers/auth/authController';
import { Color } from '../components/theme';
import { Loader } from '../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import {
    surprise_state
} from "../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../controllers/items/itemsControllers';
import { NoItems } from '../utilities/404';
import { PrimaryButton } from '../components/buttons/primary';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function AccountComponent({ route, appState, disp_surprise }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const navigation = useNavigation();
    const GetUser = () => {
        if (User == undefined) {
            isAuth().then(res => {
                console.log(res)
                if (res == false) return navigation.pop()
                setUserState(res)
            })
        } else {
            setUserState(User)
        }
    }
    const AllSurprises = appState.SurpriseState;
    useEffect(() => {
        // console.log(AllSurprises.length)
        console.log("Account page")
        GetUser()
        if (route.params && route.params != undefined) {
            console.log(route.params)
            let routeParams = route.params.data
            // if(routeParams.refresh == true){
            //     FetchGifts(User.email,disp_surprise)
            // }
        } else {
            console.log("No params")
        }
    }, [setUserState])

    const GiftSUmmary = [
        { title: "Total Gifts", icon: faBasketShopping, value: 20, color: "#fffbf5" },
        { title: "Delivered", icon: faCheckDouble, value: 17, color: "#fff7ef" },
        { title: "Pending", icon: faCheck, value: 3, color: "#fffbf5" },
    ]

    function RenderSurperise() {
        if (AllSurprises.length < 1) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <NoItems text="You have not gifted anyone yet." textStyle={{ marginTop: 30 }} />

                    <PrimaryButton title="Gift someone" callBack={() => navigation.push('ItemsDetails')} style={{
                        width: "100%"
                    }} />
                </View>
            )
        } else {
            return AllSurprises.map((items, index) => {
                console.log(items.data.items[0])
                let data = items.data;
                return (
                    <Pressable
                        key={index}
                        android_ripple={{ color: Colors.secondary }}
                        onPress={() => {
                            navigation.push("SurpriseDetails", { data: items })
                        }}
                        style={{ marginTop: 10, flexDirection: "row", marginBottom: 10, }} >
                        <View style={{ flex: 4 }} >
                            <View style={{ flexDirection: "row" }} >
                                <Text style={{ flex: 3, fontSize: 18, color: Colors.dark, fontWeight: 900, marginLeft: 25 }} >Surprise to <Text style={{
                                    color: Colors.primary
                                }} >{items.data.receiver.name}</Text> </Text>
                                {/* <FontAwesomeIcon size={20} style={{ flex: 3 }} icon={faAngleRight} /> */}
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <View style={{ flex: 1, color: "grey", justifyContent: "center", alignItems: "center" }}  >
                                    <FontAwesomeIcon size={17} style={{ color: Colors.primary }} icon={faLocationDot} />
                                </View>
                                <View style={{ flex: 10, color: "grey" }}  >
                                    <Text style={{ flex: 4, fontSize: 14, color: "grey", fontWeight: 100 }} >
                                        {items.data.receiver.location}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 5 }} >
                                <Text style={{ flex: 3, fontSize: 15, color: "grey", marginLeft: 25 }} >2023-01-27</Text>
                                <Text style={{ flex: 3, fontSize: 15, color: "grey", textAlign: "right", marginLeft: 3 }} >₦8,500</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <FontAwesomeIcon size={20} style={{ flex: 3, color: Colors.primary }} icon={faAngleRight} />
                        </View>
                        {/* <Divider /> */}
                    </Pressable>
                )
            })
        }
    }



    return (
        <>
            <SafeAreaView>
                <ScrollView>

                    {userState ? <>

                        <View style={{
                            borderRadius: 7,
                            flexDirection: "column",
                            
                        }} >

                            <View style={{ width: '100%', }}>
                                <ImageBackground
                                    opacity={0.4}
                                    style={styles.imageBackground}
                                    source={require('../../assets/bg.jpg')}
                                >
                                    <View style={[styles.overlay,
                                    { justifyContent: "center", alignItems: "center", flex: 1, paddingVertical: 30 }]}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flex: 1,
                                            // backgroundColor:"red",
                                            width: "100%",
                                            marginHorizontal: 10, padding: 10
                                        }} >
                                            <BackIcon />
                                            <OpenDrawer style={{ marginRight: 20 }} />
                                        </View>

                                        <Image
                                            style={{
                                                width: 100, height: 100, marginTop: 20,
                                                borderRadius: 100,
                                            }}
                                            // source={require('../../assets/user.png')}
                                            source={require('../../assets/bg.jpg')}
                                            resizeMode={'cover'} />

                                        <View style={{ flexDirection: "column", flex: 1, alignItems: "center", }} >
                                            <Text style={{
                                                // textAlign: " ",
                                                color: Colors.dark,
                                                fontWeight: 900,
                                                fontSize: 27,
                                                // flex: 1,
                                                marginTop: 10
                                            }} >{userState.name}</Text>
                                            <Text style={{
                                                // textAlign: " ",
                                                color: "grey",
                                                // fontWeight: 900,
                                                fontSize: 16,
                                                // flex: 1,
                                            }} >{userState.email} </Text>
                                            {/* <Text style={{
                                                textAlign: " ",
                                                color: "grey",
                                                fontWeight: 900,
                                                fontSize: 16,
                                                flex: 1,
                                            }} >*******{userState.phone.slice(-4)}</Text> */}
                                        </View>


                                        <View style={{
                                            marginTop: 7,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            // marginVertical: 10,
                                            justifyContent: "space-around",
                                            flex: 1

                                        }} >
                                            <Pressable
                                                onPress={() => {
                                                    console.log(appState.SurpriseState)
                                                }}
                                                android_ripple={{ color: Colors.secondary }}
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginVertical: 10,
                                                }} >

                                                <View

                                                    style={{
                                                        marginHorizontal: 30,
                                                        marginVertical: 1,
                                                        backgroundColor: Colors.primary,
                                                        paddingVertical: 8,
                                                        paddingHorizontal: 8,
                                                        borderRadius: 20
                                                    }} >
                                                    <FontAwesomeIcon style={{
                                                        flex: 1,
                                                        color: Colors.light,

                                                    }} size={25} icon={faTree} />
                                                </View>

                                                <Text>
                                                    Create surpeise
                                                </Text>

                                            </Pressable>

                                            <Pressable
                                                android_ripple={{ color: Colors.secondary }}
                                                onPress={() => {
                                                    navigation.navigate("ItemsDetails");
                                                }}
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginVertical: 10,
                                                }} >

                                                <View
                                                    style={{
                                                        marginHorizontal: 30,
                                                        marginVertical: 1,
                                                        backgroundColor: Colors.primary,
                                                        paddingVertical: 8,
                                                        paddingHorizontal: 8,
                                                        borderRadius: 20
                                                    }} >
                                                    <FontAwesomeIcon style={{
                                                        flex: 1,
                                                        color: Colors.light,

                                                    }} size={25} icon={faGifts} />
                                                </View>

                                                <Text>
                                                    Gift someone
                                                </Text>

                                            </Pressable>

                                            <Pressable
                                                android_ripple={{ color: Colors.secondary }}
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginVertical: 10,
                                                }} >

                                                <View
                                                    style={{
                                                        marginHorizontal: 30,
                                                        marginVertical: 1,
                                                        backgroundColor: Colors.primary,
                                                        paddingVertical: 8,
                                                        paddingHorizontal: 8,
                                                        borderRadius: 20
                                                    }} >
                                                    <FontAwesomeIcon style={{
                                                        flex: 1,
                                                        color: Colors.light,

                                                    }} size={25} icon={faYoutube} />
                                                </View>

                                                <Text>
                                                    Documentaries
                                                </Text>

                                            </Pressable>
                                        </View>
                                    </View>



                                </ImageBackground>
                            </View>


                            {/* paste back here */}
                            {/* <Divider style={{ marginTop: 30 }} /> */}

                            <View style={{
                                borderTopRightRadius: 40,
                                borderTopLeftRadius: 40,
                                backgroundColor: Colors.light,
                                padding: 12,
                                marginTop: -13,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 15,
                                // flex:1,
                                // height:"100%",
                                minHeight: 450, // Set the minimum height here
                                // backgroundColor: 'red'
                            }} >
                                {/* Gift Summary */}
                                {/* <Text style={{ marginTop: 20, color: "grey" }} >Gift Summary</Text> */}
                                <View style={{
                                    marginTop: 7,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "none"

                                }} >
                                    {
                                        // GiftSUmmary.map((items) => { 
                                        //     return (
                                        //         <>
                                        //             <Pressable
                                        //                 key={items.icon}
                                        //                 style={{ 
                                        //                     backgroundColor: Colors.secondary,
                                        //                     margin: 3,
                                        //                     paddingHorizontal: 12,
                                        //                     paddingVertical: 6,
                                        //                     borderRadius: 7,
                                        //                     flexDirection: "row",
                                        //                     justifyContent: "center",
                                        //                     alignItems: "center",
                                        //                     flex: 1
                                        //                 }} >
                                        //                 <View style={{
                                        //                     flex: 1, flexDirection: "column",

                                        //                 }} >
                                        //                     <Text
                                        //                         style={{
                                        //                             flex: 1,
                                        //                             // fontWeight: 900,
                                        //                             fontSize: 16,
                                        //                             color: "grey", 
                                        //                         }}
                                        //                     >
                                        //                         {items.title}
                                        //                     </Text>
                                        //                     <Text
                                        //                         style={{
                                        //                             flex: 1,
                                        //                             fontWeight: 900,
                                        //                             fontSize: 27,
                                        //                             flex: 3,
                                        //                             color: Colors.primary,
                                        //                             paddingLeft: 5
                                        //                         }}
                                        //                     >
                                        //                         {/* {items.value} */}
                                        //                         2
                                        //                     </Text>
                                        //                 </View>
                                        //                 <FontAwesomeIcon style={{
                                        //                     flex: 1,
                                        //                     color: Colors.primary
                                        //                 }} size={18} icon={items.icon} />

                                        //             </Pressable>
                                        //         </>
                                        //     )
                                        // })
                                    }
                                </View>


                                {/* Recent surprises */}
                                <View style={{ marginTop: 20,  }}  >
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",

                                    }} >

                                        <Text style={{ flex: 1 }} >Gift Summary</Text>
                                        <View style={{
                                            flexDirection: "row",
                                            marginRight: 20,
                                            // backgroundColor:"red",
                                            flex: 0.3,
                                            display: 'none'

                                        }} >
                                            <Text style={{ fontSize: 19 }} >21</Text>
                                            <FontAwesomeIcon size={16} style={{
                                                flex: 1,
                                                color: "mediumseagreen",
                                                // margin: 20,
                                            }}
                                                icon={faArrowUp} />
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            marginRight: 20,
                                            // backgroundColor:"red",
                                            flex: 0.3,
                                            display: 'none'

                                        }} >
                                            <Text style={{ fontSize: 19 }} >91</Text>
                                            <FontAwesomeIcon size={16} style={{
                                                flex: 1,
                                                color: Colors.primary,
                                                opacity: 0.8
                                                // margin: 20,
                                            }}
                                                icon={faArrowUp} />
                                        </View>

                                    </View>
                                    <Divider style={{ marginTop: 10 }} />

                                    {/* All surpreses */}
                                    <RenderSurperise />

                                </View>

                                {
                                    AllSurprises.length > 4 && <>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-end",
                                                padding: 20,

                                            }}
                                        >
                                            <Pressable style={{ flexDirection: "row", }} >
                                                <View
                                                    onPress={() => {

                                                    }}

                                                    style={{
                                                        // marginLeft: 10,
                                                        marginRight: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontWeight: 900,
                                                            color: Colors.primary,
                                                            fontSize: 19
                                                        }}>
                                                        Surprise history
                                                    </Text>
                                                </View>
                                                <FontAwesomeIcon size={20} style={{
                                                    flex: 3,
                                                    color: Colors.primary,
                                                    // margin: 20,
                                                }}
                                                    icon={faAngleRight} />
                                            </Pressable>
                                        </View>
                                    </>
                                }




                            </View>


                        </View>
                    </> : <Loader loading={true} />}





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
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);




const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        // backgroundColor:"red"
    },
    overlay: {
        flex: 1,
        backgroundColor: Colors.light, // red color with 50% transparency
        opacity: 0.8,
        marginTop: -20
    },
});