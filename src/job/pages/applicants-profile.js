import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
    Modal,
    BackHandler,
    ActivityIndicator,
    TouchableOpacity
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
    All_Events,
    surprise_state
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
// import { NoItems } from '../../utilities/404';
import { PrimaryButton } from '../../components/buttons/primary';
import { Style } from '../../../assets/styles';
import { DonationCard } from '../../events/components/campaign-card';
import { NotificationController } from '../models';
import { FetchMetaData } from '../../auth/models/auth-models';
import { Details } from '../../user/compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { NameDisplay } from '../../bcs-connect/components/name-display';
import { UserTitle } from '../../bcs-connect/components/title-display';
import { ImgBaseUrl } from '../../utilities';
import { GetApp_Campaigns } from '../../events/controllers/campaign-contrller';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function JobApplicants({ route, appState, disp_events }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const ViewUser = appState.ViewUser
    const navigation = useNavigation();
    const [annonymous, setannonymous] = useState(false)
    const [data, setData] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [supportRequestDrawer, setsupportRequestDrawer] = useState(false)
    const [drawerState, setdrawerState] = useState(0)
    const [loading, setLoading] = useState(false)
    const [Campaigns, setCampaigns] = useState([])
    const AllSurprises = appState.SurpriseState;
    const [reportAccount, setreportAccount] = useState(false)
    const [ReportText, setReportText] = useState("")
    useEffect(() => {
        // if (route.params) {
        //     //    console.log(route.params)
        //     setData(route.params.data)
        //     FetchUserDetails(route.params.data.phone)
        //     // console.log(route.params.data, "hello")
        // } else {
        //     console.log("No data")
        // }

        // setData(ViewUser)
        // console.log(ViewUser.meta.phone)
        console.log("parameter", route.params)
        FetchUserDetails(ViewUser.meta.phone.slice(-10))

        const handleBackButton = () => {
            if (drawerState != 0) {
                //     setBottomSheetVisible(false); 
                handleSnapPress(0)
                setdrawerState(0)
                console.log(drawerState)
                return true; // Prevent default back button behavior
            }
            return false; // Allow default back button behavior
        };

        // Add event listener when the component mounts
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Remove event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };


    }, [navigation, setData])



    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '90%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        setdrawerState(index)
    }, []);

    const handleSnapPress = useCallback((index) => {
        setdrawerState(index)
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

    const FetchUserDetails = (phone) => {
        setLoading(true)
        FetchMetaData(phone)
            .then(response => {
                if (response.error != null) { alert("Make sure you are connected to the internet") }
                console.log(response)
                setData(response.data[0])
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                alert("Make sure you are connected to the internet")
            })
    }

    const FetchPost = () => {
        GetApp_Campaigns({
            setLoading,
            setData: setCampaigns,
            handleSnapPress: handleSnapPress,
            setsupportRequestDrawer: setsupportRequestDrawer
        })
    }


    return (
        <>
            {loading == true ?
                <View style={{
                    marginTop: 23,
                    position: "absolute",
                    top: 1,
                    zIndex: 2100,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    // backgroundColor:"red",
                    width: "100%"
                }} >
                    <ActivityIndicator />
                </View>
                :

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
                                    src={data && `${ImgBaseUrl}/${data.img}`}
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
                                            <BackIcon NotPop style={{ marginRight: 20 }} />
                                            {/* <NotificationIcon /> */}
                                        </View>

                                        {
                                            data && data.img ?
                                                <Pressable onPress={() => {
                                                    setModalVisible(true)
                                                }} >
                                                    <Image
                                                        style={{
                                                            width: 100, height: 100, marginTop: 20,
                                                            borderRadius: 100,
                                                        }}
                                                        src={data && `${ImgBaseUrl}/${data.img}`}
                                                        resizeMode={'cover'} />
                                                </Pressable>

                                                :
                                                <Avatar.Text size={100} label={`${data && data.name.split(" ")[0][0]} ${data && data.name.split(" ")[1][0]}`} />

                                        }

                                        <View style={{ flexDirection: "column", flex: 1, alignItems: "center", }} >
                                            <Text style={[Style.boldText2, {
                                                marginTop: 10
                                            }]} >{data && <NameDisplay user={data} />}</Text>
                                            <Text style={Style.Text} >{data && <UserTitle User={data} />}</Text>
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

                                            <TouchableOpacity
                                                android_ripple={{ color: Colors.secondary }}
                                                onPress={() => {
                                                    FetchPost()

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

                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    Alert.alert("Coming Soon.", "When this feature is rolled out, you will be able to connect with", [
                                                        { title: "OK" }
                                                    ])

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

                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    setreportAccount(true)
                                                    handleSnapPress(1)
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

                                                    }} size={20} icon={faBriefcase} />
                                                </View>

                                                <Text style={{ color: Colors.grey }}>
                                                    Report Account
                                                </Text>

                                            </TouchableOpacity>


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
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                    }} >

                                        {/* <Text style={{ flex: 1, color: Colors.grey, textAlign: "center" }} >
                                        Keep your profile updated
                                    </Text> */}
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
                                    {/* <Divider style={{ marginTop: 20, marginBottom: 15 }} /> */}


                                    {/* Gender */}
                                    <Details data={data && data.meta.gender} icon={faUserAlt} />

                                    {/* state */}
                                    <Details data={data && data.state} icon={faGlobeAfrica} />

                                    {/* Phone */}
                                    <Details data={`+234-${data && data.meta.phone}`} icon={faPhoneAlt} />

                                    {/* Email */}
                                    <Details data={data && data.meta.email} icon={faEnvelope} />

                                    {/* <Pressable
                                    onPress={() => {
                                        navigation.navigate("Edit-profile");
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        flex: 3,
                                        justifyContent: "flex-start",
                                        paddingLeft: 20

                                    }} >
                                    <FontAwesomeIcon size={16} style={{
                                        flex: 1,
                                        color: Colors.primary,
                                        opacity: 0.8
                                        // margin: 20,
                                    }}
                                        icon={faDotCircle} />
                                    <Text style={[Style.Text, { marginLeft: 10, marginTop: -2 }]} >
                                        See your <Text style={{ fontWeight: 900, color: Colors.dark }} >About</Text> info
                                    </Text>
                                </Pressable> */}

                                    {/* Bethel */}
                                    {data && data.meta.bethel && <>
                                        <Details
                                            data={data && data.meta.bethel && data.meta.bethel}
                                            icon={faEnvelope} />

                                    </>}

                                    {/* Zome */}
                                    {data && data.meta.zone && <>
                                        <Details data={data && data.meta.zone && data.meta.zone}
                                            icon={faEnvelope}
                                        />

                                    </>}



                                    <Divider style={{ marginTop: 20, }} />



                                    {/* Fellowships */}
                                    <View style={{
                                        flexDirection: "row",
                                        flex: 3,
                                        justifyContent: "space-around",
                                        paddingLeft: 20,
                                        marginTop: 25,
                                        // marginBottom: 5,

                                    }} >
                                        <Text style={[Style.LabelText, {
                                            flex: 1,
                                            justifyContent: "flex-start",
                                        }]} >
                                            Fellowship(s)
                                        </Text>
                                        <View style={{
                                            justifyContent: "flex-end", marginRight: 15
                                        }} >


                                        </View>
                                    </View>
                                    {
                                        data && data.fellowship.filter(e => e.member == true).map((e, key) => {
                                            return <Certificates key={key} data={`${e.fellowship}`} icon={faCheckSquare} />
                                        })
                                    }




                                    {/* Education */}
                                    {
                                        data && data.study && data.study.length > 0 &&
                                        <>
                                            <View style={{
                                                flexDirection: "row",
                                                flex: 3,
                                                justifyContent: "flex-start",
                                                paddingLeft: 20,
                                                marginTop: 25,
                                                // marginBottom: 5,

                                            }} >
                                                <Text style={[Style.LabelText, {
                                                    flex: 1,
                                                    justifyContent: "flex-start",
                                                }]} >
                                                    Education
                                                </Text>
                                            </View>
                                            {
                                                data.study.map((e, key) => {
                                                    if (e.type == "highschool") {
                                                        return <Certificates key={key} data={`${e.school} (High school class of ${e.meta.class})`}
                                                            icon={faCheckSquare} />
                                                    } else {
                                                        if (e.isGraduate == true) {
                                                            return <Certificates key={key} data={`Studied ${e.course} at ${e.school} ( ${e.meta.fromYear} - ${e.meta.toYear} ) `}
                                                                icon={faCheckSquare} />
                                                        } else {
                                                            return <Certificates key={key} data={`Studying ${e.course} at ${e.school} ( since ${e.meta.fromYear}) `}
                                                                icon={faCheckSquare} />
                                                        }

                                                    }
                                                })
                                            }
                                        </>
                                    }


                                    {/* certificate */}

                                    {
                                        data && data.meta.certification && data.meta.certification.length > 0 && <>
                                            <View style={{
                                                flexDirection: "row",
                                                flex: 3,
                                                justifyContent: "flex-start",
                                                paddingLeft: 20,
                                                marginTop: 25,
                                                // marginBottom: 5,

                                            }} >
                                                <Text style={[Style.LabelText, {
                                                    flex: 1,
                                                    justifyContent: "flex-start",
                                                }]} >
                                                    Certification(s)
                                                </Text>
                                            </View>
                                            {data.meta.certification && data.meta.certification.map((e, key) => {
                                                return <Certificates key={key} data={`${e.certificate} - ${e.year}`} icon={faCheckSquare} />
                                            })}
                                        </>
                                    }



                                    {/* Skills */}

                                    {
                                        data && data.skills.length > 0 && <>
                                            <View style={{
                                                flexDirection: "row",
                                                flex: 3,
                                                justifyContent: "space-around",
                                                paddingLeft: 20,
                                                marginTop: 25,
                                                // marginBottom: 5,

                                            }} >
                                                <Text style={[Style.LabelText, {
                                                    flex: 1,
                                                    justifyContent: "flex-start",
                                                }]} >
                                                    Skill(s)
                                                </Text>
                                            </View>
                                            {data.skills.map((e, key) => {
                                                return <Certificates key={key} data={`${e}`} icon={faCheckSquare} />
                                            })}
                                        </>
                                    }

                                    <Divider style={{ marginTop: 20, }} />


                                    <View style={styles.centeredView}>
                                        <Modal
                                            animationType="fade"
                                            transparent={false}
                                            visible={modalVisible}
                                            onRequestClose={() => {
                                                // Alert.alert('Modal has been closed.');
                                                setModalVisible(!modalVisible);
                                            }}>

                                            <Image
                                                style={[styles.imageBackground, {
                                                    width: "95%", height: "95%",
                                                    // marginTop: 50,
                                                    borderRadius: 4,
                                                    marginLeft: "2.5%",
                                                    position: "relative",
                                                    top: "20%"
                                                }]}
                                                src={data && `${ImgBaseUrl}/${data.img}`}
                                                resizeMode={'cover'} />


                                            <View style={styles.centeredView}>

                                            </View>
                                        </Modal>
                                    </View>


                                    <PrimaryButton callBack={() => {
                                        handleSnapPress(1)
                                        setreportAccount(true)
                                    }}

                                        title="Accept Application"
                                        style={{ marginVertical: 30, marginLeft: "5%" }}
                                    />

                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </SafeAreaView >
            }

            <BottomSheet
                enablePanDownToClose
                ref={bottomSheetRef}
                index={0}
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
                            value={ReportText}
                            onChangeText={(value) => setReportText(value)}
                            style={{ width: "90%", marginLeft: "5%", height: 90, marginTop: 20, }}
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
                    </View>

                    <PrimaryButton style={{
                        width: "90%",
                        marginTop: "10%",
                        marginLeft: "5%",
                        textTransform: 'uppercase', marginBottom: 30

                    }}
                        callBack={() => {
                            if (ReportText.length < 5) {
                                alert("Give a valid message.")
                            } else {
                                Alert.alert("Success", "Message sent successfully", [
                                    { text: "Ok", onPress: () => { handleSnapPress(0); setReportText("") } }
                                ])
                            }
                        }} title={`Send`} />

                </View>
            </BottomSheet>
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
        disp_events: (payload) => dispatch(All_Events(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobApplicants);




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

    // =========================
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        // margin: 20,
        // backgroundColor: 'red',
        // borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "100%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});