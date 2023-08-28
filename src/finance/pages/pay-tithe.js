import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert
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
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function PayTithe({ navigation, disp_user, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
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

    const [currentFellowship, setFellowship] = useState(null)
    const [selectedValue, setselectedValue] = useState("Dues")


    const [monthNames, setmonthNames] = useState(
        [
            {
                name: "Jan",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Feb",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Mar",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "Apr",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "May",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jun",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jul",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Aug",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Sept",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Oct",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Nov",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Dec",
                paid: false,
                picked: false,
                pay: false
            },
        ]
    )

    const [monthNamesAlt, setmonthNamesAlt] = useState(
        [
            {
                name: "Jan",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Feb",
                paid: true,
                picked: false,
                pay: false
            },
            {
                name: "Mar",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "Apr",
                paid: false,
                picked: false,
                pay: false
            },
            {
                name: "May",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jun",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Jul",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Aug",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Sept",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Oct",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Nov",
                paid: false,
                picked: false,
                pay: false
            }, {
                name: "Dec",
                paid: false,
                picked: false,
                pay: false
            },
        ]
    )


    useEffect(() => {
        console.log("Auth screen")
        if (route.params) {
            if (route.params.data && route.params.data.Auth) {
                setAuthReroute({
                    data: route.params.data.CartItems,
                    route: "Checkout"
                })
            } else {
                setAuthReroute({
                    data: {},
                    route: "Home"
                })
            }

            console.log(route.params.data)
        } else {
            console.log("No data")
        }

        const unsubscribe = navigation.addListener('focus', async () => {
            let selectedFellowship = await AsyncStorage.getItem("FELLOWSHIP")
            console.log(selectedFellowship)
            setFellowship(JSON.parse(selectedFellowship))
            setPageState("SELECT PAYMENT TYPE")
        });

        return unsubscribe;

    }, [navigation])

    const selectMonth = (data) => {
        // console.log(data)
        let select = monthNames.filter(e => e.name == data.name)[0]
        // console.log(select)
        let index = monthNames.findIndex(e => e.name == data.name)
        if (select.picked == true) {
            let newSelect = {
                ...select,
                picked: false
            }
            let newSelectAlt = {
                ...select,
                paid: true,
                pay: true
            }
            monthNames.splice(index, 1, newSelect)
            monthNamesAlt.splice(index, 1, newSelectAlt)
            setmonthNames(monthNames)
            setmonthNamesAlt(monthNamesAlt)
            console.log("unselect")
        } else {
            let newSelect = {
                ...select,
                picked: true
            }
            let newSelectAlt = {
                ...select,
                paid: true,
                pay: true
            }

            monthNames.splice(index, 1, newSelect)
            monthNamesAlt.splice(index, 1, newSelectAlt)
            setmonthNames(monthNames)
            setmonthNamesAlt(monthNamesAlt)
            console.log("select")
        }

        setRemote(Date.now())
    }

    const ProceedToPay = () => {
        let monthCount = monthNamesAlt.filter(e => e.pay == true)
        console.log(monthCount.length) //month count
        console.log(selectedValue) // payment for dues or reg
        console.log(currentFellowship) // selected fellowship
    }

    return (

        <>
            <View style={{
                display: "none",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
                backgroundColor: Colors.white,
                // backgroundColor: "red",
                marginBottom: 5,
                position: 'absolute',
                top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 30,
                // paddingBottom:10
            }} >
                <Pressable
                    onPress={() => {
                        navigation.navigate("Payments")
                    }} style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
                        //  backgroundColor:Colors.light,
                        padding: 5,
                        borderRadius: 8,
                        flex: 1, alignItems: "center"
                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                    }} > Dues / Reg </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate("pay-tithe")
                    }}
                    style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.light,
                        backgroundColor: Colors.primary,
                        flex: 1, alignItems: "center", borderRadius: 8,
                        padding: 5

                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.light, flex: 1, fontWeight: 900
                    }} >Pay Tithe </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Donations")
                    }}
                 style={{
                    borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
                    // backgroundColor: "red",
                    padding: 5,
                    borderRadius: 8,
                    flex: 1, alignItems: "center"
                }} >
                    <Text style={{
                        fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                    }} >Donations </Text>
                </Pressable>
            </View >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View
                        style={{
                            width: "100%",

                        }}
                    >
                        {/* <Divider style={{ marginTop: 4 }} /> */}

                        {/* <Text style={{fontSize: 17,color:Colors.dark }} >Pay your Tithe seemlessly</Text> */}


                        <Text style={{ marginBottom: 4,color:Colors.dark }}>Tithe anount</Text>
                        <TextInput
                            autoFocus
                            textColor={Colors.dark}
                            // onChangeText={(value) => setData({ ...data, email: value })}
                            style={{ width: "100%",color:Colors.dark }}
                            theme={{
                                colors: {
                                    primary:Colors.dark,
                                    background: 'white',
                                    placeholder: "red",
                                },
                                roundness: 8,
                            }}
                            mode="outlined"
                            label="Enter amount"
                        />

                        <Text style={{ marginTop: 40, marginBottom: 4,color:Colors.dark }}>Testimony (Optional)</Text>
                        <TextInput
                            // autoFocus
                            // onChangeText={(value) => setData({ ...data, email: value })}
                            style={{ width: "100%" }}
                            textColor={Colors.dark}
                            theme={{
                                colors: {
                                    primary:Colors.dark,
                                    background: 'white',
                                    placeholder: "red",
                                },
                                roundness: 8,
                            }}
                            mode="outlined"
                            multiline
                            label="Do you have a testimony?"
                        />

                        <Text style={[Style.Text, { marginTop: 40, marginBottom: 4}]}>
                            "Bring the whole tithe into the storehouse, that there may
                            be food in my house. Test me in this,” says the Lord Almighty,
                            “and see if I will not throw open the floodgates of heaven and
                            pour out so much blessing that there will not be room enough to store it"
                        </Text>

                    </View>

                    {currentFellowship != null &&
                        <PrimaryButton style={{ width: "100%", textTransform: 'uppercase', marginTop: 30 }} callBack={() => { ProceedToPay() }} title={`Make payment`} />}

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


export default connect(mapStateToProps, mapDispatchToProps)(PayTithe);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 60,
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

