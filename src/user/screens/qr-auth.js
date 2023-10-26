import {
    StyleSheet, Alert, Modal,
    View, Text, TouchableOpacity, Pressable
} from 'react-native';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { Authenticating_fellowship, DispMeeting, surprise_state, user_state } from '../../redux';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { PrimaryButton } from '../../components/buttons/primary';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { CurrentDate, CurrentTime } from '../../utilities';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faQrcode, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Divider } from 'react-native-paper';
import { supabase } from '../../config/supabase';

const Colors = Color()



function QRAUTH({ navigation, appState, disp_Meeting, disp_AuthFellowship }) {
    const [drawerState, setdrawerState] = useState(0)
    const User = appState.User
    const Meetings = appState.Meetings
    const [loading, setloading] = useState(true);
    const [priviledge, setpriviledge] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    function FetchMeetings() {
        if (User.role.fellowshipOfficer) {
            let fellowship = User.role.fellowshipOfficer.fellowship[0]
            supabase
                .from("meetings")
                .select("*")
                .eq("fellowship", fellowship)
                // .eq("by", User.phone)
                .order('id', { ascending: false })
                .then(response => {
                    if (response.error != null) {
                        Alert.alert("Error", response.error.message)
                    } else {
                        // Meetings.push(response.data[0])
                        disp_Meeting(response.data)
                    }
                    setloading(false)
                    // console.log(response.data)
                })
                .catch(error => {
                    setloading(false)
                    // console.log(error)
                })
        }
    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            //  check if user has privilages
            if (User.role.fellowshipHead != false) {
                setpriviledge(true)
            }
            if (User.role.fellowshipOfficer) {
                setpriviledge(true)
            }

            // ================================================

            FetchMeetings()
            console.log("Fetching meetings")
        });

        // Remove event listener when the component unmounts
        return () => {
            unsubscribe;
        };

    }, [navigation])



    return (

        <>
            <SafeAreaView style={styles.container}>

                {priviledge == true &&
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(true)
                                }}
                                style={[{ flex: 1, alignItems: "center" }]} >
                                <FontAwesomeIcon size={18} style={{}} icon={faQrcode} />
                                <Text style={[Style.TextLink, { textAlign: "center" }]} >Your code</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { navigation.navigate("Create meeting") }}
                                style={[{ flex: 1 }]} >
                                <Text style={[Style.TextLink, { textAlign: "center" }]} >Create meeting</Text>
                            </TouchableOpacity>
                            <Divider style={{ marginVertical: 30, }} />
                        </View>
                    </>
                }




                {priviledge == true && Meetings.length < 1 && <>
                    <View style={{
                        padding: 10,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: "grey",
                        height: 400
                    }} >
                        <BoldText1 text="No available meetings" color="grey" />
                    </View>
                </>}




                {priviledge == true ? <>
                    <ScrollView >
                        <View style={{ padding: 10, flex: 1, alignItems: "center" }}>

                            {Meetings.map((data, index) => {
                                return <>
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            disp_AuthFellowship(data)
                                            navigation.navigate("Verify-auht")
                                        }} style={{
                                            // height: 100,
                                            marginTop: 20,
                                            width: "95%",
                                            backgroundColor: data.closed == true ? Colors.light : Colors.lightgrey,
                                            borderRadius: 10,
                                            padding: 15,
                                            elevation: 2,
                                        }} >
                                        <BoldText2 color="black" text={data.title} />
                                        <BoldText1 color="black" text={data.venue} />
                                        <BoldText1 style={{ fontSize: 10 }} text={`${data.date}    ${data.time}`} color="black" />

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
                                            <Text style={{ color: Colors.primary }}>{data.attendance_data.length}</Text>
                                        </View>
                                    </Pressable>

                                </>
                            })}
                        </View>
                    </ScrollView>

                </> : <>

                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
                        <View style={{
                            width: "100%",
                            height: 400,
                            // padding: 10, 
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Colors.light2,
                            elevation: 2,
                            marginTop: -100,
                            // flex: 1
                        }} >

                            <QRCode
                                size={250}
                                value={`${Date.now()}:${User.id}:${Date.now()}`}
                            />
                            <BoldText3 style={{ marginTop: 10 }} text={User.name} color="black" />

                            <BoldText1
                                text="This QR Code is only for the purpose of meeting authentication. Present it to any fellowship head or officer."
                                color="grey"
                            />
                        </View>
                    </View>


                </>}





            </SafeAreaView>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false)
                        }}
                        style={{
                            position: "absolute",
                            left: 10,
                            top: 10
                        }} >
                        <FontAwesomeIcon size={28} style={{ color: "crimson" }} icon={faClose} />
                    </TouchableOpacity>
                    <View style={{
                        width: "100%",
                        height: 400,
                        // padding: 10, 
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Colors.light2,
                        elevation: 2,
                        marginTop: -100,
                        // flex: 1
                    }} >

                        <QRCode
                            size={250}
                            value={`${Date.now()}:${User.id}:${Date.now()}`}
                        />
                        <BoldText3 style={{ marginTop: 10 }} text={User.name} color="black" />

                        <BoldText1
                            text="This QR Code is only for the purpose of meeting authentication. Present it to any fellowship head or officer."
                            color="grey"
                        />
                    </View>
                </View>

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
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
        disp_Meeting: (payload) => dispatch(DispMeeting(payload)),
        disp_AuthFellowship: (payload) => dispatch(Authenticating_fellowship(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(QRAUTH);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        // marginTop: 20
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 65,
        // backgroundColor: "red"
    },


    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

