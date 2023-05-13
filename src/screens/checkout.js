import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../components/icons';
import { PrimaryButton } from '../components/buttons/primary';
import { Color } from '../components/theme';
import { isEmptyString } from '../utilities/validations';
import { FetchGifts, createGift } from '../controllers/items/itemsControllers';
import { Loader } from '../components/loader';
import { connect } from "react-redux";
import {
    CartItems,
    surprise_state
} from "../redux";
import { NoItems } from '../utilities/404';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()
const MyTextInput = ({
    onDateChange, date, setShowDatePicker, showDatePicker,
    data, setData, CartItems, navigation, setLoader, disp_surprise, appState, disp_cart }) => {

    const buttonCallback = () => {

        if (!isEmptyString(data.name, 5) || !isEmptyString(data.date, 5)
            || !isEmptyString(data.gender, 2) || !isEmptyString(data.anon, 1)
            || !isEmptyString(data.relationship, 3) || !isEmptyString(data.phone, 10)
            || !isEmptyString(data.location, 5) || !isEmptyString(data.doc, 2)) {
            // console.log(data)
            Alert.alert("Error", "You cannot submit an empty form",
                [{ text: "Cancel" }])
        } else {
            Alert.alert("Warning", "You are about to make a payment of ₦40,000",
                [{ text: "Cancel" },
                {
                    text: "Continue", onPress: () => {
                        setLoader(true)
                        const payload = {
                            sender: appState.User,
                            receiver: data,
                            items: CartItems
                        }
                        // call the createGift controller
                        createGift(payload)
                            .then(response => {
                                // console.log(response);
                                if (response.success == false) {
                                    setLoader(false)

                                    Alert.alert("Error", response.message,
                                        [{ text: "Cancel" },
                                        {
                                            text: "Continue", onPress: () => {
                                                response.message == "Login to continue" && navigation.push("Login")

                                            }
                                        }])
                                }
                                else {
                                    // setLoader(false)
                                    Alert.alert("Success", response.message,
                                        [{ text: "Cancel" },
                                        {
                                            text: "Continue", onPress: () => {
                                                // setLoader(true)
                                                FetchGifts(appState.User.email, disp_surprise)
                                                disp_cart([])
                                                navigation.replace("Account")
                                                // appState.SurpriseState.push(data)
                                                // disp_surprise(appState.SurpriseState)
                                            }
                                        }])
                                    setData({
                                        anon: "",
                                        date: "",
                                        doc: "",
                                        gender: "",
                                        location: "",
                                        name: "",
                                        note: "",
                                        phone: "",
                                        relationship: ""
                                    })
                                }
                            })
                            .catch(error => {
                                setLoader(false)
                            })

                    }
                }])
        }




    }
    return (
        <Swiper removeClippedSubviews={true} loop={false}
            dot={<View style={styles.dotStyle} />}
            activeDot={<View style={styles.activeDotStyle} />}
            onIndexChanged={(index) => {
                // setDot(index)
            }}
            style={{
                position: 'absolute',
                paddingTop: 20
            }}
        >
            {
                [1, 2].map((items, index) => {
                    return (
                        <View style={styles.screenContainer} key={index} >

                            {index == 1 ?
                                <>

                                    <View style={{
                                        width: '85%',
                                        backgroundColor: "white",
                                        borderStyle: "solid",
                                        borderColor: "lightgrey",
                                        borderWidth: 1,
                                        padding: 6,
                                        borderRadius: 7,
                                    }}>
                                        <Text style={{ fontWeight: 900 }} >Allow documentary upload?</Text>
                                        <RadioButton.Group
                                            onValueChange={(value) => setData({ ...data, doc: value })}
                                            value={data.doc}
                                        >
                                            <View style={{ flexDirection: "row" }} >
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <RadioButton.Item label="Yes" value="YES" />
                                                </View>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <View style={{ flex: 1.5 }}>

                                                    </View>
                                                    <View style={{ flex: 2 }}>
                                                        <RadioButton.Item label="No" value="NO" />
                                                    </View>
                                                </View>
                                            </View>
                                        </RadioButton.Group>
                                    </View>

                                    <View style={{
                                        width: '85%',
                                        backgroundColor: "white",
                                        borderStyle: "solid",
                                        borderColor: "lightgrey",
                                        borderWidth: 1,
                                        padding: 6,
                                        borderRadius: 7,
                                        marginTop: 14
                                    }}>
                                        <Text style={{ fontWeight: 900 }} >Stay Anonymous</Text>
                                        <RadioButton.Group
                                            onValueChange={(value) => setData({ ...data, anon: value })}
                                            value={data.anon}
                                        >
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <RadioButton.Item label="Yes" value="YES" />
                                                </View>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <View style={{ flex: 1.5 }}>

                                                    </View>
                                                    <View style={{ flex: 2 }}>
                                                        <RadioButton.Item label="No" value="NO" />
                                                    </View>
                                                </View>
                                            </View>
                                        </RadioButton.Group>
                                    </View>


                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, location: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 14 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Surprise Location"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="map-marker" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, note: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 14, height: 100 }}
                                        multiline={true}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Add a note (optional)"
                                        placeholder="Add a note to the receiver"
                                        left={<TextInput.Icon icon="pen" onPress={() => { console.log("hello") }} />}
                                    />
                                    <PrimaryButton
                                        callBack={buttonCallback}
                                        title="Proceed to payment"
                                        style={{ width: "85%" }}
                                    />
                                    {/* <PrimaryButton
                                        callBack={()=>{
                                            console.log("==============")
                                            disp_surprise([])
                                        }}
                                        title="Proceed to payment"
                                        style={{ width: "85%",backgroundColor:"grey" }}
                                    /> */}
                                    {/* disp_surprise */}
                                </> :
                                <>

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, name: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 18 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Receiver's Name"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="account-outline" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, phone: value })}
                                        style={{ width: "85%", marginTop: 20 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                // placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Receiver's Phone"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="phone" />}
                                    />
                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, relationship: value })}
                                        style={{ width: "85%", marginTop: 20 }}
                                        underlineColor="transparent"
                                        theme={{
                                            colors: {
                                                primary: "grey",
                                                background: 'white',
                                            },
                                            roundness: 8,
                                            outlines: {
                                                borderWidth: 25, // change border thickness
                                                borderColor: 'red', // change border color
                                            },
                                        }}
                                        mode="outlined"
                                        label="Relationship with Receiver"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="heart" />}
                                    />


                                    <View
                                        style={{ flexDirection: "row", alignItems: "center", width: "85%", marginTop: 20 }} >

                                        <Text style={{ textAlign: "left" }}>
                                            Surprise date & time
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "85%", }} >

                                        <Pressable
                                            onPress={() => { setShowDatePicker(true) }}
                                            style={{
                                                marginTop: 10,
                                                marginBottom: 30,
                                                width: "100%",
                                            }}
                                        >
                                            <View style={{
                                                backgroundColor: "white",
                                                borderStyle: "solid",
                                                borderColor: "lightgrey",
                                                borderWidth: 1,
                                                padding: 13,
                                                borderRadius: 7,
                                                flexDirection: "row"
                                            }} >

                                                <FontAwesomeIcon size={22} style={{
                                                    // color: "grey"
                                                }} icon={faCalendar} />
                                                <Text style={{
                                                    textAlign: "right",
                                                    color: "grey",
                                                    // fontWeight: 900,
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                }} >
                                                    {JSON.stringify(date).substr(1, 10)}
                                                </Text>
                                            </View>
                                        </Pressable>
                                        <Text style={{ color: "grey", fontSize: 20, textAlign: "center", flex: 1 }} >
                                            {/* {date} */}
                                        </Text>
                                    </View>


                                    <View
                                        style={{ flexDirection: "row", alignItems: "center", width: "85%" }} >

                                        <Text style={{ textAlign: "left" }}>
                                            Receiver's Gender
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "85%", }} >

                                        <Pressable
                                            onPress={() => { setData({ ...data, gender: "FEMALE" }) }}
                                            style={{
                                                marginTop: 5,
                                                marginBottom: 30,
                                                flex: 1,
                                                marginRight: 5
                                            }}
                                        >
                                            <View style={{
                                                backgroundColor: data.gender == "FEMALE" ? Colors.secondary : "white",
                                                borderStyle: "solid",
                                                borderColor: "lightgrey",
                                                borderWidth: 1,
                                                padding: 13,
                                                borderRadius: 7,
                                                flexDirection: "row"
                                            }} >
                                                <Text style={{
                                                    textAlign: "center",
                                                    color: data.gender == "FEMALE" ? "white" : "grey",
                                                    // fontWeight: 900,
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                }} >Female</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => { setData({ ...data, gender: "MALE" }) }}
                                            style={{
                                                marginTop: 5,
                                                marginBottom: 30,
                                                flex: 1,
                                                marginLeft: 5
                                            }}
                                        >
                                            <View style={{
                                                backgroundColor: data.gender == "MALE" ? Colors.secondary : "white",
                                                borderStyle: "solid",
                                                borderColor: "lightgrey",
                                                borderWidth: 1,
                                                padding: 13,
                                                borderRadius: 7,
                                                flexDirection: "row"
                                            }} >
                                                <Text style={{
                                                    textAlign: "center",
                                                    color: data.gender == "MALE" ? "white" : "grey",
                                                    // fontWeight: 900,
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                }} >Male</Text>
                                            </View>
                                        </Pressable>
                                    </View>



                                </>}
                            {showDatePicker && (
                                <DateTimePicker value={date} mode="date" display="spinner" onChange={onDateChange} />
                            )}

                        </View>

                    )
                })
            }

        </Swiper>

    );
};



