import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions,
    ImageBackground,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Divider, Avatar, TextInput } from 'react-native-paper';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Header from '../../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode, faSquare, faSquareCheck, faArrowLeftLong, faAddressBook, faAddressCard, faEdit, faTimes, faPlusSquare }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader, LoaderComponent, LoaderIcon } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import {
    surprise_state, user_state
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { NoItems } from '../../utilities/404';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Details } from '../compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { Style } from '../../../assets/styles';
import { NameDisplay } from '../../bcs-connect/components/name-display';
import { UserTitle } from '../../bcs-connect/components/title-display';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Add_study } from '../compnents/manage-study';
import { HighschoolCollegeComponent } from '../compnents/add-college-highrschool';
import { AddBethel } from '../compnents/add-bathe-zone-component';
import { AddCertComponent } from '../compnents/add-cert';
import { AddUser_meta } from '../models/user-model';
import { EditStudy } from '../controllers/manage-study';
import { color } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const Colors = Color()

function EditProfile({ route, appState, disp_surprise, disp_user }) {
    const [userState, setUserState] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDelete, setItemToDelet] = useState({
        type: "",
        data: {}
    })
    const User = appState.User;
    const navigation = useNavigation();
    // const [years, setyears] = useState([])
    const GetUser = () => {
        if (User == undefined) {
            isAuth().then(res => {
                // console.log(res)
                if (res == false) return navigation.pop()
                setUserState(res)
            })
        } else {
            setUserState(User)
        }
    }
    const AllSurprises = appState.SurpriseState;
    useEffect(() => {

    }, [setUserState])


    // Get the current timestamp
    // const currentTimestamp = Date.now();
    // // Calculate the timestamp for 5 days from now (in milliseconds)
    // const fiveDaysFromNow = currentTimestamp + (5 * 24 * 60 * 60 * 1000);
    // const [date, setDate] = useState(new Date());
    // const [show, setShow] = useState(false);
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setShow(false);
    //     setDate(currentDate);
    //     console.log(currentDate)
    // };

    const [year, setYear] = useState(new Date().getFullYear());
    const [showPicker, setShowPicker] = useState(false);

    const showYearPicker = () => {
        setShowPicker(true);
    };

    const handlePickerConfirm = () => {
        setShowPicker(false);
        // handle the selected year
        // console.log(year);
    };

    const handlePickerCancel = () => {
        setShowPicker(false);
    };

    const years = Array.from({ length: 100 }, (_, index) => {
        const currentYear = new Date().getFullYear();
        return currentYear - index;
    });




    let AllDonations = ""
    let AllDuesReg = ""
    let AllTithe = ""

    if (User.meta.finance) {
        AllDonations = User.meta.finance.filter(e => e.type == "DONATION")
        AllDuesReg = User.meta.finance.filter(e => e.type == "DUES/REG")
        AllTithe = User.meta.finance.filter(e => e.type == "TITHE")
    } else {
        AllDonations = ""
        AllDuesReg = ""
        AllTithe = ""
    }

    // determine the infor you want to update
    const [updateComponent, setUpdateComponent] = useState("")
    const [loading, setloading] = useState(false)
    const [data, setData] = useState({
        type: "COLLEGE"
    });
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [selectedValue, setselectedValue] = useState("Dues")
    const handleFilter = (searchWord) => {
        const newFilter = Brethren.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };



    // ref
    const bottomSheetRef = useRef(null);
    const scrollViewRef = useRef();
    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
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


    // function to delete either collage, high school, certification
    // or skills
    function Delete() {
        let findIndex = User.study.findIndex(e => e.course == itemToDelete.data.course && e.school == itemToDelete.data.school)
        User.study.splice(findIndex, 1)
        // console.log(User.study.length)
        disp_user({
            ...User,
            study: User.study
        })
        const payload = {
            setloading,
            User,
            Alert,
            setModalVisible
        }
        EditStudy(payload)
    }

    // function to delete certificatioons
    function DeleteCert(payload) {
        // console.log(payload)
        setloading(true)
        let FindIndex = User.meta.certification.findIndex(e => e.certificate == payload.certificate && e.institution == payload.institution)
        User.meta.certification.splice(FindIndex, 1)
        New_meta = {
            ...User.meta,
            certification: User.meta.certification,
        }
        disp_user({
            ...User,
            meta: User.meta,
            // gender:"male",
            // phone:"7043150559",
            // email:"info.freetalker@gmail.com",
            certification: User.meta.certification
        })

        const payloadX = {
            data: New_meta,
            user: User.phone
        }

        AddUser_meta(payloadX)
            .then(res => {
                setloading(false)
                Alert.alert("Success", `Deleted succesfully`,
                    [{ text: "Close", onPress: () => { setModalVisible(false) } }]
                );
            })


    }


    const handleScrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <>

            {/* {loading == true && <LoaderComponent />} */}
            <SafeAreaView>
                <ScrollView ref={scrollViewRef} >


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
                                        <BackIcon />
                                    </View>

                                    <View style={{ flexDirection: "column", flex: 1, alignItems: "center", }} >
                                        <Text style={[Style.boldText2, {
                                            marginTop: 10
                                        }]} ><NameDisplay user={User} /> </Text>
                                        <Text style={[Style.Text]} >
                                            <UserTitle User={User} />
                                        </Text>
                                        {/* <Text style={{
                                                textAlign: " ",
                                                color: "grey",
                                                fontWeight: 900,
                                                fontSize: 16,
                                                flex: 1,
                                            }} >*******{userState.phone.slice(-4)}</Text> */}
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
                                    marginBottom: 30
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    flexDirection: "column",
                                }} >
                                    {loading == true && <ActivityIndicator />}

                                    <Text style={[Style.Text, { flex: 1, textAlign: "center" }]} >
                                        Keep your profile updated.
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

                                {/* Bethel */}
                                <Details
                                    data={User.meta.bethel ? User.meta.bethel : "Add your bethel"}
                                    icon={faEnvelope}
                                    add
                                    add_callback={() => {
                                        // navigation.navigate("Add-details", {
                                        //     type: "Bethel"
                                        // });
                                        setModalVisible(true)
                                        setUpdateComponent("BETHEL")
                                    }} />

                                {/* Zome */}
                                <Details data={User.meta.zone ? User.meta.zone : "Add your zone"}
                                    icon={faEnvelope}
                                    add
                                    add_callback={() => {
                                        setModalVisible(true)
                                        setUpdateComponent("ZONE")
                                    }}
                                />



                                <Divider style={{ marginTop: 20, }} />

                                {/* Finance */}
                                <View style={{
                                    flexDirection: "row",
                                    flex: 3,
                                    justifyContent: "space-around",
                                    paddingLeft: 20,
                                    marginTop: 30,
                                    marginBottom: 5,

                                }} >
                                    <Text style={[Style.Text, {
                                        flex: 1,
                                        justifyContent: "flex-end",
                                    }]} >
                                        Finance
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate("Finance")
                                        }}
                                        style={{
                                            justifyContent: "flex-end", marginRight: 15
                                        }} >

                                        <Text style={[Style.TextLink, {
                                            flex: 1,
                                            justifyContent: "flex-end",
                                        }]} >
                                            Make payment
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={{
                                    marginTop: 7,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    // marginVertical: 10, 
                                    justifyContent: "space-between",
                                    flex: 1,
                                    // backgroundColor:"red"

                                }} >
                                    {
                                        [
                                            { count: AllDuesReg.length, title: "Reg/Dues" },
                                            { count: AllTithe.length, title: "Tithe" },
                                            { count: AllDonations.length, title: "Donations" }
                                        ].map((e, index) => {
                                            return (
                                                <>
                                                    <Pressable
                                                        key={index}
                                                        onPress={() => {
                                                            // console.log(appState.User.meta)
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
                                                                backgroundColor: Colors.lightgrey,
                                                                paddingVertical: 8,
                                                                paddingHorizontal: 8,
                                                                borderRadius: 20,
                                                                height: 40,
                                                                width: 40,
                                                                justifyContent: "center",
                                                                alignItems: "center"

                                                            }} >
                                                            <Text style={{ color: Colors.primary }} >{e.count}</Text>
                                                        </View>

                                                        <Text style={[Style.LabelText, { textAlign: "center" }]}>
                                                            {e.title}
                                                        </Text>

                                                    </Pressable>
                                                </>

                                            )
                                        })
                                    }

                                </View>


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
                                    User.fellowship.map((e, index) => {
                                        return <Certificates key={index} data={`${e.fellowship}`} approved={e.approved} icon={faCheckSquare} />
                                    })
                                }

                                {/* <TouchableOpacity
                                    onPress={() => { 
                                        navigation.navigate('Finance', { screen: 'Save-fellowship' });
                                    }}

                                    style={{
                                        justifyContent: "center",
                                        height: 99,
                                        alignItems: "center",
                                        padding: 20,
                                        width: "90%",
                                        marginLeft: "5%",
                                        backgroundColor: Colors.lightgrey,
                                        marginTop: 10,
                                    }}
                                >
                                    <FontAwesomeIcon size={36} style={{
                                        flex: 1,
                                        color: Colors.grey,
                                        opacity: 0.8
                                        // margin: 20,
                                    }}
                                        icon={faEdit} />
                                    <Text style={[Style.TextLink, {
                                        flex: 1,
                                        justifyContent: "flex-end",
                                    }]} >
                                        Add new fellowship
                                    </Text>
                                </TouchableOpacity> */}



                                {/* Education */}
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
                                        Education
                                    </Text>
                                    {User.study.length > 1 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(true)
                                                setData({
                                                    ...data, type: "COLLEGE"
                                                })
                                                setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                            }}
                                            style={{
                                                justifyContent: "flex-end", marginRight: 15
                                            }} >

                                            <Text style={[Style.TextLink, {
                                                flex: 1,
                                                justifyContent: "flex-end",
                                            }]} >
                                                Manage
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                                {
                                    User.study.map((e, index) => {
                                        if (e.type == "highschool") {
                                            return <Certificates key={index} data={`${e.school} (High school class of ${e.meta.class})`}
                                                icon={faCheckSquare} iconX={faTimes}
                                                iconXCallback={() => {
                                                    // console.log(e)
                                                    setItemToDelet({
                                                        ...itemToDelete,
                                                        type: "COLLEGE",
                                                        data: e
                                                    })
                                                    // handleSnapPress(1)
                                                    Alert.alert("Alert", `Proceed to delete ${e.school}`,
                                                        [
                                                            { text: "Close" },
                                                            {
                                                                text: "Delete",
                                                                onPress: () => { handleScrollToTop(); Delete() },
                                                                color: Colors.primary
                                                            }
                                                        ]
                                                    );
                                                }} />
                                        } else {
                                            if (e.isGraduate == true) {
                                                return <Certificates key={index} data={`Studied ${e.course} at ${e.school} ( ${e.meta.fromYear} - ${e.meta.toYear} ) `}
                                                    icon={faCheckSquare} iconX={faTimes}
                                                    iconXCallback={() => {
                                                        // console.log(e)
                                                        // handleSnapPress(1)
                                                        setItemToDelet({
                                                            ...itemToDelete,
                                                            type: "COLLEGE",
                                                            data: e
                                                        })
                                                        Alert.alert("Alert", `Proceed to delete ${e.course}`,
                                                            [
                                                                { text: "Close" },
                                                                {
                                                                    text: "Delete",
                                                                    onPress: () => { Delete() },
                                                                    color: Colors.primary
                                                                }
                                                            ]
                                                        );

                                                    }}
                                                />
                                            } else {
                                                return <Certificates key={key} data={`Studying ${e.course} at ${e.school} ( since ${e.meta.fromYear}) `}
                                                    icon={faCheckSquare} iconX={faTimes}
                                                    iconXCallback={() => {
                                                        // console.log(e)
                                                        // handleSnapPress(1)
                                                        setItemToDelet({
                                                            ...itemToDelete,
                                                            type: "COLLEGE",
                                                            data: e
                                                        })
                                                        Alert.alert("Alert", `Proceed to delete ${e.course}`,
                                                            [
                                                                { text: "Close" },
                                                                {
                                                                    text: "Delete",
                                                                    onPress: () => { Delete() },
                                                                    color: Colors.primary
                                                                }
                                                            ]
                                                        );
                                                    }}
                                                />
                                            }

                                        }
                                    })
                                }
                                {
                                    User.study.length < 1 &&

                                    <Pressable
                                        onPress={() => {
                                            // setloading(true)
                                            setloading(false)
                                            setModalVisible(true)
                                            setData({
                                                ...data, type: "CERTIFICATION"
                                            })
                                            setUpdateComponent("COLLEGE-HIGHSCHOOL")


                                            const payloadXX = {
                                                data: {
                                                    ...User.meta,
                                                    certification: []
                                                },
                                                user: User.phone
                                            }
                                            disp_user({
                                                ...User,
                                                meta: {
                                                    ...User.meta,
                                                    certification: []
                                                }
                                            })
                                            AddUser_meta(payloadXX)
                                                .then(res => {
                                                    // console.log(User)
                                                    setloading(false)
                                                    setModalVisible(true)
                                                    setData({
                                                        ...data, type: "CERTIFICATION"
                                                    })
                                                    setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                                })
                                        }}
                                        style={{
                                            justifyContent: "center",
                                            height: 99,
                                            alignItems: "center",
                                            padding: 20,
                                            width: "90%",
                                            marginLeft: "5%",
                                            backgroundColor: Colors.lightgrey,
                                            marginTop: 10,
                                        }}
                                    >
                                        <FontAwesomeIcon size={36} style={{
                                            flex: 1,
                                            color: Colors.grey,
                                            opacity: 0.8
                                            // margin: 20,
                                        }}
                                            icon={faEdit} />
                                        <Text style={[Style.TextLink, {
                                            flex: 1,
                                            justifyContent: "flex-end",
                                        }]} >
                                            Add Qualification
                                        </Text>
                                    </Pressable>
                                }




                                {/* certificate */}
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
                                        Certification(s)
                                    </Text>
                                    {User.meta.certification && User.meta.certification.length > 0 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                // console.log(User.meta.certification)
                                                setModalVisible(true)
                                                setData({
                                                    ...data, type: "CERTIFICATION"
                                                })
                                                setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                            }}
                                            style={{
                                                justifyContent: "flex-end", marginRight: 15
                                            }} >

                                            <Text style={[Style.TextLink, {
                                                flex: 1,
                                                justifyContent: "flex-end",
                                            }]} >
                                                Manage
                                            </Text>
                                        </TouchableOpacity>}
                                </View>
                                {
                                    User.meta.certification && User.meta.certification.map((e, index) => {
                                        return <Certificates
                                            iconX={faTimes}
                                            key={index}
                                            data={`${e.certificate} from ${e.institution} - ${e.year}`}
                                            icon={faCheckSquare}
                                            iconXCallback={() => {
                                                Alert.alert("Proceed", `Proceed to delete ${e.certificate}`,
                                                    [
                                                        { text: "Close" },
                                                        {
                                                            text: "Delete",
                                                            onPress: () => { handleScrollToTop(); DeleteCert(e); },
                                                            color: Colors.primary
                                                        }
                                                    ]
                                                );

                                            }}
                                        />
                                    })
                                }
                                {
                                    !User.meta.certification ?

                                        <TouchableOpacity
                                            onPress={() => {
                                                setloading(true)
                                                const payloadXX = {
                                                    data: {
                                                        ...User.meta,
                                                        certification: []
                                                    },
                                                    user: User.phone
                                                }
                                                disp_user({
                                                    ...User,
                                                    meta: {
                                                        ...User.meta,
                                                        certification: []
                                                    }
                                                })
                                                AddUser_meta(payloadXX)
                                                    .then(res => {
                                                        // console.log(User)
                                                        setloading(false)
                                                        setModalVisible(true)
                                                        setData({
                                                            ...data, type: "CERTIFICATION"
                                                        })
                                                        setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                                    })
                                            }}
                                            style={{
                                                justifyContent: "center",
                                                height: 90,
                                                alignItems: "center",
                                                padding: 20,
                                                width: "90%",
                                                marginLeft: "5%",
                                                backgroundColor: Colors.lightgrey,
                                                marginTop: 10,
                                            }}
                                        >
                                            <FontAwesomeIcon size={36} style={{
                                                flex: 1,
                                                color: Colors.grey,
                                                opacity: 0.8
                                                // margin: 20,
                                            }}
                                                icon={faEdit} />
                                            <Text style={[Style.TextLink, {
                                                flex: 1,
                                                justifyContent: "flex-end",
                                            }]} >
                                                Add certification
                                            </Text>
                                        </TouchableOpacity> :
                                        <>
                                            {User.meta.certification.length < 1 &&
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // setloading(true)
                                                        setModalVisible(true)
                                                        setData({
                                                            ...data, type: "CERTIFICATION"
                                                        })
                                                        setUpdateComponent("COLLEGE-HIGHSCHOOL")


                                                        const payloadXX = {
                                                            data: {
                                                                ...User.meta,
                                                                certification: []
                                                            },
                                                            user: User.phone
                                                        }
                                                        disp_user({
                                                            ...User,
                                                            meta: {
                                                                ...User.meta,
                                                                certification: []
                                                            }
                                                        })
                                                        AddUser_meta(payloadXX)
                                                            .then(res => {
                                                                setModalVisible(true)
                                                                setData({
                                                                    ...data, type: "CERTIFICATION"
                                                                })
                                                                setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                                                setloading(false)
                                                            })
                                                    }}
                                                    style={{
                                                        justifyContent: "center",
                                                        height: 90,
                                                        alignItems: "center",
                                                        padding: 20,
                                                        width: "90%",
                                                        marginLeft: "5%",
                                                        backgroundColor: Colors.lightgrey,
                                                        marginTop: 10,
                                                    }}
                                                >
                                                    <FontAwesomeIcon size={36} style={{
                                                        flex: 1,
                                                        color: Colors.grey,
                                                        opacity: 0.8
                                                        // margin: 20,
                                                    }}
                                                        icon={faEdit} />
                                                    <Text style={[Style.TextLink, {
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                    }]} >
                                                        Add certification
                                                    </Text>
                                                </TouchableOpacity>
                                            }
                                        </>
                                }


                                {/* Skills */}
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
                                    {User.skills.length > 1 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                // setModalVisible(true)
                                                // setData({
                                                //     ...data, type: "COLLEGE"
                                                // })
                                                // setUpdateComponent("COLLEGE-HIGHSCHOOL")
                                                navigation.navigate("Add-details")
                                            }}
                                            style={{
                                                justifyContent: "flex-end", marginRight: 15
                                            }} >

                                            <Text style={[Style.TextLink, {
                                                flex: 1,
                                                justifyContent: "flex-end",
                                            }]} >
                                                Manage
                                            </Text>
                                        </TouchableOpacity>
                                    }
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
                                {
                                    User.skills.map((e, index) => {
                                        return <Certificates key={index} data={`${e}`} icon={faCheckSquare} />
                                    })
                                }


                                {User.skills.length < 1 &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Add-details")
                                        }}
                                        style={{
                                            justifyContent: "center",
                                            height: 90,
                                            alignItems: "center",
                                            padding: 20,
                                            width: "90%",
                                            marginLeft: "5%",
                                            backgroundColor: Colors.lightgrey,
                                            marginTop: 10,
                                        }}
                                    >
                                        <FontAwesomeIcon size={36} style={{
                                            flex: 1,
                                            color: Colors.grey,
                                            opacity: 0.8
                                            // margin: 20,
                                        }}
                                            icon={faEdit} />
                                        <Text style={[Style.TextLink, {
                                            flex: 1,
                                            justifyContent: "flex-end",
                                        }]} >
                                            Add new skill
                                        </Text>
                                    </TouchableOpacity>
                                }


                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >


            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    if (updateComponent == "COLLEGE-HIGHSCHOOL") {
                        // Alert.alert('Modal has been closed.');
                        if (data.type == "HIGH SCHOOL") {
                            setData({
                                ...data, type: "COLLEGE"
                            })
                        } else if (data.type == "CERTIFICATION") {
                            setData({
                                ...data, type: "HIGH SCHOOL"
                            })
                        } else {
                            setModalVisible(!modalVisible);
                        }
                    } else {
                        if (updateComponent == "ZONE") {
                            setUpdateComponent("BETHEL")
                        } else {
                            setModalVisible(!modalVisible);
                        }
                    }
                }}>

                {
                    updateComponent == "COLLEGE-HIGHSCHOOL" &&
                    <HighschoolCollegeComponent
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        setData={setData}
                        data={data}
                        years={years}
                        loading={loading}
                        setloading={setloading}
                        User={User}
                        disp_user={disp_user}
                        Colors={Colors}
                    />
                }

                {
                    updateComponent == "BETHEL" &&
                    <AddBethel
                        updateComponent={updateComponent}
                        setUpdateComponent={setUpdateComponent}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        setData={setData}
                        data={data}
                        years={years}
                        loading={loading}
                        setloading={setloading}
                        User={User}
                        disp_user={disp_user}
                        Colors={Colors}
                    />}

                {updateComponent == "ZONE" &&
                    <AddBethel
                        updateComponent={updateComponent}
                        setUpdateComponent={setUpdateComponent}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        setData={setData}
                        data={data}
                        years={years}
                        loading={loading}
                        setloading={setloading}
                        User={User}
                        disp_user={disp_user}
                        Colors={Colors}
                    />
                }

                {
                    updateComponent == "CERTIFICATION" &&
                    <AddCertComponent
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        setData={setData}
                        data={data}
                        years={years}
                        loading={loading}
                        setloading={setloading}
                        User={User}
                        disp_user={disp_user}
                        Colors={Colors}
                    />
                }



            </Modal>


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
                        <Text style={{ marginLeft: 20, color: Colors.dark }}>Amount to donate</Text>

                    </View>





                    <PrimaryButton style={{
                        width: "90%",
                        marginLeft: "5%",
                        textTransform: 'uppercase', marginBottom: 30

                    }}
                        callBack={() => {
                            handleSnapPress(-1)
                            Delete()
                        }} title="Proceed" />
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
        disp_user: (payload) => dispatch(user_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);




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