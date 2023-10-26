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
import { FetchAllJobs, FetchAllUsersJobs } from '../models';
import { Style } from '../../../assets/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateJobs } from '../controllers/job-controller';
import { CurrentDate } from '../../utilities';
import { BoldText2 } from '../../components/text';
// import { monthNames } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function MyJobs({ navigation, disp_user, appState, disp_surprise, route, disp_Jobs, disp_fetchTime }) {
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

    function MyJobs() {
        setLoading(true)
        FetchAllUsersJobs(User.meta.email)
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

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            MyJobs()
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
                </View> :

                <>
                    <SafeAreaView style={
                        {
                            backgroundColor: Colors.light,
                            // marginTop: 50,
                            flex: 1
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
                                                    <CampaignCard  data={e} navigation={navigation} key={index} />
                                                )
                                            })
                                        }
                                    </> :

                                    <>
                                        {loading == false && <Logo type="MyJobs" />}
                                    </>
                            }
                        </ScrollView>
                    </SafeAreaView>
                </>

            } 

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


export default connect(mapStateToProps, mapDispatchToProps)(MyJobs);



const styles = StyleSheet.create({

    container: {
        flex: 1,


    },
    content: {
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 65,
        // backgroundColor: "red",
        marginTop: 20,
        paddingHorizontal: 19
    },


    inputIcon: {
        marginRight: 10,
    },

    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
        // backgroundColor:"red", 
    },

    // =========================
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
});

