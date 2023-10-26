import {
    StyleSheet,
    View,
    Text,
    Pressable, Alert,
    Image, Dimensions, ImageBackground, ActivityIndicator,
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
    Connect_user,
    myNotification,
    surprise_state
} from "../../redux";
import { Color } from '../../components/theme';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { isAuth } from '../../controllers/auth/authController';
import { HistoryCard } from '../../finance/components/history-cards';
import { NotificationCard } from '../compnents/notification-card';
import { FetchAllNotifications } from '../models';


const { height, width } = Dimensions.get('window');
const Colors = Color()

function Notifications({ route, appState, disp_viewUser, disp_notification }) {
    const [userState, setUserState] = useState()
    const User = appState.User;
    const Notifications = appState.Notifications;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {

            // setLoading(true)
            FetchAllNotifications(User.phone)
                .then(response => {
                    // setLoading(false)
                    // console.log(response)
                    disp_notification(response.data)
                })
                .catch(error => {
                    // setLoading(false)
                    console.log(error)
                })
            console.log("Notifications")

        });
        // console.log(Brethren[0].name)
        return unsubscribe;



    }, [navigation])




    return (
        <>
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
                    <ActivityIndicator color={Colors.primary} />
                </View>
            }
            <SafeAreaView style={{ flex: 1 }}>
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
                            Notifications && Notifications.length < 1 ?
                                <>
                                    <View style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 300
                                    }} >
                                        <Text style={{ color: "grey" }} >No notifiction</Text>
                                    </View>
                                </> :
                                <>
                                    {Notifications && Notifications.map((e, key) => {
                                        return (
                                            <NotificationCard
                                                User={User}
                                                disp_notification={disp_notification}
                                                disp_viewUser={disp_viewUser}
                                                data={e}
                                                navigation={navigation}
                                                key={key}
                                                Notifications={Notifications} />
                                        )
                                    })
                                    }</>
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
        disp_viewUser: (payload) => dispatch(Connect_user(payload)), // when tap on any user, dispatch their data to state
        disp_notification: (payload) => dispatch(myNotification(payload)),
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