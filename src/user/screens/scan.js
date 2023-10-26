import {
    StyleSheet, Alert,
    View, Text, TouchableOpacity
} from 'react-native';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { Authenticating_fellowship, Scan_User, surprise_state } from '../../redux';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { PrimaryButton } from '../../components/buttons/primary';
import { BoldText1 } from '../../components/text';


const Colors = Color()



function Scan({ navigation, appState, disp_scanned_user, disp_AuthFellowship }) {
    const Brethren = appState.Brethren;
    const MeetingData = appState.AuthFellowship;
    const Meetings = appState.Meetings;

    useEffect(() => {


    }, [navigation])

    function Verify(e) {
        let scanData = e.data.split(":")[1]
        let UserData = Brethren.filter(e => e.id == scanData)
        disp_scanned_user(UserData)
        // =========================================

        // console.log("Scanned=======", UserData)
        // console.log("Meeting attendance=======", MeetingData.attendance_data)

        let filter = MeetingData.attendance_data.filter(e => e.phone == UserData[0].phone)
        let findIndex = MeetingData.attendance_data.findIndex(e => e.phone == UserData[0].phone)
        if (filter.length < 1) {
            let UserAttData = {
                name: UserData[0].name,
                phone: UserData[0].phone,
                gender: UserData[0].meta.gender,
                id: UserData[0].id
            }
            MeetingData.attendance_data.push(UserAttData)
            let newData = {
                ...MeetingData,
                attendance: MeetingData.attendance + 1,
            }
            disp_AuthFellowship(newData)
            Meetings.splice(findIndex, 1, newData)


            // ===============================================
            navigation.navigate("Verify-auht", { UserData });

        } else {
            Alert.alert("Error", "Already authenticated", [{
                text: "Got it",
                onPress: () => {
                    navigation.navigate("Verify-auht");
                }
            }])
        }

    }

    return (

        <>
            <SafeAreaView style={styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }} >

                    <QRCodeScanner
                        onRead={(e) => {
                            Verify(e)
                        }}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                        topContent={
                            <Text style={styles.centerText}>
                                Scan member's QR code to automatically authenticate them for meeting.
                            </Text>
                        }
                        bottomContent={
                            <BoldText1 text="Smart Meeting Authenticator" color="grey" />
                        }
                    />


                </View>
            </SafeAreaView>
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
        disp_scanned_user: (payload) => dispatch(Scan_User(payload)),
        disp_AuthFellowship: (payload) => dispatch(Authenticating_fellowship(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Scan);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
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

    buttonTouchable: {
        padding: 16
    }
});

