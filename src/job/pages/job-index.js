import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    StatusBar, ActivityIndicator,
    Modal,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faBackward, faCalendar, faCheckCircle, faCheckSquare, faEdit, faSquare, faPlusSquare, faTimes, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../../components/icons';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader, LoaderComponent } from '../../components/loader';
import { connect } from 'react-redux';
import { FetchJobs, FetchUserTime, surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CampaignCard } from '../components/job-card';
import FilterButton from '../../components/buttons/filterButton';
import { FetchAllJobs } from '../models';
import { Style } from '../../../assets/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateJobs } from '../controllers/job-controller';
import { CurrentDate } from '../../utilities';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Job({ navigation, disp_user, appState, disp_surprise, route, disp_Jobs, disp_fetchTime }) {
    const [selectedValue, setselectedValue] = useState({
        employer: "Me",
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    const User = appState.User;
    const Jobs = appState.Jobs;
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState()
    const [step, setStep] = useState("1") //


    const [JobState, setJobState] = useState()

    function AvailableJobs() {
        setLoading(true)

        const Fetch = () => {
            FetchAllJobs()
                .then(res => {
                    setLoading(false)
                    if (res.data == null) {
                        if (res.error != null) {
                            alert("A network error occured, make sure you are connected to the internet.")
                        }
                    } else {
                        let ActiveJobs = res.data.filter(e => new Date(e.meta.deadline) > new Date())
                        console.log(ActiveJobs.length)
                        disp_Jobs(ActiveJobs)
                        setJobState(ActiveJobs)
                        setModalVisible(false)
                        setStep("1")
                        disp_fetchTime({
                            ...appState.FetchUserTime,
                            jobFetch: CurrentDate()
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if (Jobs.length > 0) {

            FetchAllJobs()
                .then(response => {
                    setLoading(false)
                    console.log(response)
                    if (response.success == true) {
                        disp_Jobs(response.data)
                        setModalVisible(false)
                        setStep("1")
                    } else {
                        disp_Jobs([])
                        setModalVisible(false)
                        setStep("1")
                    }
                })

        } else {
            FetchAllJobs()
                .then(response => {
                    setLoading(false)

                    if (response.success == true) {
                        disp_Jobs(response.data)
                        setJobState(response.data)
                        setModalVisible(false)
                        setStep("1")
                    } else {
                        setModalVisible(false)
                        setStep("1")
                        disp_Jobs([])
                        setJobState([])
                    }
                })
        }

    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            AvailableJobs()
        });

        return unsubscribe;
    }, [navigation])



    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );


    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Calculate the timestamp for 5 days from now (in milliseconds)
    const fiveDaysFromNow = currentTimestamp + (5 * 24 * 60 * 60 * 1000);

    const [date, setDate] = useState(new Date(fiveDaysFromNow));
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const PostJob = () => {

        let company = "";
        if (selectedValue.employerType == "Me") {
            company == User.name
        } else {
            company == selectedValue.employer
        }
        setLoading(true)
        let payload = {
            title: selectedValue.title,
            employerType: selectedValue.employerType,
            company: selectedValue.employer,
            location: selectedValue.location,
            worktplaceype: selectedValue.workplacetype,
            jobtype: selectedValue.jobtype,
            date: date,
            salary: selectedValue.salary,
            description: selectedValue.description,
            Alert,
            User,
            setModalVisible,
            setLoading,
            AvailableJobs
        }
        CreateJobs(payload)
    }


    return (

        <>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: 20,
                backgroundColor: Colors.light,
                // backgroundColor: "green",
                // marginBottom: 15,
                position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 50,
                // paddingBottom: 22
            }} >
                <Pressable style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "flex-start",
                    marginLeft: 20
                }} >
                    <Text style={{ color: Colors.dark }} >
                        Active jobs
                        ({Jobs.length})
                    </Text>
                </Pressable>



                <TouchableOpacity
                    onPress={() => { setModalVisible(true) }}
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "flex-end",
                        paddingRight: 20,
                    }} >
                    <FontAwesomeIcon style={{
                        color: Colors.primary,

                    }} size={23} icon={faPlusSquare} />
                </TouchableOpacity>

            </View >


            {loading == true &&
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
            }
            <>
                <SafeAreaView style={
                    {
                        // backgroundColor: 'red',
                        marginTop: 50
                    }
                }>
                    <StatusBar
                        animated={true}
                        backgroundColor={Colors.light}
                        barStyle={statusBarStyle}
                        showHideTransition={statusBarTransition}
                        hidden={hidden}
                    />
                    <ScrollView>

                        {
                            Jobs.length > 0 ?
                                <>
                                    {
                                        Jobs.map((e, index) => {
                                            return (
                                                <CampaignCard data={e} navigation={navigation} key={index} />
                                            )
                                        })
                                    }
                                </> :

                                <>
                                    {loading == false && <Logo />}
                                </>
                        }
                    </ScrollView>
                </SafeAreaView>
            </>


            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        if (step == "2") {
                            setStep("1")
                        } else {
                            setModalVisible(!modalVisible);
                        }
                        // Alert.alert('Modal has been closed.');
                    }}>

                    <View style={styles.content}>

                        <View style={{ width: "100%" }} >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }} >
                                <View>
                                    <Text style={[Style.boldText2, { marginTop: 10, marginBottom: 4 }]}>Post Job</Text>
                                    <Text style={{ marginBottom: 4, color: Colors.dark }}>Tell us who you are hiring</Text>
                                </View>

                                <Pressable
                                    onPress={() => {

                                        if (step == "2") {
                                            setStep("1")
                                        } else {
                                            setModalVisible(false)
                                        }
                                    }}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        // backgroundColor:"red", 
                                        alignItems: "center"
                                    }} >
                                    {
                                        step == "1" ?
                                            <>
                                                <Text style={[Style.TextLink]} >Close</Text>
                                                <FontAwesomeIcon size={19} style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                    opacity: 0.8,
                                                    marginLeft: 10
                                                    // margin: 20,
                                                }}
                                                    icon={step == "1" ? faTimes : faArrowLeftLong} />
                                            </> :
                                            <>
                                                <FontAwesomeIcon size={19} style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                    opacity: 0.8,
                                                    marginRight: 10
                                                    // margin: 20,
                                                }}
                                                    icon={step == "1" ? faTimes : faArrowLeftLong} />
                                                <Text style={[Style.TextLink]} >Back</Text>
                                            </>
                                    }

                                </Pressable>
                            </View>

                            {
                                step == "1" ?
                                    <View>
                                        {/* <Text style={{ marginTop: 30, marginBottom: 12, color: Colors.dark }}>Provide phone number</Text> */}
                                        <TextInput
                                            // autoFocus
                                            value={selectedValue.title}
                                            onChangeText={(value) => setselectedValue({ ...selectedValue, title: value })}
                                            style={{ width: "100%", marginTop: 25, }}
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
                                            label="Job title *"
                                        />

                                        <Text style={{ marginTop: 25, marginBottom: 4, color: Colors.dark }}>Who is employing?</Text>
                                        <View
                                            style={{
                                                backgroundColor: Colors.light,
                                                color: Colors.dark,
                                                borderRadius: 10,
                                                // marginBottom: 10,
                                                borderWidth: 0.5,
                                                borderColor: Colors.dark
                                            }}
                                        >
                                            <Picker
                                                dropdownIconColor={Colors.dark}
                                                selectedValue={selectedValue.employerType}
                                                style={{ color: Colors.dark }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        employerType: itemValue
                                                    })
                                                }
                                                }
                                            >
                                                <Picker.Item label="Select recruiter" value={null} />
                                                <Picker.Item label="Me" value="Me" />
                                                <Picker.Item label="Registered Business" value="Registered Business" />
                                                <Picker.Item label="Private Individual" value="Private Individual" />
                                            </Picker>

                                        </View>

                                        {selectedValue.employerType != "Me" && selectedValue.employerType != null &&
                                            <TextInput
                                                // autoFocus
                                                value={selectedValue.employer}
                                                onChangeText={(value) => setselectedValue({ ...selectedValue, employer: value })}
                                                style={{ width: "100%", marginTop: 20, color: Colors.dark }}
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
                                                label={selectedValue.employerType == "Registered Business" ? "Company name *" : "Name of employer *"}
                                            />}

                                        <TextInput
                                            // autoFocus
                                            value={selectedValue.location}
                                            onChangeText={(value) => setselectedValue({ ...selectedValue, location: value })}
                                            style={{ width: "100%", marginTop: 20, }}
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
                                            label="Job location *"
                                        />

                                        <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>Workplace type</Text>
                                        <View
                                            style={{
                                                backgroundColor: Colors.light,
                                                color: Colors.dark,
                                                borderRadius: 10,
                                                // marginBottom: 10,
                                                borderWidth: 0.5,
                                                borderColor: Colors.dark
                                            }}
                                        >
                                            <Picker
                                                dropdownIconColor={Colors.dark}
                                                selectedValue={selectedValue.workplacetype}
                                                style={{ color: Colors.dark }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        workplacetype: itemValue
                                                    })
                                                }
                                                }
                                            >

                                                <Picker.Item label="Select Workplace type" value={null} />
                                                <Picker.Item label="On-Site" value="On-Site" />
                                                <Picker.Item label="Hybrid" value="Hybrid" />
                                                <Picker.Item label="Remote" value="Remote" />
                                            </Picker>
                                        </View>




                                    </View> :

                                    <View>


                                        <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>Job type</Text>
                                        <View
                                            style={{
                                                backgroundColor: Colors.light,
                                                color: Colors.dark,
                                                borderRadius: 10,
                                                // marginBottom: 10,
                                                borderWidth: 0.5,
                                                borderColor: Colors.dark
                                            }}
                                        >
                                            <Picker
                                                dropdownIconColor={Colors.dark}
                                                style={{ color: Colors.dark }}
                                                selectedValue={selectedValue.jobtype}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setselectedValue({
                                                        ...selectedValue,
                                                        jobtype: itemValue
                                                    })
                                                }
                                                }
                                            >

                                                <Picker.Item label="Select Job type" value={null} />
                                                <Picker.Item label="Full-time" value="Full-time" />
                                                <Picker.Item label="Part-time" value="Part-time" />
                                                <Picker.Item label="Contract" value="Contract" />
                                                <Picker.Item label="Temporary" value="Temporary" />
                                                <Picker.Item label="Volunteer" value="Volunteer" />
                                                <Picker.Item label="Internship" value="Internship" />
                                            </Picker>
                                        </View>


                                        <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>Application deadline</Text>

                                        <SecondaryButton
                                            icon
                                            style={{
                                                width: "100%",
                                                textTransform: 'uppercase',
                                                marginTop: 5,
                                                backgroundColor: Colors.light,
                                                color: Colors.dark,
                                                borderWidth: 0.7,
                                                height: 50
                                            }} callBack={() => {
                                                setShow(true)
                                            }}
                                            titleColor={Colors.dark}
                                            title={data ? date.toLocaleString() : `Select application deadline`} />

                                        {
                                            show == true &&
                                            (
                                                <>
                                                    <DateTimePicker
                                                        display='spinner'
                                                        testID="dateTimePicker"
                                                        value={date}
                                                        mode="date"
                                                        is24Hour={true}
                                                        onChange={onChange}
                                                        maximumDate={new Date(2030, 10, 20)}
                                                        minimumDate={new Date()}
                                                    />
                                                </>
                                            )
                                        }


                                        <TextInput
                                            // autoFocus
                                            keyboardType="numeric"
                                            onChangeText={(value) => setselectedValue({
                                                ...selectedValue,
                                                salary: value
                                            })}
                                            style={{ width: "100%", marginTop: 20, }}
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
                                            label="Estimated salary *"
                                        />


                                        <TextInput
                                            // autoFocus
                                            value={selectedValue.description}
                                            onChangeText={(value) => setselectedValue({
                                                ...selectedValue,
                                                description: value
                                            })}
                                            style={{ width: "100%", height: 100, marginTop: 20, }}
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
                                            label="Add job description *"
                                        />



                                    </View>
                            }


                        </View>


                        <PrimaryButton style={{
                            width: "100%",
                            textTransform: 'uppercase',
                            marginBottom: 20
                        }} callBack={() => {
                            if (step == "1") {
                                setStep("2")
                            } else {
                                PostJob()
                            }
                        }}
                            loading={loading}
                            title={step == "1" ? "Next" : "Post job"} />
                    </View>


                </Modal>
            </View>



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
        disp_Jobs: (payload) => dispatch(FetchJobs(payload)),
        disp_fetchTime: (payload) => dispatch(FetchUserTime(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Job);



const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 65,
        // backgroundColor: "red"
        marginTop: 20,
        paddingHorizontal: 19
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

    // =========================
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
});

