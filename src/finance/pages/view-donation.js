import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Divider, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faCheckSquare, faEdit, faEye, faSquare } from '@fortawesome/free-solid-svg-icons';
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


function Add_details({ navigation, disp_user, appState, disp_surprise, route }) {
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

    const [datas, setData] = useState({});
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


    const [annonymous, setannonymous] = useState(false)
    const ProceedToPay = () => {
        let monthCount = monthNamesAlt.filter(e => e.pay == true)
        console.log(monthCount.length) //month count
        console.log(selectedValue) // payment for dues or reg
        console.log(currentFellowship) // selected fellowship
    }




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

            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View
                        style={{
                            width: "100%"
                        }}
                    >
                        <View >
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 5
                            }} >

                                <Text style={[Style.boldText, {
                                    flex: 2, marginLeft: 4
                                }]} >
                                    CNCF INTER ZONAL SINGING EXERCISE 2023
                                </Text>
                            </View>

                            <Text style={[Style.LabelText, { marginTop: 25 }]}>
                                Amount needed
                            </Text>
                            <Text style={[Style.boldText, { marginTop: 5 }]}>
                                ₦60,000,000
                            </Text>



                            <Text style={[Style.LabelText, { marginTop: 25 }]}>
                                Amount needed
                            </Text>
                            <Text style={[Style.boldText, { marginTop: 5 }]}>
                                ₦60,000,000
                            </Text>



                            <Text style={[Style.LabelText, { marginTop: 25 }]}>
                                Reason
                            </Text>
                            <Text style={[Style.Text, { marginTop: 5 }]}>
                                After four years of no inter zonal singing exercise in Rivers State,
                                the Father had finally approved the RS CNCF SINGING EXERCISE 2024.

                                We will need your support to make this work.

                                Donate with any amount.
                            </Text>
                        </View>


                    </View>

                    {currentFellowship != null &&
                        <PrimaryButton style={{
                            width: "100%", textTransform: 'uppercase', marginTop: 30
                        }}
                            callBack={() => { handleSnapPress(1) }} title={`Support campaign`} />
                    }

                </View>
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
                            <TextInput
                                keyboardType='numeric'
                                // autoFocus
                                // onChangeText={(value) => setData({ ...data, email: value })}
                                style={{ width: "90%", marginLeft: "5%" }}
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
                                label="Enter amount"
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
                                    Donate annonymously?
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
                            // width: "90%",
                            // marginLeft: "5%",
                            textTransform: 'uppercase', marginBottom: 30

                        }}
                            callBack={() => { handleSnapPress(1) }} title={`Make payment`} />
                    </View>

                </BottomSheet>
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
        paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },


    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        // backgroundColor: "red"
    },
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
        // backgroundColor:"red", 
    },
});

