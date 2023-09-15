import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    StatusBar, ActivityIndicator
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Style } from '../../../assets/styles';
import { CurrentDate, CurrentTime, NumberWithCommas } from '../../utilities';
import { AddUser_meta } from '../../user/models/user-model';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Add_details({ navigation, disp_user, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const User = appState.User;
    const Fellow_To_Pay = appState.FellowshipToPay
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [checked, setChecked] = useState('first');
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [data, setData] = useState({});
    const [authReroute, setAuthReroute] = useState({});
    const [loading, setLoading] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setData({ ...data, date: currentDate })
    };

    const [PageState, setPageState] = useState("")
    const [remote, setRemote] = useState("")

    const [currentFellowship, setFellowship] = useState()
    const [selectedValue, setselectedValue] = useState(null)
    const [FellowshipToPay, setFellowshipToPay] = useState(null)



    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("make payment", User.meta)
            // let selectedFellowship = await AsyncStorage.getItem("FELLOWSHIP")
            // console.log(selectedFellowship)
            // setFellowship(JSON.parse(selectedFellowship))
            // setPageState("SELECT PAYMENT TYPE")

            setselectedValue(null)
            // setFellowshipToPay(User.fellowship.filter(e => e.fellowship == Fellow_To_Pay.fellowship)[0])
            // console.log("fellowship to pay", User.fellowship.filter(e => e.fellowship == Fellow_To_Pay.fellowship)[0])
        });

        return unsubscribe;

    }, [navigation])

    const selectMonth = (data) => {
        // console.log(data)
        let select = FellowshipToPay.Dues.filter(e => e.name == data.name)[0]
        // console.log(select)
        let index = FellowshipToPay.Dues.findIndex(e => e.name == data.name)
        if (select.picked == true) {
            let newSelect = {
                ...select,
                picked: false
            }

            FellowshipToPay.Dues.splice(index, 1, newSelect)
            setFellowshipToPay(FellowshipToPay)

            // dispatch to user state
            let UserFellowship_Index = User.fellowship.findIndex(e => e.fellowship == FellowshipToPay.fellowship)
            User.fellowship.splice(UserFellowship_Index, 1, FellowshipToPay)
            disp_user({  // dispatch to user state
                ...User,
                fellowship: User.fellowship
            })

        } else {
            let newSelect = {
                ...select,
                picked: true
            }

            FellowshipToPay.Dues.splice(index, 1, newSelect)
            setFellowshipToPay(FellowshipToPay)

            // dispatch to user state
            let UserFellowship_Index = User.fellowship.findIndex(e => e.fellowship == FellowshipToPay.fellowship)
            User.fellowship.splice(UserFellowship_Index, 1, FellowshipToPay)
            disp_user({  // dispatch to user state
                ...User,
                fellowship: User.fellowship
            })

        }

        setRemote(Date.now())
    }

    //=======================================================

    let currentYear = new Date().getFullYear()


    const selectYear = (data) => {
        // console.log(data)
        let select = FellowshipToPay.Registration.filter(e => e.name == data.name)[0]
        // console.log(select)
        let index = FellowshipToPay.Registration.findIndex(e => e.name == data.name)
        if (select.picked == true) {
            let newSelect = {
                ...select,
                picked: false
            }
            FellowshipToPay.Registration.splice(index, 1, newSelect)

            // dispatch to user state
            let UserFellowship_Index = User.fellowship.findIndex(e => e.fellowship == Fellow_To_Pay.fellowship)
            User.fellowship.splice(UserFellowship_Index, 1, FellowshipToPay)
            disp_user({  // dispatch to user state
                ...User,
                fellowship: User.fellowship
            })


        } else {
            let newSelect = {
                ...select,
                picked: true
            }

            FellowshipToPay.Registration.splice(index, 1, newSelect)

            // dispatch to user state
            let UserFellowship_Index = User.fellowship.findIndex(e => e.fellowship == Fellow_To_Pay.fellowship)
            User.fellowship.splice(UserFellowship_Index, 1, FellowshipToPay)
            disp_user({  // dispatch to user state
                ...User,
                fellowship: User.fellowship
            })


        }

        setRemote(Date.now())
    }


    const ProceedToPay = () => {
        let monthCount = FellowshipToPay.Dues.filter(e => e.picked == true)
        let yearCount = FellowshipToPay.Registration.filter(e => e.picked == true)
        if (selectedValue == "Registration") {
            if (yearCount < 1) {
                Alert.alert("Error", "Select at least one year before you can proceed to make payment",
                    [
                        {
                            text: "Close",
                        }
                    ]
                );
            } else {
                setLoading(true)
                function SavePayment() {
                    let ExactFelowship = User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0];
                    let RegOBJECT = User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0].Registration
                    for (let i = 0; i < yearCount.length; i++) {
                        const element = yearCount[i];
                        let index = RegOBJECT.findIndex(e => e.name == element.name)

                        let newSelect = {
                            ...element,
                            picked: false,
                            paid: true
                        }

                        // dispatch to user state 
                        console.log(newSelect)
                        RegOBJECT.splice(index, 1, newSelect)
                    }

                    //get the index of the exact fellowship
                    let ExactFelowshipIndex = User.fellowship.findIndex(e => e.fellowship == ExactFelowship.fellowship)

                    //replace the exact fellowship with the modified object
                    User.fellowship.splice(ExactFelowshipIndex, 1, ExactFelowship)

                    // dispatch back User object to redux state
                    disp_user({  // dispatch to user state
                        ...User,
                        fellowship: User.fellowship
                    })

                    let newFinanceRecord = {
                        type: "DUES/REG",
                        title: "Registration",
                        time: CurrentTime(),
                        date: CurrentDate(),
                        data: {
                            meta: {
                                Years: yearCount
                            },
                            amount: Fellow_To_Pay.config.registeration * yearCount.length,
                            payRef: {},
                            fellowship: Fellow_To_Pay
                        }
                    }

                    User.meta.finance.push(newFinanceRecord) // save to finance record 
                    const payload = {
                        data: {
                            ...User.meta,
                            finance: User.meta.finance
                        },
                        fellowship: User.fellowship,
                        user: User.phone
                    }

                    AddUser_meta(payload)
                        .then(res => {
                            Alert.alert("Success", `Your payment of ₦${NumberWithCommas(Fellow_To_Pay.config.registeration * yearCount.length)} was successful`, [
                                { text: "Ok" }
                            ])
                            setLoading(false)
                            disp_user({  // dispatch to user state
                                ...User,
                                meta: {
                                    ...User.meta,
                                    finance: User.meta.finance
                                }
                            })
                        })
                }
                Alert.alert("Proceed", `You are about to make a payment of ₦${NumberWithCommas(Fellow_To_Pay.config.registeration * yearCount.length)} for ${yearCount.length} year(s)`, [
                    { text: "Cancel", onPress: () => setLoading(false) },
                    { text: "Continue", onPress: () => SavePayment() }
                ])
            }
        } else {
            if (monthCount < 1) {
                Alert.alert("Error", "Select at least one month before you can proceed to make payment",
                    [
                        {
                            text: "Close",
                        }
                    ]
                );
            } else {
                setLoading(true)
                function SavePaymentReg() {
                    let ExactFelowship = User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0];
                    let RegOBJECT = User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0].Dues
                    for (let i = 0; i < monthCount.length; i++) {
                        const element = monthCount[i];
                        let index = RegOBJECT.findIndex(e => e.name == element.name)

                        let newSelect = {
                            ...element,
                            picked: false,
                            paid: true
                        }

                        // dispatch to user state 
                        console.log(newSelect)
                        RegOBJECT.splice(index, 1, newSelect)
                    }

                    //get the index of the exact fellowship
                    let ExactFelowshipIndex = User.fellowship.findIndex(e => e.fellowship == ExactFelowship.fellowship)

                    //replace the exact fellowship with the modified object
                    User.fellowship.splice(ExactFelowshipIndex, 1, ExactFelowship)

                    // dispatch back User object to redux state
                    disp_user({  // dispatch to user state
                        ...User,
                        fellowship: User.fellowship
                    })

                    // console.log("Registratio object ", RegOBJECT)
                    // console.log("index of exact fellowship ", ExactFelowshipIndex)
                    // console.log("exact fellowship", ExactFelowship)
                    // console.log("All fellowships", User.fellowship[ExactFelowshipIndex].Registration)


                    let newFinanceRecord = {
                        type: "DUES/REG",
                        title: "Dues",
                        time: CurrentTime(),
                        date: CurrentDate(),
                        data: {
                            meta: {
                                Months: monthCount
                            },
                            amount: Fellow_To_Pay.config.dues * monthCount.length,
                            payRef: {},
                            fellowship: Fellow_To_Pay
                        }
                    }

                    User.meta.finance.push(newFinanceRecord) // save to finance record

                    const payload = {
                        data: {
                            ...User.meta,
                            finance: User.meta.finance
                        },
                        fellowship: User.fellowship,
                        user: User.phone
                    }

                    AddUser_meta(payload)
                        .then(res => {
                            Alert.alert("Success", `Your payment of ₦${NumberWithCommas(Fellow_To_Pay.config.dues * monthCount.length)} was successful`, [
                                { text: "Ok" }
                            ])
                            setLoading(false)
                            disp_user({  // dispatch to user state
                                ...User,
                                meta: {
                                    ...User.meta,
                                    finance: User.meta.finance
                                }
                            })
                        })
                }
                Alert.alert("Proceed", `You are about to make a payment of ₦${NumberWithCommas(Fellow_To_Pay.config.dues * monthCount.length)} for ${monthCount.length} month(s)`, [
                    { text: "Cancel", onPress: () => setLoading(false) },
                    { text: "Continue", onPress: () => SavePaymentReg() }
                ])

            }
        }
    }



    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );
    const changeStatusBarVisibility = () => setHidden(!hidden);
    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1;
        if (styleId === STYLES.length) {
            setStatusBarStyle(STYLES[0]);
        } else {
            setStatusBarStyle(STYLES[styleId]);
        }
    };
    const changeStatusBarTransition = () => {
        const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
        if (transition === TRANSITIONS.length) {
            setStatusBarTransition(TRANSITIONS[0]);
        } else {
            setStatusBarTransition(TRANSITIONS[transition]);
        }
    };
    return (

        <>
            {loading == true &&
                <View
                    style={{
                        display: "flex",
                        // marginTop: 10,
                        // backgroundColor: Colors.light,
                        backgroundColor: "rgb(0,0,0)",
                        opacity: 0.8,
                        marginBottom: 5,
                        position: 'absolute',
                        // top: 10,
                        // right: 19,
                        zIndex: 2100,
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                    <ActivityIndicator />
                </View>
            }

            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    // marginTop: 10,
                    // backgroundColor: Colors.light,
                    // backgroundColor: "red",
                    marginBottom: 5,
                    position: 'absolute',
                    // top: 10,
                    // right: 19,
                    zIndex: 2000,
                    width: "100%",
                    // height: 50,
                    paddingTop: 15,
                    paddingBottom: 10,
                }} >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <View style={{
                        // borderBottomWidth: 1,
                        // borderBottomColor: Colors.primary,
                        backgroundColor: Colors.primary,
                        flex: 1, alignItems: "center",
                        borderRadius: 8,
                        paddingTop: 10, marginLeft: 10
                    }} >
                        <Text style={{
                            fontSize: 13, color: Colors.light, flex: 1, fontWeight: 900
                        }} > Dues / Reg </Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            // navigation.navigate("pay-tithe")
                            Alert.alert("Coming Soon", "This feature is currently unavailable.")
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.white,
                            //  backgroundColor:Colors.light,
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                        }} >Pay Tithe </Text>
                    </Pressable>
                    {/* <Pressable
                        onPress={() => {
                            navigation.navigate("Donations")
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.light,
                            // backgroundColor: "red",
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1, alignItems: "center"
                        }} >
                        <Text style={{
                            fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                        }} >Donations </Text>
                    </Pressable> */}
                </View>

                <Pressable
                    onPress={() => {

                        if (User.meta.finance) {
                            if (User.meta.finance.length > 0) {
                                navigation.navigate("finance-history")
                            }
                        }
                    }}
                    style={[{ marginTop: 15, marginRight: 30, opacity: User.meta.finance && User.meta.finance.length > 1 ? 1 : 0.2 }]} >
                    <Text style={[Style.TextLink, { textAlign: "right" }]} >View histories</Text></Pressable>
                <Divider style={{ marginTop: 20 }} />
            </View >


            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />
                <View style={styles.content}>
                    <View
                        style={{
                            width: "100%"
                        }}
                    >

                        {Fellow_To_Pay == null ?
                            <>
                                <Pressable
                                    onPress={() => { navigation.navigate("Select-fellowship") }}
                                    style={{
                                        backgroundColor: Colors.light,
                                        padding: 15,
                                        borderRadius: 10,
                                        marginTop: 20,
                                        marginBottom: 20,
                                        borderColor: Colors.lightgrey,
                                        borderWidth: 2,


                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.dark,
                                            fontSize: 14,
                                            // fontWeight: 900
                                        }}>
                                        Select your fellowship
                                    </Text>
                                </Pressable>

                            </>
                            :
                            <>
                                <View
                                    style={{
                                        // backgroundColor:"#E1ECF4",
                                        backgroundColor: Colors.light,
                                        padding: 18,
                                        // borderRadius: 10,
                                        marginTop: 20,
                                        marginBottom: 20,
                                        borderRadius: 6,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.dark,
                                            fontSize: 20,
                                            // textAlign:"center",
                                            fontWeight: 900,
                                            flex: 9,
                                            // backgroundColor:"red",
                                            textAlign: "center"
                                        }}>
                                        {Fellow_To_Pay.fellowship}
                                        {/* {console.log(currentFellowship)} */}
                                    </Text>
                                    <Pressable
                                        onPress={() => { navigation.navigate("Select-fellowship") }}
                                        style={{ flex: 1 }}
                                    >
                                        <FontAwesomeIcon size={16} style={{
                                            flex: 1,
                                            color: Colors.primary,
                                            opacity: 0.8,
                                            marginLeft: 10
                                            // margin: 20,
                                        }}
                                            icon={faEdit} />
                                    </Pressable>
                                </View>

                            </>}


                        {Fellow_To_Pay != null &&
                            <>
                                <Text style={{ marginTop: 5, marginBottom: 4 }}>Payment For:</Text>
                                <Picker

                                    style={{
                                        backgroundColor: Colors.lightgrey,
                                        color: Colors.dark,
                                        borderRadius: 80,
                                        marginBottom: 10,
                                        borderWidth: 20,
                                        borderColor: "red"
                                    }}
                                    dropdownIconColor={Colors.dark}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setselectedValue(itemValue)
                                        setFellowshipToPay(User.fellowship.filter(e => e.fellowship == Fellow_To_Pay.fellowship)[0])
                                        // User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)
                                    }
                                    }
                                >
                                    <Picker.Item label="What are you paying for?" value={null} />
                                    <Picker.Item label="Dues" value="Dues" />
                                    <Picker.Item label="Registration" value="Registration" />
                                </Picker>
                                {/* {console.log("state", Fellow_To_Pay)}
                                {console.log("fellowship", FellowshipToPay)} */}
                                {
                                    selectedValue == "Dues" && <>
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{
                                                marginLeft: 10, marginTop: 20, marginBottom: -1,
                                                textAlign: "left",
                                                color: Colors.dark
                                            }}> You can select multiple months</Text>

                                        </View>

                                        <View
                                            style={{
                                                // backgroundColor: "red"
                                            }}
                                        >
                                            <View style={{
                                                // display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                flexWrap: 'wrap',
                                            }}>
                                                {
                                                    FellowshipToPay && User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0].Dues.map((e, key) => {
                                                        return (
                                                            <Pressable
                                                                key={key}
                                                                onPress={() => {
                                                                    if (e.paid != true) {
                                                                        selectMonth(e)
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                    justifyContent: "center", alignItems: "center",
                                                                    margin: 10,
                                                                    borderRadius: 7
                                                                }}>
                                                                <Text style={{ fontWeight: 900, color: Colors.dark }} > {e.name}</Text></Pressable>
                                                        )
                                                    })
                                                }
                                            </View>

                                        </View>

                                    </>
                                }

                                {selectedValue == "Registration" &&
                                    <>
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{
                                                marginLeft: 10, marginTop: 20, marginBottom: -1,
                                                textAlign: "left",
                                                color: Colors.dark
                                            }}>
                                                You can select multiple years
                                            </Text>

                                        </View>

                                        <View
                                            style={{
                                                // backgroundColor: "red"
                                            }}
                                        >
                                            {/* {console.log(FellowshipToPay)} */}
                                            <View style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                flexWrap: 'wrap',
                                            }}>
                                                {
                                                    FellowshipToPay && User.fellowship.filter(e => e.fellowship == FellowshipToPay.fellowship)[0].Registration.map((e, key) => {
                                                        // console.log(e)
                                                        return (
                                                            <Pressable
                                                                key={key}
                                                                onPress={() => {
                                                                    if (e.paid != true) {
                                                                        selectYear(e)
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: e.paid == true ? "#E1ECF4" : e.picked == true ? "#fbf1e3" : Colors.light, height: 60, width: 60,
                                                                    justifyContent: "center", alignItems: "center",
                                                                    margin: 10,
                                                                    borderRadius: 7
                                                                }}><Text style={{ fontWeight: 900, color: Colors.dark }} >{e.name}</Text></Pressable>
                                                        )
                                                    })
                                                }
                                            </View>


                                        </View>

                                    </>
                                }

                                {/* {console.log(selectedValue)} */}
                                {selectedValue != null &&
                                    <View style={{ display: "flex", flexDirection: "row" }} >
                                        <Text style={{
                                            marginTop: 10, marginBottom: -7, color: Colors.dark,
                                            textAlign: "left", marginLeft: 15
                                        }}>
                                            Dues : ₦{NumberWithCommas(Fellow_To_Pay && Fellow_To_Pay.config.dues)} / month
                                        </Text>
                                        <Text style={{
                                            marginTop: 10, marginBottom: -7, color: Colors.dark,
                                            textAlign: "left", marginLeft: 20
                                        }}>
                                            Registration : ₦{NumberWithCommas(Fellow_To_Pay && Fellow_To_Pay.config.registeration)} / month
                                        </Text>
                                    </View>
                                }

                            </>
                        }
                    </View>

                    {selectedValue != null &&
                        <PrimaryButton
                            style={{ width: "100%", textTransform: 'uppercase', marginTop: 30 }}
                            callBack={() => { ProceedToPay() }}
                            title={`Make payment`} />}

                </View>
            </SafeAreaView>
        </>

    );
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_user: (payload) => dispatch(user_state(payload)),
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Add_details);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 90,
        // backgroundColor: "red"
    },

    inputContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        // marginBottom: 10,
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        // backgroundColor:"red", 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        width: '92%',
    },
});

