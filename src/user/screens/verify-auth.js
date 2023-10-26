import {
    StyleSheet, Alert, Pressable,
    View, Text, TouchableOpacity,
    BackHandler, Image, Modal
} from 'react-native';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { Authenticating_fellowship, Connect_user, surprise_state, user_state } from '../../redux';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { PillButton, PrimaryButton } from '../../components/buttons/primary';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { NameDisplay } from '../../bcs-connect/components/name-display';
import { Divider, Avatar } from 'react-native-paper';
import { UserTitle } from '../../bcs-connect/components/title-display';
import { CurrentDate, CurrentTime } from '../../utilities';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../config/supabase';

const Colors = Color()



function Meetingattendance({ navigation, appState, route, disp_AuthFellowship, disp_viewUser }) {
    const ScannedUser = appState.ScannedUser[0]
    const User = appState.User;
    const [loading, setloading] = useState(false);
    const MeetingData = appState.AuthFellowship;
    const AllMeetings = appState.Meetings;
    const [modalVisible, setModalVisible] = useState(false)


    function EndMeeting(redirect) {
        setloading(true)
        let newMeetingData = {
            ...MeetingData,
            closed: true
        }
        disp_AuthFellowship(newMeetingData)
        let FindIndex = AllMeetings.findIndex(e => e.id == MeetingData.id)
        AllMeetings.splice(FindIndex, 1, newMeetingData)
        supabase
            .from("meetings")
            .update({ closed: true, attendance_data: MeetingData.attendance_data, attendance: MeetingData.attendance })
            .eq("id", MeetingData.id)
            .then(response => {
                if (response.error != null) {
                    Alert.alert("Error", response.error.message)
                } else {
                    setloading(false)
                }
                setloading(false)
                if (redirect) {
                    navigation.pop()
                }
            })
            .catch(error => {
                Alert.alert("Error", "An error occured")
            })
    }


    useEffect(() => {
        const handleBackButton = () => {
            if (MeetingData.closed != true && MeetingData.attendance_data.length > 0) {
                Alert.alert("Warning", "Leaving this page will automaticaly end your meeting, do you wish to continue?", [
                    { text: "End meeting", onPress: () => { EndMeeting("redirect") } },
                    { text: "Continue authentication", onPress: () => { } },
                ])
                // console.log(drawerState)
                return true; // Prevent default back button behavior
            }
            return false; // Allow default back button behavior
        };
        // Add event listener when the component mounts
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        const unsubscribe = navigation.addListener('focus', async () => {
            // console.log(route)

        });
        // Remove event listener when the component unmounts
        return () => {
            unsubscribe;
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
        // return unsubscribe;
    }, [navigation])


    return (

        <>
            <SafeAreaView style={styles.container}>
                <View style={{ alignItems: "flex-end" }}>
                    <PillButton
                        callBack={() => {
                            EndMeeting("redirect")
                        }}
                        style={{
                            width: 100,
                            marginRight: 15,
                            opacity: MeetingData.closed == true ? 0.3 : 1
                        }}
                        loading={loading} title="End meeting" />
                </View>
                <View style={styles.content}>


                    <View style={{
                        // height: 100,
                        width: "95%",
                        elevation: 2,
                        backgroundColor: Colors.light,
                        borderRadius: 10,
                        padding: 15,
                        marginTop: 20
                    }} >
                        <Text style={{ color: Colors.primary }}>Meeting title</Text>
                        <BoldText2 color="black" text={MeetingData.title} />

                        <Text style={{ color: Colors.primary, marginTop: 17 }}>Meeting venue</Text>
                        <BoldText2 color="black" text={MeetingData.venue} />

                        <Text style={{ color: Colors.primary, marginTop: 17 }}>Date and Time</Text>
                        <BoldText2 style={{ fontSize: 10 }} text={`${MeetingData.date}    ${MeetingData.time}`} color="black" />

                        <Text style={{ color: Colors.primary, marginTop: 17 }}>Meeting created by</Text>
                        <BoldText2 style={{ fontSize: 10 }} text={MeetingData.byName} color="black" />

                        <View style={{
                            color: "red",
                            position: "absolute",
                            right: 20,
                            bottom: 10,
                            flexDirection: "column"
                        }}>
                            <FontAwesomeIcon size={20} style={{
                                flex: 1,
                                color: Colors.primary,
                                opacity: 0.8
                            }}
                                icon={faUserFriends} />
                            <BoldText2 style={{ fontSize: 10 }} text={MeetingData.attendance_data.length} color={Colors.primary} />
                        </View>
                    </View>
                    {route.params &&
                        <>
                            <View style={{
                                elevation: 2,
                                // height: 160,
                                width: "95%",
                                borderRadius: 3,
                                backgroundColor: Colors.secondary,
                                padding: 10,
                                flexDirection: "row",
                                marginTop: 50
                            }}>
                                <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center", }} >
                                    {ScannedUser && ScannedUser.img ?

                                        <Image
                                            style={{
                                                width: 50,
                                                height: 50,
                                                // marginTop: 20,
                                                borderRadius: 100,
                                            }}
                                            src={`https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/${ScannedUser.img}`}
                                            resizeMode={'cover'} /> :

                                        <>
                                            <Avatar.Text color={Colors.primary} size={50} label={`${ScannedUser && ScannedUser.name.split(" ")[0][0]} ${ScannedUser && ScannedUser.name.split(" ")[1][0]}`} />
                                        </>
                                    }
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                                        <Text style={{ color: "black", fontSize: 19, fontWeight: 700 }}> <NameDisplay user={ScannedUser && ScannedUser} /></Text>
                                        <BoldText1 style={{ fontSize: 10 }} text={ScannedUser && `0${ScannedUser.phone} | ${ScannedUser.meta.email}`} color="black" />
                                    </View>


                                </View>
                            </View>
                        </>
                    }

                </View>
                <View style={{ alignItems: "center", marginVertical: 30 }} >
                    {MeetingData.closed == true ? <>
                        <PrimaryButton title="See attendees"
                            callBack={() => {
                                // setModalVisible(true)
                                // console.log(MeetingData.attendance_data)
                                navigation.navigate("View-attendance")
                            }} />
                    </> : <>
                        {route.params ?
                            <PrimaryButton style={{
                                opacity: MeetingData.closed == true ? 0.3 : 1
                            }} title="Continue Authentication" callBack={() => {
                                if (MeetingData.closed == false) { navigation.navigate("Scan") }
                            }} /> :

                            <PrimaryButton title="Start Smart Authentication" style={{
                                opacity: MeetingData.closed == true ? 0.3 : 1
                            }} callBack={() => { if (MeetingData.closed == false) { navigation.navigate("Scan") } }} />}
                    </>}


                </View>
            </SafeAreaView >

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>

                <ScrollView>
                    <View style={{ marginTop: 30, alignItems: "center", paddingHorizontal: 20 }}>
                        <Text style={{ color: "black", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
                            Attendance for  {MeetingData.title}
                        </Text>
                        <BoldText1 style={{ fontSize: 10 }} text={`${MeetingData.date} || ${MeetingData.time}`} color="black" />
                    </View>

                    <Divider style={{ backgroundColor: "grey", height: 3 }} />

                    <View style={{ marginTop: 30 }}>
                        {MeetingData.attendance_data.map(e => {
                            return <>
                                <View style={{
                                    flex: 1,
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    // backgroundColor: Colors.lightgrey,
                                    width: "80%",
                                    marginLeft: "7%",
                                    borderRadius: 6,
                                    marginVertical: 3,

                                }}>
                                    <TouchableOpacity onPress={() => {
                                        disp_viewUser({
                                            meta: { phone: e.phone }
                                        })
                                        navigation.navigate("User-Profile", { e })
                                    }} >
                                        <View style={{}}>
                                            <Text style={{ color: "black", fontSize: 16, fontWeight: 700 }}>
                                                {e.gender == "male" ? "Bro." : "Sis."}  {e.name}
                                            </Text>
                                            <BoldText1 style={{ fontSize: 10 }} text={e && `0${e.phone} | ${e.email}`} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Divider style={{ backgroundColor: "lightgrey" }} />
                            </>
                        })}
                    </View>
                </ScrollView>

            </Modal>
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
        disp_AuthFellowship: (payload) => dispatch(Authenticating_fellowship(payload)),
        disp_viewUser: (payload) => dispatch(Connect_user(payload)), // when tap on any user, dispatch their data to state
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Meetingattendance);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        // backgroundColor: "red"
    },
});