function Checkout({ navigation, route, disp_surprise, appState, disp_cart }) {
    const CartItems = route.params.data;
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);

    const [loader, setLoader] = useState(false)
    const [state, setstate] = useState()
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [checked, setChecked] = useState('first');
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [data, setData] = useState({
        anon: "",
        date: "",
        doc: "",
        gender: "",
        location: "",
        name: "",
        note: "",
        phone: "",
        relationship: ""
    });


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setData({ ...data, date: currentDate })
    };

    useEffect(() => {

        console.log("Checkout page")
        // console.log(route.params.data.CartItems)
        // console.log(appState)
        if (!auth) {
            setstate( route.params.data)
            navigation.replace("Login", { data: route.params.data })
        }
        // console.log(appState.SurpriseState)
        // const Key = "pk_test_fd516dafa835bc74e743cb22112cb3129406e524"
        // RNPaystack.init({
        //     publicKey:Key,
        // });
    }, [setstate])
    const [showPaystack, setShowPaystack] = useState(false);
    const [reference, setReference] = useState('');

    const handlePaymentSuccess = (reference) => {
        // Handle successful payment here
        setReference(reference);
    };

    const handlePaymentError = (error) => {
        // Handle payment error here
        console.log(error);
    };



    return (

        <>
            <SafeAreaView style={{ flex: 1 }}>
                {loader == true && <Loader loading={true} />}
                {appState.CartItems.length < 1 ? <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <NoItems text="Your checkout was successful and your cart is empty" textStyle={{ marginTop: 30,color:Colors.dark }} />

                        <PrimaryButton title="Back to shopping" callBack={() => navigation.replace('ItemsDetails')} style={{
                            width: "90%"
                        }} />
                    </View>
                </> : <>
                    <ScrollView >
                        <View style={{ position: 'relative', height: height / 1.15, }}>
                            {/* <Onboarding /> */}
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }} >
                                <Logo />
                            </View>
                            <MyTextInput value={text}
                                onChangeText={handleTextChange}
                                CartItems={CartItems}
                                setShowDatePicker={setShowDatePicker}
                                date={date}
                                onDateChange={onDateChange}
                                showDatePicker={showDatePicker}
                                setChecked={setChecked}
                                checked={checked}
                                data={data}
                                setData={setData}
                                navigation={navigation}
                                setLoader={setLoader}
                                disp_surprise={disp_surprise}
                                appState={appState}
                                disp_cart={disp_cart}
                            />

                            <Pressable onPress={() => {
                                // navigation.goBack()
                            }}
                                style={{
                                    // marginTop: 20,
                                    // marginBottom: 30
                                }}
                            >
                                <View style={{
                                    // backgroundColor: "lightgrey",
                                    width: "80%",
                                    marginLeft: "10%",
                                    // padding: 13,
                                    borderRadius: 7
                                }} >
                                    <Text style={{
                                        textAlign: "center",
                                        color: "grey",
                                        // fontWeight: 900,
                                        fontSize: 14
                                    }} >Provide all required details</Text>
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                </>}
            </SafeAreaView>
            {/* <Onboarding /> */}
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
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
        disp_cart: (payload) => dispatch(CartItems(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);




const styles = StyleSheet.create({
    screenContainer: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'red',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 32,
    },
    description: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
        marginHorizontal: 64,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'cover',
    },
    // ==================================

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

    // ======================================
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d4d4d4',
        marginHorizontal: 5,
    },
    activeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        marginHorizontal: 5,
    },
});

