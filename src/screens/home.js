import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    StatusBar,
    Pressable, Image
} from 'react-native';
import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import AdBanner from "../components/ad-banner"
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import CategoriesComponent from '../components/categories';
import { Divider, Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import {
    categories, initAuth
} from "../redux";
import { Color } from '../components/theme';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import { Justget, isAuth } from '../controllers/auth/authController';
import { FetchGifts } from '../controllers/items/itemsControllers';
import Documentary from '../components/documentry';


const Colors = Color()

function CategoriesComponent({ navigation, disp_category, setLoader, appState }) {
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

            <View style={{
                // backgroundColor: "rgb(255, 248, 240)", 
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 35,
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
            }} >
                <Pressable
                    android_ripple={{ color: "white" }}
                    onPress={() => {
                        navigation.push("WEB")
                    }}

                    style={{
                        backgroundColor: Colors.primary,
                        height: 60,
                        width: "48%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 2,
                        borderRadius: 9,
                    }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 20, color: Colors.white
                    }} >
                        Surprise someone
                    </Text>
                    <FontAwesomeIcon style={{
                        flex: 1,
                        color: Colors.light,
                    }} size={25} icon={faHeart} />
                </Pressable>

                <Pressable
                    android_ripple={{ color: "white" }}
                    onPress={() => {
                        isAuth().then(res => {
                            console.log(res.user)
                        })
                    }}
                    style={{
                        backgroundColor: Colors.primary,
                        height: 60,
                        width: "48%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 4,
                        borderRadius: 9,
                        // padding: 20
                    }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 20, color: Colors.white
                    }} >
                        Gift someone</Text>
                    <FontAwesomeIcon style={{
                        flex: 1,
                        color: Colors.light,
                    }} size={25} icon={faBoxes} />
                </Pressable>
            </View>

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
                        android_ripple={{ color: "white" }}
                        onPress={() => {
                            // const pushAction = StackActions.push('Profile', { user: 'Wojtek' });
                            // navigation.dispatch(pushAction);
                            // disp_category(e)
                            navigation.navigate("ItemsDetails",
                                { data: e })
                        }}
                        key={index}
                        style={{
                            backgroundColor: Colors.secondary,
                            height: 100,
                            width: "30%",
                            margin: 5,
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            elevation: 1,
                            borderRadius: 9,
                        }}>

                        <View
                            style={{
                                flex: 3,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={e.img}
                            />
                        </View>
                        <Divider style={{ backgroundColor: Colors.light }} />
                        <View
                            style={{
                                // backgroundColor:Colors.secondary,
                                // opacity:0.1,
                                // backgroundColor: "rgb(255, 248, 240)",
                                // flex: 1.4,
                                // borderBottomLeftRadius: 9,
                                // borderBottomRightRadius: 9,
                                padding: 4
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    paddingLeft: 5,
                                    color: Colors.dark
                                }}
                            >{e.title}</Text>
                            {/* <Text
                                style={{
                                    fontSize: 13,
                                    // fontWeight: 900,
                                    paddingLeft: 5,
                                    color: Colors.dark
                                }}
                            >₦{e.amount}</Text> */}
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
                                display: "none"
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
                        navigation.navigate("LET'S TALK")
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



function Home({ navigation, disp_category, appState, disp_ath }) {
    const iconSize = 25;
    const [count, setCount] = useState(0)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        // console.log(appState);
    }, [])

    return (
        <SafeAreaView>
            {/* {console.log(appState)} */}
            {/* <Header navigation={navigation} home={true} /> */}
            <ScrollView>
                <StatusBar barStyle="dark-content" backgroundColor="rgb(255, 248, 240)" />

                <View style={style.view}>

                    <AdBanner autoplay={true} />{/* slidding ad banner */}
                    <View
                        style={{
                            margin: 10,
                            marginTop: 10,
                            flexDirection: "row",
                            backgroundColor: Colors.light,
                            // backgroundColor: "rgb(146, 20, 12)",
                            borderRadius: 6,
                            padding: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                        <Text
                            style={{
                                flex: 2,
                                fontWeight: 900,
                                color: Colors.dark,
                                fontSize: 17
                            }}
                        >
                            {/* Send someone a box of gift */}
                            Gift someone and make them smile
                        </Text>
                        <Pressable
                            onPress={() => {
                                // disp_ath()
                            }}
                            style={{ flexDirection: "row" }}
                        >
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.primary, marginRight: 3
                            }} size={iconSize} icon={faHeart} />
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.secondary,
                            }} size={iconSize} icon={faHeart} />
                        </Pressable>
                    </View>

                    <Divider />
                    <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{
                            color: '#FFF'
                        }}
                    />
                    <CategoriesComponent
                        setLoader={setLoader}
                        navigation={navigation}
                        disp_category={disp_category}
                        appState={appState}cvv
                    />

                    {/* <Documentary autoplay={false} />slidding ad banner */}

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_category: (payload) => dispatch(categories(payload)),
        disp_ath: () => dispatch(initAuth()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);



const style = StyleSheet.create({
    icons: {
        color: "rgb(146, 20, 12)",
    },
})