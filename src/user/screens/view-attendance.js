import {
    StyleSheet,
    View, Text, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { Authenticating_fellowship, Connect_user, user_state } from '../../redux';
import { BoldText1, } from '../../components/text';
import { Divider } from 'react-native-paper';

const Colors = Color()



function QRAUTH({ navigation, appState, route, disp_AuthFellowship, disp_viewUser }) {
    const ScannedUser = appState.ScannedUser[0]
    const User = appState.User;
    const [loading, setloading] = useState(false);
    const MeetingData = appState.AuthFellowship;
    const AllMeetings = appState.Meetings;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // console.log(route)

        });
        // Remove event listener when the component unmounts
        return () => {
            unsubscribe;
        };
        // return unsubscribe;
    }, [navigation])


    return (

        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
                        <Text style={{ color: "black", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
                            Attendance for  {MeetingData.title}
                        </Text>
                        <BoldText1 style={{ fontSize: 10 }} text={`${MeetingData.date} || ${MeetingData.time}`} color="black" />
                    </View>

                    <Divider style={{ backgroundColor: "grey", height: 3 }} />

                    <View style={{ marginTop: 30 }}>
                        {MeetingData.attendance_data.map(e => {
                            return <>

                                <TouchableOpacity onPress={() => {
                                    disp_viewUser({
                                        meta: { phone: e.phone }
                                    })
                                    navigation.navigate("User-Profile", { e })
                                }} ><View style={{
                                    flex: 1,
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    // backgroundColor: Colors.lightgrey,
                                    width: "80%",
                                    marginLeft: "7%",
                                    borderRadius: 6,
                                    marginVertical: 3,

                                }}>
                                        <View style={{}}>
                                            <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: 700 }}>
                                                {e.gender == "male" ? "Bro." : "Sis."}  {e.name}
                                            </Text>
                                            <BoldText1 style={{ fontSize: 10 }} text={e && `0${e.phone}`} color="black" />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <Divider style={{ backgroundColor: "lightgrey" }} />
                            </>
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView >
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


export default connect(mapStateToProps, mapDispatchToProps)(QRAUTH);



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

