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
import { faCalendar, faCheckCircle, faCheckSquare, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampaignCard } from '../components/campaign-card';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Donations({ navigation, disp_user, appState, disp_surprise, route }) {
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // marginTop: 20,
                backgroundColor: Colors.white,
                // backgroundColor: "red",
                marginBottom: 5,
                position: 'absolute',
                // top: 0,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 50,
                paddingBottom:10,
                paddingTop:10,
                display:"none"
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
                        borderBottomWidth: 0, borderBottomColor: Colors.lightgrey,
                        // backgroundColor: "red",
                        padding: 5,
                        borderRadius: 8,
                        flex: 1, alignItems: "center"
                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.dark, flex: 1, fontWeight: 900
                    }} >Pay Tithe </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Donations")
                    }} style={{
                        borderBottomWidth: 0, borderBottomColor: Colors.light,
                        backgroundColor: Colors.primary,
                        flex: 1, alignItems: "center", borderRadius: 8,
                        paddingTop: 8, marginRight: 10
                    }} >
                    <Text style={{
                        fontSize: 13, color: Colors.light, flex: 1, fontWeight: 900
                    }} >Donations </Text>
                </Pressable>
            </View >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <View
                            style={{
                                width: "100%",

                            }}
                        >
                            {/* <Divider style={{ marginTop: 4 }} /> */}

                            {/* <Text style={{ marginTop: 25, marginBottom: 10, marginLeft: 20, fontSize: 17 }} >Donation campaigns</Text> */}

                            {
                                [1, 2, 3, 4, 5, 6, 7].map((e, index) => {
                                    return (
                                        <CampaignCard navigation={navigation} key={index} />
                                    )
                                })
                            }
                        </View>


                    </View>
                </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(Donations);



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


    inputIcon: {
        marginRight: 10,
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
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

