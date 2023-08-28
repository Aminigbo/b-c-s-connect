import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode, faSquare }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuth } from '../../controllers/auth/authController';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { BackIcon, CartIcon, HomeIcon, OpenDrawer } from '../../components/icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import {
    SelectedState, 
} from "../../redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { NoItems } from '../../utilities/404';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { Details } from '../compnents/details-list';
import { Certificates } from '../../components/certification/cert-list';
import { HistoryCard } from '../components/history-cards';
import FloatingButton from '../../components/buttons/FloatingBtn';
import { AllStates } from '../../utilities/data';
import { Style } from '../../../assets/styles';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function SelectState({ route, appState, disp_state }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const navigation = useNavigation();
    const GetUser = () => {
        if (User == undefined) {
            isAuth().then(res => {
                console.log(res)
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
        console.log("Sellect")
        // GetUser()
        // if (route.params && route.params != undefined) {
        //     console.log(route.params)
        //     let routeParams = route.params.data
        // } else {
        //     console.log("No params")
        // }
    }, [setUserState])

    const [pick, setPick] = useState()
    return (
        <>
            {console.log(appState.User_State)}
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
                        marginBottom: 10,
                        // padding: 7
                        // alignItems: "center"

                    }} >



                        {/* <Divider style={{ marginBottom: 10, }} /> */}

                        {
                            AllStates.map((e, key) => {
                                return <Pressable
                                    key={key}
                                    onPress={() => {
                                        navigation.navigate('Finance', { screen: 'Save-fellowship' })
                                        disp_state(e.label)
                                        // console.log(appState.User_State)
                                        console.log(e)
                                        // await AsyncStorage.setItem("STATE", JSON.stringify(e))
                                        setPick(key)
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
                                    <View style={{ flex: 5 }} >
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                        }} >
                                            <Text style={[Style.boldText, {}]} >
                                                Brotherhood Of The Cross And Star {e.label}

                                            </Text>
                                            {/* <FontAwesomeIcon style={{
                                                flex: 1,
                                                color: Colors.primary,
                                                marginLeft: 10

                                            }} size={15} icon={faCheckCircle} /> */}
                                        </View>
                                        <Text style={[Style.Text, { marginTop: 10 }]}>
                                            {e.label}
                                        </Text>
                                        <Divider style={{ marginTop: 15, marginBottom: -15 }} />
                                    </View>


                                    {pick == key ?
                                        <FontAwesomeIcon style={{
                                            marginLeft: 10,
                                            color: Colors.primary,
                                        }} size={20} icon={faCheckSquare} /> :
                                        <FontAwesomeIcon style={{
                                            marginLeft: 10,
                                            color: Colors.lightgrey,
                                        }} size={20} icon={faSquare} />}
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
        disp_state: (payload) => dispatch(SelectedState(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SelectState);




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