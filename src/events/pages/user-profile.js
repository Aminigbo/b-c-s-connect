import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Divider, Avatar, TextInput } from 'react-native-paper';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Header from '../../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode, faSquare }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
    surprise_state
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
// import { NoItems } from '../../utilities/404';
import { PrimaryButton } from '../../components/buttons/primary';
import { Details } from '../components/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { Style } from '../../../assets/styles';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function ViewProfile({ route, appState, disp_surprise }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const navigation = useNavigation();
    const [annonymous, setannonymous] = useState(false)
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
        // GetUser()
        // if (route.params && route.params != undefined) {
        //     console.log(route.params)
        //     let routeParams = route.params.data
        // } else {
        //     console.log("No params")
        // }
    }, [setUserState])



    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    // renders
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );



    return (
        <>
            <SafeAreaView>
                <ScrollView>


                    <View style={{
                        borderRadius: 7,
                        flexDirection: "column",

                    }} >

                        <View style={{ width: '100%', }}>
                            <ImageBackground
                                opacity={0.4}
                                style={styles.imageBackground}
                                source={require('../../../assets/bg.jpg')}
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
                                        {/* <OpenDrawer style={{ marginRight: 20 }} /> */}
                                    </View>

                                    <Image
                                        style={{
                                            width: 100, height: 100, marginTop: 20,
                                            borderRadius: 100,
                                        }}
                                        // source={require('../../assets/user.png')}
                                        source={require('../../../assets/bg.jpg')}
                                        resizeMode={'cover'} />

                                    <View style={{ flexDirection: "column", flex: 1, alignItems: "center", }} >
                                        <Text style={[Style.boldText2 , { 
                                            marginTop: 10
                                        }]} >Aminigbo Paul</Text>
                                        <Text style={Style.Text} >aminigbopaul@gmail.com</Text>
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
                                            android_ripple={{ color: Colors.secondary }}
                                            onPress={() => {
                                                // navigation.navigate("Payments");
                                                navigation.navigate("Finance");
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

                                                }} size={20} icon={faMoneyBill} />
                                            </View>

                                            <Text style={{ color: Colors.grey }}>
                                                Request Support
                                            </Text>

                                        </Pressable>

                                        <Pressable
                                            // onPress={() => { navigation.navigate("Connect") }}
                                            onPress={() => {
                                                Alert.alert({
                                                    title:"Coming soon"
                                                })
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

                                                }} size={20} icon={faPeopleArrows} />
                                            </View>

                                            <Text style={{ color: Colors.grey }}>
                                                Connect
                                            </Text>

                                        </Pressable>

                                        <Pressable
                                            onPress={() => { navigation.navigate("Job") }}
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

                                                }} size={20} icon={faBriefcase} />
                                            </View>

                                            <Text style={{ color: Colors.grey }}>
                                                Report Account
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
                            // padding: 12,
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



                            <View
                                style={{
                                    paddingTop: 20,
                                }}
                            >
                                {/* <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                }} >

                                    <Text style={{ flex: 1, color: Colors.grey, textAlign: "center" }} >
                                        Keep your profile up to date for others to connect with you easily.
                                    </Text>
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
                                <Divider style={{ marginTop: 20, marginBottom: 15 }} /> */}


                                {/* Gender */}
                                <Details data="Male" icon={faUserAlt} />

                                {/* state */}
                                <Details data="Rivers state" icon={faGlobeAfrica} />

                                {/* Phone */}
                                <Details data="+234 7043 1505 59" icon={faPhoneAlt} />

                                {/* Email */}
                                <Details data="info.freetalker@gmail.com" icon={faEnvelope} />


                                <Divider style={{ marginTop: 20, }} />

                                {/* certificate */}
                                <View style={{
                                    flexDirection: "row",
                                    flex: 3,
                                    justifyContent: "flex-start",
                                    paddingLeft: 20,
                                    marginTop: 25,
                                    // marginBottom: 5,

                                }} >
                                    <Text style={Style.LabelText} >
                                        Certification(s)
                                    </Text>
                                </View>
                                <Certificates data="Advanced Product Management from Harvoxx Product School - 2011" icon={faCheckSquare} />
                                <Certificates data="Software Development and Management - 2021" icon={faCheckSquare} />


                                {/* Fellowships */}
                                <View style={{
                                    flexDirection: "row",
                                    flex: 3,
                                    justifyContent: "space-around",
                                    paddingLeft: 20,
                                    marginTop: 25,
                                    // marginBottom: 5,

                                }} >
                                    <Text style={[Style.LabelText, {  flex: 1,
                                        justifyContent: "flex-end",
                                    }]} >
                                        Fellowship(s)
                                    </Text>
                                </View>
                                <Certificates data="Association of Brotherhood Academic Scholars (ABAS)" icon={faCheckSquare} />


                                {/* Skills */}
                                <View style={{
                                    flexDirection: "row",
                                    flex: 3,
                                    justifyContent: "space-around",
                                    paddingLeft: 20,
                                    marginTop: 25,
                                    // marginBottom: 5,

                                }} >
                                    <Text style={[Style.LabelText,{flex: 1,
                                        justifyContent: "flex-end",
                                    }]} >
                                        Skill(s)
                                    </Text>
                                </View>
                                <Certificates data="Legal Drafting" icon={faCheckSquare} />
                                <Certificates data="Crane Operation" icon={faCheckSquare} />
                                <Certificates data="Wall screeding" icon={faCheckSquare} />

                                <Divider style={{ marginTop: 20, }} />
                                <Text style={{
                                    fontSize: 14, color: Colors.grey, flex: 1,
                                    margin: 20, textAlign: "center"
                                }} >
                                    Tell us what you know about this user
                                </Text>
                                <PrimaryButton callBack={() => {
                                    handleSnapPress(1)
                                }} title="Tell us more"
                                    style={{ marginBottom: 20, marginLeft: "5%" }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomSheet
                    enablePanDownToClose
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    onChange={handleSheetChanges}
                >

                    <View style={styles.content}>
                        <View style={{ width: "100%", justifyContent: "flex-start" }} >
                            <Text style={{ marginLeft: 20, color: Colors.dark }}>Drop a message</Text>
                            <TextInput
                                // keyboardType='numeric'
                                // autoFocus
                                // onChangeText={(value) => setData({ ...data, email: value })}
                                style={{ width: "90%", marginLeft: "5%",height:90, marginTop: 20,  }}
                                textColor={Colors.dark}
                                theme={{
                                    colors: {
                                        primary: Colors.dark,
                                        background: 'white',
                                        placeholder: "red",
                                    },
                                    roundness: 8,
                                }}
                                mode="outlined"
                                multiline
                                // label="Enter amount"
                            />
                            <View style={{
                                width: "90%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // backgroundColor: "red",
                                marginLeft: "5%", marginTop: 16
                            }} >
                                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                                    Stay annonymously?
                                </Text>

                                {annonymous == true ?
                                    <Pressable
                                        onPress={() => {
                                            setannonymous(false)
                                        }}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon size={23} style={{
                                            // flex: 1,
                                            color: Colors.primary,
                                            // opacity: 0.8,
                                            marginLeft: 10
                                            // margin: 20,
                                        }}
                                            icon={faCheckSquare} />
                                    </Pressable>
                                    :
                                    <Pressable
                                        onPress={() => {
                                            setannonymous(true)
                                        }}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon size={23} style={{
                                            // flex: 1,
                                            color: Colors.lightgrey,
                                            // opacity: 0.8,
                                            marginLeft: 10
                                            // margin: 20,
                                        }}
                                            icon={faSquare} />
                                    </Pressable>}


                            </View>
                        </View>

                        <PrimaryButton style={{
                            width: "90%",
                            marginTop: "5%",
                            marginLeft:"5%",
                            textTransform: 'uppercase', marginBottom: 30

                        }}
                            callBack={() => { handleSnapPress(1) }} title={`Report account`} />




                    </View>

                </BottomSheet>
            </SafeAreaView >
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);




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