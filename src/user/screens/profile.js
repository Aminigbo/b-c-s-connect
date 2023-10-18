import {
    StyleSheet,
    View,
    Text,
    Pressable, BackHandler,
    Image, Dimensions, ImageBackground,
    StatusBar,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode, faPlusSquare, faImage, faClose, faCheckCircle, faRemove, faPerson, faUser }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, NotificationIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import { user_state } from "../../redux";
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import { PrimaryButton } from '../../components/buttons/primary';
import { Details } from '../compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { Style } from '../../../assets/styles';
import { AppStatusBar } from '../../components/status-bar';
import { NameDisplay } from '../../bcs-connect/components/name-display';
import { UserTitle } from '../../bcs-connect/components/title-display';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { supabase } from '../../config/supabase';
import { UpdateUserMetaController } from '../controllers/user-controller';
import { ManagePhoto } from '../models/user-model';

const { height, width } = Dimensions.get('window');
const Colors = Color()

function Profile({ route, appState, disp_user }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const [drawerState, setdrawerState] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [previewDPchnage, setpreviewDPchnage] = useState({
        status: false
    })
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [imageUri, setImageUri] = useState(null);
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

        

    }, [navigation, drawerState])




    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['1%', '28%', "35%"], []);

    // callbacks when the drawer is closed or open
    const handleSheetChanges = useCallback((index) => {
        // if (index == -1) {
        //     handleSnapPress(0)
        //     // setDrawerType("IDLE")
        //     setsearch(false)
        // }

        // if (index == 0) {
        //     // setDrawerType("IDLE")
        //     setsearch(false)
        // }
        setdrawerState(0);
    }, []);

    // show the overlay from the bottom drawer
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

    // control bottom drawer hide and show
    const handleSnapPress = useCallback((index) => {
        setdrawerState(index)
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const SelectPhoto = () => {
        setpreviewDPchnage({
            status: true
        })
        const options = {
            storageOptions: {
                path: "images",
                mediaType: "photo"
            },
            includeBase64: true,
            quality: 0.7
        }
        launchImageLibrary(options, response => {
            // console.log("ResponseXX", response.assets.id)

            if (response.didCancel) {
                setpreviewDPchnage({
                    status: true
                })
                handleSnapPress(0) // hide bottom drawer
            } else if (response.error) {

            } else if (response.customButton) {
                console.log(response.customButton)
            } else {
                const source = {
                    uri: response.assets[0].uri
                }

                const fileExt = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf(".") + 1);
                const fileName = `${Math.random()}.${fileExt}`;
                var formData = new FormData();
                formData.append("files", {
                    uri: response.assets[0].uri,
                    name: fileName,
                    type: `image/${fileExt}`
                })

                handleSnapPress(2)
                setpreviewDPchnage({
                    source,
                    fileName,
                    formData,
                    height: response.assets[0].height,
                    width: response.assets[0].width,
                    status: true
                })

            }
        })
    }

    // save photo to supabase
    const SaveDp = () => {
        setLoading(true)

        // upload image
        supabase.storage
            .from("images")
            .upload(previewDPchnage.fileName, previewDPchnage.formData)
            .then(response => {
                let Img = response.data.path;

                // chhange the user's image name in the users'public table
                ManagePhoto({
                    userPhone: User.phone,
                    data: Img
                })
                    .then(res => {
                        if (res.error != null) {
                            alert("An error occured")
                            setLoading(false)
                            console.log(res)
                        } else {

                            // chnge the image name in the user state
                            disp_user({
                                ...User,
                                img: Img
                            })
                            handleSnapPress(0);
                            setpreviewDPchnage(false);
                            setLoading(false)

                            // delete the previous image name 
                            supabase.storage
                                .from("images")
                                .remove([User.img])
                                .then(response => {
                                    console.log("Deleted old photo")
                                })
                        }
                    })
                    .catch(error => {
                        alert("An error occured")
                        setLoading(false)
                        console.log(error)
                    })

            })
    }

    // RemoveProfilePicture
    function RemoveProfilePicture() {
        supabase.storage
            .from("images")
            .remove([User.img])
            .then(response => {
                ManagePhoto({
                    userPhone: User.phone,
                    data: null
                })
                    .then(res => {
                        if (res.error != null) {
                            alert("An error occured")
                            setLoading(false)
                        } else {
                            setLoading(false)
                            handleSnapPress(0);
                            setpreviewDPchnage(false);
                            disp_user({
                                ...User,
                                img: null
                            })
                        }
                    })
                    .catch(error => {
                        alert("An error occured")
                        setLoading(false)
                    })

            })
    }

    return (
        <>
            {console.log(User.meta)}
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.light }}>
                <AppStatusBar StatusBar={StatusBar} useState={useState} />

                <ScrollView>


                    <View style={{
                        borderRadius: 7,
                        flexDirection: "column",

                    }} >

                        <View style={{ width: '100%', }}>

                            <ImageBackground
                                opacity={0.4}
                                style={styles.imageBackground}
                                src={User && `https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/${User.img}`}
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
                                        <BackIcon style={{ marginRight: 20 }} />
                                        {/* <NotificationIcon /> */}
                                    </View>

                                    {
                                        User && User.img ?
                                            <Pressable onPress={() => {
                                                // setModalVisible(true)
                                                handleSnapPress(1)
                                                setdrawerState(1)
                                                setpreviewDPchnage({
                                                    status: false
                                                })
                                            }} >

                                                <Image
                                                    style={{
                                                        width: 130,
                                                        height: 130,
                                                        marginTop: 20,
                                                        borderRadius: 100,
                                                    }}
                                                    src={`https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/${User.img}`}
                                                    resizeMode={'cover'} />
                                            </Pressable>

                                            :
                                            <Pressable onPress={() => { SelectPhoto() }} >
                                                <Avatar.Text size={100} label={`${User.name.split(" ")[0][0]} ${User.name.split(" ")[1][0]}`} />
                                            </Pressable>

                                    }




                                    <View style={{ flexDirection: "column", flex: 1, alignItems: "center", }} >
                                        <Text style={[Style.boldText2, {
                                            marginTop: 10
                                        }]} ><NameDisplay user={User} /> </Text>
                                        <Text style={Style.Text} > <UserTitle User={User} /> </Text>
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
                                        flex: 1, 

                                    }} >
                                        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
                                        <Pressable
                                            onPress={() => { navigation.navigate("QR") }}
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

                                                }} size={20} icon={faQrcode} />
                                            </View>

                                            <Text style={{ color: Colors.grey }}>
                                                QR Auth
                                            </Text>

                                        </Pressable>

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
                                                Payments
                                            </Text>

                                        </Pressable>

                                        <Pressable
                                            // onPress={() => { navigation.navigate("Connect") }}
                                            onPress={() => { navigation.navigate("BCS-Connect") }}

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
                                                BCS-Connect
                                            </Text>

                                        </Pressable>

                                        <Pressable
                                            onPress={() => { navigation.navigate("Jobs") }}
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
                                                Job Arena
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
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                }} >

                                    <Text style={{ flex: 1, color: Colors.grey, textAlign: "center" }} >
                                        Keep your profile updated
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
                                <Divider style={{ marginTop: 20, marginBottom: 15 }} />


                                {/* Gender */}
                                <Details data={User.meta.gender} icon={faUserAlt} />

                                {/* state */}
                                <Details data={User.state} icon={faGlobeAfrica} />

                                {/* Phone */}
                                <Details data={`+234-${User.meta.phone}`} icon={faPhoneAlt} />

                                {/* Email */}
                                <Details data={User.meta.email} icon={faEnvelope} />

                                <Pressable
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
                                </Pressable>

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
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Finance', { screen: 'Save-fellowship' });
                                        }}
                                        style={{
                                            justifyContent: "flex-end", marginRight: 15, flexDirection: "row"
                                        }} >

                                        <FontAwesomeIcon size={20} style={{
                                            flex: 1,
                                            color: Colors.primary,
                                            opacity: 0.8
                                            // margin: 20,
                                        }}
                                            icon={faPlusSquare} />
                                        {/* <Text>Add</Text> */}
                                    </TouchableOpacity>
                                </View>
                                {
                                    User.fellowship.map((e, key) => {
                                        return <Certificates key={key} data={`${e.fellowship}`} icon={faCheckSquare} />
                                    })
                                }




                                {/* Education */}
                                {
                                    User.study.length > 0 &&
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
                                            User.study.map((e, key) => {
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
                                    User.meta.certification && User.meta.certification.length > 0 &&
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
                                                Certification(s)
                                            </Text>
                                        </View>
                                        {
                                            User.meta.certification.map((e, key) => {
                                                return <Certificates key={key} data={`${e.certificate} from ${e.institution} - ${e.year}`}
                                                    icon={faCheckSquare} />
                                            })
                                        }
                                    </>
                                }




                                {/* Skills */}
                                {
                                    User.skills.length > 0 &&

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
                                        {/* <View style={{
                                        justifyContent: "flex-end", marginRight: 15
                                    }} >

                                        <Text style={[Style.TextLink, {
                                            flex: 1,
                                            justifyContent: "flex-end",
                                        }]} >
                                            Manage
                                        </Text>
                                    </View> */}
                                    </View>
                                }
                                {
                                    User.skills.map((e, key) => {
                                        return <Certificates key={key} data={`${e}`} icon={faCheckSquare} />
                                    })
                                }

                                <Divider style={{ marginTop: 20, }} />
                                <Text style={[Style.Text, {
                                    flex: 1,
                                    margin: 20, textAlign: "center"
                                }]} >
                                    Tell us what has changed about you.
                                </Text>
                                <PrimaryButton callBack={() => {
                                    navigation.navigate("Edit-profile");
                                }} title="Manage your profile"
                                    style={{ marginBottom: 20, marginLeft: "5%" }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >

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
                        src={`https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/${User && User.img}`}
                        resizeMode={'cover'} />


                    <View style={styles.centeredView}>

                    </View>
                </Modal>
            </View>


            <BottomSheet
                enablePanDownToClose={false}
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >

                {/* SHow image preview when you try to update profile picture */}
                {previewDPchnage.status == true ? <>

                    <View style={{
                        // backgroundColor: "red",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} >

                        <ImageBackground
                            opacity={0.9}
                            style={[styles.imageBackground, {
                                width: "100%",
                                flex: 1,
                                justifyContent: "center"
                            }]}
                            source={previewDPchnage.source}
                        >
                            <View style={[styles.overlay,
                            { justifyContent: "center", alignItems: "center", flex: 1, paddingVertical: 30 }]}>

                                {loading == true ? <ActivityIndicator style={{
                                    marginBottom: 40
                                }} />
                                    :
                                    <Image
                                        style={[{
                                            width: "100%",
                                            // height: 886/3,
                                            // aspectRatio: previewDPchnage.width / previewDPchnage.height,
                                            width: 100,
                                            height: 100,
                                            borderRadius: 100,
                                            marginBottom: 20,
                                        }]}
                                        source={previewDPchnage.source}
                                        resizeMode={'cover'} />
                                }
                            </View>
                        </ImageBackground>


                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingVertical: 20
                        }}>
                            <Pressable
                                android_ripple={{ color: Colors.primary }}
                                onPress={() => {
                                    if (loading == false) {
                                        setpreviewDPchnage({
                                            status: false
                                        })
                                    }
                                }}
                                style={[{
                                    // backgroundColor:Colors.lightgrey,
                                    height: 46,
                                    // width: "90%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // elevation: 2,
                                    borderRadius: 9,
                                    paddingHorizontal: 10,
                                    // marginLeft:"5%"
                                },]}>
                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.primary,
                                    opacity: loading == true ? 0.3 : 1
                                }} size={17} icon={faClose} />
                                <Text style={{
                                    color: Colors.grey,
                                    marginLeft: 10,
                                    opacity: loading == true ? 0.3 : 1
                                }} >
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                android_ripple={{ color: Colors.primary }}
                                onPress={() => {
                                    if (loading == false) {
                                        SelectPhoto()
                                    }
                                }}
                                style={[{
                                    // backgroundColor:Colors.lightgrey,
                                    height: 46,
                                    // width: "90%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // elevation: 2,
                                    borderRadius: 9,
                                    paddingHorizontal: 10,
                                    // marginLeft:"5%"
                                },]}>
                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.dark,
                                    opacity: loading == true ? 0.3 : 1
                                }} size={17} icon={faImage} />
                                <Text style={{
                                    color: Colors.grey,
                                    marginLeft: 10,
                                    opacity: loading == true ? 0.3 : 1
                                }} >
                                    Change
                                </Text>
                            </Pressable>

                            <TouchableOpacity
                                android_ripple={{ color: Colors.primary }}
                                onPress={() => {
                                    if (loading != true) {
                                        SaveDp()
                                    }
                                }}
                                style={[{
                                    // backgroundColor:Colors.lightgrey,
                                    height: 46,
                                    // width: "90%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // elevation: 2,
                                    borderRadius: 9,
                                    paddingHorizontal: 10,
                                    // marginLeft:"5%"
                                },]}>
                                {loading != true ?
                                    <FontAwesomeIcon style={{
                                        flex: 1,
                                        color: "mediumseagreen",
                                    }} size={17} icon={faCheckCircle} /> :
                                    <ActivityIndicator />
                                }
                                <Text style={{
                                    color: Colors.grey,
                                    marginLeft: 10
                                }} >
                                    Save
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                </> :
                    <View>
                        <TouchableOpacity
                            onPress={() => {

                                if (loading == false) {
                                    setModalVisible(true)
                                    handleSnapPress(0)

                                }
                            }}
                            android_ripple={{ color: Colors.secondary }}
                            style={{
                                // justifyContent: "center",
                                alignItems: "center",
                                margin: 15,
                                flexDirection: "row",
                                // backgroundColor: "grey"
                                opacity: loading == true ? 0.3 : 1
                            }} >

                            <View

                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 1,
                                    backgroundColor: Colors.lightgrey,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 20
                                }} >
                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.primary,

                                }} size={20} icon={faUser} />
                            </View>

                            <Text style={[{ color: Colors.grey }, Style.boldText]}>
                                See profile picture
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                if (loading == false) {
                                    SelectPhoto()

                                }
                            }}
                            android_ripple={{ color: Colors.secondary }}
                            style={{
                                // justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 15,
                                flexDirection: "row",
                                opacity: loading == true ? 0.3 : 1
                                // backgroundColor: "grey"
                            }} >

                            <View

                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 1,
                                    backgroundColor: Colors.lightgrey,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 20
                                }} >
                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.primary,

                                }} size={20} icon={faImage} />
                            </View>

                            <Text style={[{ color: Colors.grey }, Style.boldText]}>
                                Change profile picture
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                if (loading == false) {
                                    setLoading(true)
                                    RemoveProfilePicture()
                                }
                            }}
                            android_ripple={{ color: Colors.secondary }}
                            style={{
                                // justifyContent: "center",
                                alignItems: "center",
                                margin: 15,
                                flexDirection: "row",
                                opacity: loading == true ? 0.3 : 1
                                // backgroundColor: "grey"
                            }} >

                            <View

                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 1,
                                    backgroundColor: Colors.lightgrey,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 20
                                }} >
                                {loading == true ?
                                    <ActivityIndicator color={Colors.primary} /> :
                                    <FontAwesomeIcon style={{
                                        flex: 1,
                                        color: Colors.primary,

                                    }} size={20} icon={faRemove} />}
                            </View>

                            <Text style={[{ color: Colors.grey }, Style.boldText]}>
                                Remove profile picture
                            </Text>

                        </TouchableOpacity>

                    </View>
                }


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
        disp_user: (payload) => dispatch(user_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);




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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
});
