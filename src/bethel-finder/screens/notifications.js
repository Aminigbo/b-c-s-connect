import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground,
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import React, { useEffect, useState } from 'react'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faAngleUp, faAngleLeft, faAngleRight, faBasketShopping, faCheck, faCheckDouble, faGifts, faLocationDot, faTree, faTreeCity, faTvAlt, faVideo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faUser, faCheckSquare, faUserAlt, faGlobeAfrica, faPhoneAlt, faMessage, faEnvelope, faDotCircle, faBriefcase, faPeopleArrows, faMoneyBill, faQrcode }
    from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { connect } from "react-redux";
import {
    surprise_state
} from "../../redux"; 
import { Color } from '../../components/theme';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { isAuth } from '../../controllers/auth/authController';
import { HistoryCard } from '../../finance/components/history-cards';
import { NotificationCard } from '../compnents/notification-card';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function Notifications({ route, appState, disp_surprise }) {
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
        // console.log("Account page")
        // GetUser()
        // if (route.params && route.params != undefined) {
        //     console.log(route.params)
        //     let routeParams = route.params.data
        // } else {
        //     console.log("No params")
        // }
        console.log("Finance history")
    }, [setUserState])




    return (
        <>
            
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
                        marginTop: 20
                        // alignItems: "center"

                    }} >



                        {/* <Divider style={{ marginBottom: 30, }} /> */}

                        {
                            User.meta.finance.map((e, key) => {
                                return (
                                    <NotificationCard data={e} navigation={navigation} key={key} />
                                    // <Text>Hello</Text>
                                )
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
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);




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