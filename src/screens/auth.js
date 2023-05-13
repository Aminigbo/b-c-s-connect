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
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../controllers/auth/authController';
import { Loader } from '../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../redux';
import { FetchGifts } from '../controllers/items/itemsControllers';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()
const MyTextInput = ({ onDateChange, date, setShowDatePicker, showDatePicker, data, setData,
    setLoading, navigation, disp_user, disp_surprise, authReroute }) => {

    const LoginCallback = () => {
        setLoading(true)
        if (data && data.email && data.email.length > 8 && data.password) {
            if (data.password.length < 5) {
                setLoading(false)
                return Alert.alert("Error", "Use a stronger password more than five characters",
                    [{ text: "Continue", onPress: () => { } }])
            } else {

                signinService(data).then(response => {
                    if (response.error != null) {
                        setLoading(false)
                        return Alert.alert("Error", response.error.message,
                            [{ text: "Continue", onPress: () => { } }])
                    } else {
                        fetchMetadata(data.email).then(response => {
                            // console.log(response)
                            let userObj = response.data[0]
                            localstorageSaveUserMedata(userObj).then(resp => {
                                let user_data = {
                                    name: userObj.data.fullname,
                                    email: userObj.data.signup_email,
                                    phone: userObj.data.phone,
                                    // surprises:userObj.data.surpeises
                                }
                                FetchGifts(user_data.email, disp_surprise) // fetching users gift record
                                disp_user(user_data)
                                // navigation.navigate(authReroute.route, authReroute.data)
                                if (authReroute.route == "Checkout") {
                                    navigation.replace("Checkout", { data: authReroute.data })
                                } else {
                                    navigation.replace("Home", { data: authReroute.data })
                                }
                                console.log(authReroute.route)
                                // setLoading(false)
                                // console.log("login stoppe")
                                // console.log(userObj.data)
                            })
                        })
                    }
                })
                    .catch(error => {
                        setLoading(false)
                    })

            }


        } else {
            setLoading(false)
            return Alert.alert("Error", "You can not submit an empty form, fill out all forms to login",
                [{ text: "Ok", onPress: () => { } }])
        }

    }

    const SignupCallback = () => {
        setLoading(true)
        if (data && data.signup_email && data.signup_email.length > 8
            && data.signup_password && data.fullname && data.fullname.length > 5
            && data.phone && data.phone.length > 9) {
            if (data.signup_password.length < 5) {
                return Alert.alert("Error", "Use a stronger password more than five characters",
                    [{ text: "Continue", onPress: () => { } }])
            } else {
                signupService(data).then(response => {
                    console.log("running")
                    if (response.error == null) {
                        console.log("Signed up")
                        SaveMetadata(data) // save user metadata to a public table
                        localstorageSaveUserMedata({
                            name: data.fullname,
                            email: data.signup_email,
                            phone: data.phone,

                        })
                            .then(res => {
                                return Alert.alert("Success", "Account created successfully",
                                    [{
                                        text: "Continue",
                                        onPress: () => {
                                            navigation.navigate("Home")
                                        }
                                    }
                                    ])
                            })
                    } else {
                        Alert.alert("Error", response.error.message,
                            [{ text: "Continue", onPress: () => { } }])
                        setLoading(false)
                    }
                })
                // console.log(data)
            }


        } else {
            setLoading(false)
            return Alert.alert("Error", "You can not submit an empty form, fill out all forms to login",
                [{ text: "Ok", onPress: () => { } }])
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
                                        // backgroundColor: "lightgrey",
                                        // width: "80%",
                                        marginTop: "7%",
                                        // padding: 13,
                                        borderRadius: 7
                                    }} >
                                        <Text style={{
                                            textAlign: "center",
                                            color: "grey",
                                            fontWeight: 900,
                                            fontSize: 18
                                        }} >Signup</Text>
                                    </View>


                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, fullname: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 28 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Your Fullname"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="account-outline" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, phone: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 28 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Your phone number"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="phone" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, signup_email: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 28 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Your Email"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="email" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, signup_password: value })}
                                        // value={name}
                                        style={{ width: "85%", marginTop: 28 }}
                                        theme={{
                                            colors: {
                                                primary: "lightgrey",
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        label="Choose password"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="lock" onPress={() => { console.log("hello") }} />}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "85%", }} >

                                        <PrimaryButton style={{ width: "100%" }} callBack={SignupCallback} title="Signup" />
                                    </View>

                                    {/* <Pressable style={{ marginTop: 20 }}
                                     onPress={() => {
                                         navigation.navigate("Home")
                                     }}
                                 >
                                     <Text style={{ fontSize: 19 }} >
                                         SKIP
                                     </Text>
                                 </Pressable> */}
                                </> :
                                <>
                                    <View style={{
                                        // backgroundColor: "lightgrey",
                                        // width: "80%",
                                        marginTop: "7%",
                                        // padding: 13,
                                        borderRadius: 7
                                    }} >
                                        <Text style={{
                                            textAlign: "center",
                                            color: "grey",
                                            fontWeight: 900,
                                            fontSize: 18
                                        }} >Login</Text>
                                    </View>

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, email: value })}
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
                                        label="Email"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="email" onPress={() => { console.log("hello") }} />}
                                    />

                                    <TextInput
                                        onChangeText={(value) => setData({ ...data, password: value })}
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
                                        label="Password"
                                        // placeholder="Type something"
                                        left={<TextInput.Icon icon="lock" />}
                                    />

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "85%", }} >

                                        <PrimaryButton style={{ width: "100%" }} callBack={LoginCallback} title="Login" />
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




function Login({ navigation, disp_user, appState, disp_surprise, route }) {
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
    }, [])

    return (

        <>


            <SafeAreaView>
                <ScrollView >
                    <Loader loading={loading} />
                    <View style={{ position: 'relative', height: height / 1.15, }}>
                        {/* <Onboarding /> */}
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center", marginTop: 40
                        }} >
                            <Logo />
                        </View>
                        <MyTextInput value={text}
                            onChangeText={handleTextChange}
                            setGender={setGender}
                            gender={gender}
                            setShowDatePicker={setShowDatePicker}
                            date={date}
                            onDateChange={onDateChange}
                            showDatePicker={showDatePicker}
                            setChecked={setChecked}
                            checked={checked}
                            data={data}
                            setData={setData}
                            setLoading={setLoading}
                            navigation={navigation}
                            appState={appState}
                            disp_user={disp_user}
                            disp_surprise={disp_surprise}
                            authReroute={authReroute}
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
                                }} >Swipe between Login and Signup.</Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
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
        disp_user: (payload) => dispatch(user_state(payload)),
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);



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

