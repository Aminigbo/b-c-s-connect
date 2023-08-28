import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import {
    Fell_to_pay,
    surprise_state, user_state
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { NoItems } from '../../utilities/404';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Details } from '../compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { HistoryCard } from '../components/history-cards';
import FloatingButton from '../../components/buttons/FloatingBtn';
import { AddFellowship, onboardedStates } from '../models';
import { DuesMonths, RegYears } from '../../utilities';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function AddNewFellowship({ route, appState, disp_user, disp_Fellowship }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const [loading, setloading] = useState(false)
    const navigation = useNavigation();
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
        // console.log(AllSurprises.length)
        // console.log("Sellect")
        // GetUser()
        if (route.params && route.params != undefined) {
            // console.log(route.params)
        } else {
            // console.log("XXNo params")
        }
        // console.log("XX", appState.User_State)
    }, [setUserState])


    const [PageState, setPageState] = useState("")

    const Fellowships = [
        { id: 1, label: '144 Virgins Body', value: '144 Virgins Body' },
        { id: 2, label: 'Patriarch Christ Shepherds (PCS)', value: 'Patriarch Christ Shepherds (PCS)' },
        { id: 3, label: 'Matriarch Christ Shepherds (MCS)', value: 'Matriarch Christ Shepherds (MCS)' },
        { id: 4, label: 'Archbishops', value: 'Archbishops' },
        { id: 5, label: 'Eminences', value: 'Eminences' },
        { id: 6, label: 'Christ Ambassadors', value: 'Christ Ambassadors' },
        { id: 7, label: 'Bishops', value: 'Bishops' },
        { id: 8, label: 'Divine Vanguards', value: 'Divine Vanguards' },
        { id: 9, label: 'Blessed Mothers', value: 'Blessed Mothers' },
        { id: 10, label: 'Senior Christ Servants (SCS)', value: 'Senior Christ Servants (SCS)' },
        { id: 11, label: 'True Christ Witness (TCW)', value: 'True Christ Witness (TCW)' },
        { id: 12, label: 'Christ Natural Preachers (CNP)', value: 'Christ Natural Preachers (CNP)' },
        { id: 13, label: 'Christ Practical Students (CPS)', value: 'Christ Practical Students (CPS)' },
        { id: 14, label: 'All Ordained Ones', value: 'All Ordained Ones' },
        { id: 15, label: 'Christ Universal Elders Fellowship', value: 'Christ Universal Elders Fellowship' },
        { id: 16, label: 'Christ Universal Spirited Children\'s Fellowship', value: 'Christ Universal Spirited Children\'s Fellowship' },
        { id: 17, label: 'Christ Universal Men\'s Fellowship (CUMF)', value: 'Christ Universal Men\'s Fellowship (CUMF)' },
        { id: 18, label: 'Christ Universal Women\'s Fellowship (CUWF)', value: 'Christ Universal Women\'s Fellowship (CUWF)' },
        { id: 19, label: 'Christ Universal General Fellowship', value: 'Christ Universal General Fellowship' },
        { id: 20, label: 'Christ Natural Choristers Fellowship (CNCF)', value: 'Christ Natural Choristers Fellowship (CNCF)' },
        { id: 21, label: 'Christ Universal Children\'s Fellowship (CUCF)', value: 'Christ Universal Children\'s Fellowship (CUCF)' },
        { id: 22, label: 'Christ Universal Education Fellowship', value: 'Christ Universal Education Fellowship' },
        { id: 23, label: 'Christ Universal Labour Fellowship', value: 'Christ Universal Labour Fellowship' },
        { id: 24, label: 'Christ Universal Youth Fellowship (CUYF)', value: 'Christ Universal Youth Fellowship (CUYF)' },
        { id: 25, label: 'Association of Brotherhood Academic Scholars (ABAS)', value: 'Association of Brotherhood Academic Scholars (ABAS)' },
        { id: 26, label: 'Christ Universal Mercy Fellowship', value: 'Christ Universal Mercy Fellowship' },
        { id: 27, label: 'Christ Universal Missionary Crusade Fellowship', value: 'Christ Universal Missionary Crusade Fellowship' },
        { id: 28, label: 'Blessed Brothers and Sisters Family Fellowship (BBSFF)', value: 'Blessed Brothers and Sisters Family Fellowship (BBSFF)' },
        { id: 29, label: 'Christ Universal Welfare Fellowship', value: 'Christ Universal Welfare Fellowship' },
        { id: 30, label: 'Christ Universal Vegetarians Fellowship', value: 'Christ Universal Vegetarians Fellowship' },
        { id: 31, label: 'Christ Universal Lawyers Fellowship', value: 'Christ Universal Lawyers Fellowship' },
        { id: 32, label: 'New World Fellowship', value: 'New World Fellowship' },
        { id: 33, label: 'Christ Universal Traditional Rulers' }
    ];


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
                    <ActivityIndicator color="white" />
                </View>
            }

            <SafeAreaView>
                <ScrollView>
                    <View style={{
                        borderRadius: 7,
                        flexDirection: "column",
                        // backgroundColor:"red",
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignContent: "space-around",
                        // marginTop: 10,
                        // padding: 7
                        // alignItems: "center"

                    }} >



                        {/* <Divider style={{ marginBottom: 10, }} /> */}

                        {
                            Fellowships.map((e, key) => {
                                return <Pressable
                                    key={key}
                                    onPress={async () => {
                                        setloading(true)
                                        const payload = {
                                            onboardfellowship: e.label,
                                            onboardstate: appState.User_State
                                        }
                                        onboardedStates(payload)
                                            .then(res => {
                                                if (res.error != null) {
                                                    setloading(false)
                                                    Alert.alert("Server unavailable", "Make sure you are connected to the internet.")
                                                } else {
                                                    if (!User) {
                                                        if (res.data.length < 1) {
                                                            setloading(false)
                                                            alert(`${e.label}  ${appState.User_State} is yet to join our innovative family. You'll be the first to know as soon as the Fellowship joins the family.`)
                                                        } else {
                                                            console.log(res)
                                                            disp_Fellowship({
                                                                fellowship: res.data[0].fellowship,
                                                                id: e.id,
                                                                object:res.data[0]
                                                            })
                                                            setloading(false)
                                                            navigation.navigate("Signup")

                                                        }
                                                    } else {
                                                        if (res.data.length > 0) {
                                                            // navigation.pop(1)
                                                            // AsyncStorage.setItem("FELLOWSHIP", JSON.stringify(res.data[0]))
                                                            // console.log("Good to go")

                                                            let newData = {
                                                                id: e.id,
                                                                fellowship: e.label,
                                                                member: true,
                                                                approved: false,
                                                                Dues: DuesMonths(),
                                                                Registration: RegYears()
                                                            }
                                                            // let position = User.fellowship.findIndex(i => i.id == e.id)
                                                            let Filter = User.fellowship.filter(i => i.id == e.id)


                                                            if (Filter.length > 0) {
                                                                setloading(false)
                                                                Alert.alert("Sorry", `You are already a member of  ${e.label}  ${User.state},`, [
                                                                    {
                                                                        text: "Ok", onPress: () => {
                                                                            // navigation.pop(1)
                                                                        }
                                                                    }
                                                                ])
                                                            } else {
                                                                User.fellowship.push(newData)
                                                                const payload = {
                                                                    data: User.fellowship,
                                                                    user: User.phone
                                                                }
                                                                // setloading(false)

                                                                AddFellowship(payload)
                                                                    .then(res => {
                                                                        setloading(false)
                                                                        if (res.error == null) {
                                                                            // AsyncStorage.setItem("FELLOWSHIP", JSON.stringify(res.data[0]))
                                                                            // setsuccess(true)
                                                                            disp_user({
                                                                                ...User,
                                                                                fellowship: User.fellowship
                                                                            })

                                                                            Alert.alert("Success", `You have requested to join ${e.label}  ${appState.User_State}, An admin will review your request as soon as possible`, [
                                                                                {
                                                                                    text: "Ok", onPress: () => {
                                                                                        navigation.pop(1)
                                                                                    }
                                                                                }
                                                                            ])
                                                                        } else {
                                                                            setloading(false)
                                                                            alert(`${e.label}  ${appState.User_State} is yet to join our innovative family. You'll be the first to know as soon as the Fellowship joins the family.`)
                                                                        }
                                                                    })


                                                            }
                                                            // User.fellowship.splice(position, 1, newData) 



                                                        } else {
                                                            setloading(false)
                                                            alert(`${e.label}  ${appState.User_State} is yet to join our innovative family. You'll be the first to know as soon as the Fellowship joins the family.`)
                                                        }
                                                    }
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                console.log("User===", User)
                                                setloading(false)
                                                alert("An error occured")
                                            })

                                    }}
                                    style={{
                                        // // display: "flex",
                                        padding: 12,
                                        borderRadius: 5,
                                        // marginBottom: 10,
                                        // // flex:1,
                                        // borderColor: "red",
                                        // // borderWidth: 2,

                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        // marginTop: 3,
                                        zIndex: 2000,
                                        width: "100%",
                                        backgroundColor: Colors.light


                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.dark,
                                            fontSize: 15,
                                            fontWeight: 500,
                                            marginRight: 20,
                                        }}>
                                        {e.label}
                                    </Text>
                                    <FontAwesomeIcon style={{
                                        flex: 1,
                                        color: Colors.lightgrey,
                                    }} size={20} icon={faCheckSquare} />
                                </Pressable>
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
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
        disp_Fellowship: (payload) => dispatch(Fell_to_pay(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewFellowship);




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