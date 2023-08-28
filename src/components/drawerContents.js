import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import { Color } from './theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { faAdd, faBookBible, faBookOpen, faBookOpenReader, faBriefcase, faCheckCircle, faChevronRight, faDonate, faEnvelopeSquare, faGear, faLock, faMessage, faMoneyBill, faPlusSquare, faSearch, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { isAuth } from '../auth/models/auth-models';
import { Style } from '../../assets/styles';
import { FadedIcon } from './fadedIcon';
import { ImgBaseUrl } from '../utilities';


export function HelloFriday() {
    const Colors = Color()
    const navigation = useNavigation();
    const closeDrawer = () => navigation.dispatch(DrawerActions.closeDrawer());
    const [auth, setAuth] = useState()
    const [User, setUser] = useState()
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            isAuth()
                .then(res => {
                    // console.log(res, "Drawer")
                    // console.log(res)
                    if (res == null) {
                        setAuth(false);
                        console.log("Not authenticated")
                    } else {
                        setUser(JSON.parse(res))
                        console.log("Authenticated")
                        setAuth(true)
                    }
                })
            // console.log(User)
        });

        return unsubscribe;
    }, [navigation])

    return (
        <>
            <ScrollView style={{ backgroundColor: Colors.light, }}>

                <View
                    style={{
                        marginTop: 50,

                        padding: 12,
                        // flex: 1,
                        // justifyContent: 'center',
                        // alignItems: "center"
                    }}
                >




                    {auth == false ? <>
                        <FadedIcon />
                    </> : <>
                        <Pressable
                            onPress={() => {
                                closeDrawer();
                                navigation.navigate("Profile");
                            }}
                        >
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                // marginTop: 10
                            }} >
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center", alignContent: "center"
                                }} >

                                    {
                                        User && User.img ?
                                            <Image
                                                style={[{
                                                    width: 40, height: 40,
                                                    // marginTop: 10,
                                                    borderRadius: 10,
                                                }]}
                                                // source={require('../../assets/user.png')}
                                                // source={require('../../../assets/img2.jpg')}
                                                // source={require('@expo/snack-static/react-native-logo.png')}
                                                src={`${ImgBaseUrl}/${User.img}`}
                                                resizeMode={'cover'} />
                                            :
                                            <Avatar.Text size={40} label={`${User && User.name.split(" ")[0][0]} ${User && User.name.split(" ")[1][0]}`} />
                                    }

                                </View>

                                <View style={{ flex: 4 }} >
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                    }} >
                                        <Text style={[Style.boldText, {}]} >
                                            @{User && User.name.split(" ")[0]}

                                        </Text>
                                        {User && User.role && User.role.verified == true &&
                                            <FontAwesomeIcon style={{
                                                flex: 1,
                                                color: Colors.primary,
                                                marginLeft: 10

                                            }} size={15} icon={faCheckCircle} />}
                                    </View>
                                    <Text style={[Style.Text, { marginTop: 4 }]}>
                                        {User && User.meta.email}
                                    </Text>
                                </View>


                            </View>
                        </Pressable>
                    </>}
                </View>




                <Divider style={{ marginBottom: 30, marginTop: 30, }} />

                {/* Find brethren */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.navigate("BCS-Connect");
                            closeDrawer();
                        }

                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }} icon={faSearch} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Find Brethren</Text>
                </Pressable>

                {/* <Divider style={{}} /> */}

                {/* BCS events */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.navigate("BCS-Events");
                            closeDrawer();
                        }
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }} icon={faBookOpenReader} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>BCS Events</Text>
                </Pressable>

                {/* <Donation /> */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.navigate("Donation Campaign");
                            closeDrawer();
                        }
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }} icon={faDonate} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Donation campaigns</Text>
                </Pressable>


                {/* <Job /> */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.navigate("Jobs");
                            closeDrawer();
                        }
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }} icon={faBriefcase} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Job Arena</Text>
                </Pressable>

                {/* Finance */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.navigate("Finance");
                            closeDrawer();
                        }
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }} icon={faMoneyBill} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Manage finance</Text>
                </Pressable>

                {/* <Divider /> */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            // navigation.navigate('Accounts', { screen: 'Add-Bethel' });
                            navigation.navigate("Add-Bethel");
                            closeDrawer();
                        }
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}

                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }}
                        icon={faAdd} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Add a Bethel</Text>
                </Pressable>


                {/* <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        // navigation.navigate("LET'S TALK");
                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}

                >
                    <FontAwesomeIcon size={18} style={{ flex: 3 }}
                        icon={faMessage} />
                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1 }]}>Talk To Us</Text>
                </Pressable> */}


                {/* <Divider /> */}
                <Pressable
                    android_ripple={{ color: Colors.secondary }}
                    onPress={() => {
                        if (auth == false) {
                            navigation.replace("Auth");
                        } else {
                            navigation.replace('Auth', { screen: 'Logout' });
                        }
                        closeDrawer();

                    }}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 17,
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        // backgroundColor: Colors.secondary
                    }}
                >


                    {auth == true ? <FontAwesomeIcon size={18} color={Colors.primary} style={{ flex: 3 }}
                        icon={faSignOut} /> :
                        <FontAwesomeIcon size={18} color={Colors.primary} style={{ flex: 3 }}
                            icon={faSignIn} />}



                    <Text style={[Style.boldText, { marginLeft: 20, flex: 1, color: auth == false ? "black" : Colors.primary }]}>
                        {auth == false ? "Login" : "Logout"}
                        {/* Login */}
                    </Text>

                </Pressable>


                <Divider style={{ marginBottom: 30, marginTop: 30, }} />


            </ScrollView>
            <View style={{
                backgroundColor: Colors.light,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                // backgroundColor: "red",

            }} >
                <Text style={[Style.LabelText, { fontSize: 13 }]} >
                    POWERED BY ABAS RIVERS STATE
                </Text>
            </View>
        </>
    )
}

