import {
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { Authenticating_fellowship, DispMeeting, surprise_state, user_state } from '../../redux';
import { Picker } from '@react-native-picker/picker';
import { BoldText2 } from '../../components/text';
import { CurrentDate, CurrentTime } from '../../utilities';
import { supabase } from '../../config/supabase';

const Colors = Color()


function Createmeeting({ navigation, disp_user, appState, disp_Meeting, route }) {
    const User = appState.User;
    const Meetings = appState.Meetings
    const [loading, setloading] = useState(false);

    const [fellowship, setFellowship] = useState();
    const [title, setTitle] = useState("");
    const [venue, setvenue] = useState("");

    function CreateMeeting() {
        if (title.length < 5 || venue.length < 5 || !fellowship) {
            Alert.alert("Error", "Provide all details")
        } else {
            setloading(true)
            supabase
                .from("meetings")
                .upsert({
                    fellowship: fellowship,
                    title: title,
                    venue: venue,
                    date: CurrentDate(),
                    time: CurrentTime(),
                    by: User.phone,
                    byName: User.name
                })
                .select()
                .then(response => {
                    if (response.error != null) {
                        Alert.alert("Error", response.error.message)
                    } else {
                        Meetings.push(response.data[0])
                        disp_Meeting(Meetings)
                        navigation.pop()
                    }
                    setloading(false)
                })
                .catch(error => {
                    setloading(false)
                })
        }
    }


    useEffect(() => {

    }, [])

    return (

        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={{ width: "100%" }} >

                        <Text style={{
                            // marginLeft: "5%",
                            marginTop: 25,
                            marginBottom: 4,
                            color: Colors.dark
                        }}>Select Fellowship</Text>
                        <View
                            style={{
                                backgroundColor: Colors.light,
                                color: Colors.dark,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: Colors.dark,
                                // marginLeft: "5%",
                                // width: "90%"
                            }}
                        >
                            <Picker
                                dropdownIconColor={Colors.dark}
                                selectedValue={fellowship}
                                style={{ color: Colors.dark }}
                                onValueChange={(itemValue, itemIndex) => {
                                    if (itemValue) {
                                        let filter = User.role.fellowshipHead != false && User.role.fellowshipHead.fellowship.filter(e => e == itemValue);
                                        // console.log(filter)
                                        if (filter == false) {
                                            let filter2 = User.role.fellowshipOfficer != false && User.role.fellowshipOfficer.fellowship.filter(e => e == itemValue);
                                            if (filter2 == false) {
                                                Alert.alert("Error", `You do not have administrative right to create meeting attendance for ${itemValue} ${User.state} `)
                                            } else {
                                                setFellowship(itemValue)
                                            }
                                        } else {
                                            setFellowship(itemValue)
                                        }
                                    }
                                }
                                }
                            >
                                <Picker.Item label="Select fellowship" value={null} />
                                {
                                    User.fellowship.map((e, index) => {
                                        return <Picker.Item key={index} label={e.fellowship} value={e.fellowship} />

                                    })
                                }
                            </Picker>

                        </View>


                        <TextInput
                            // autoFocus
                            value={title}
                            onChangeText={(value) => { setTitle(value) }}
                            style={{ width: "100%", marginTop: 30 }}
                            textColor={Colors.dark}
                            theme={{
                                colors: {
                                    primary: Colors.grey,
                                    background: 'white',
                                    placeholder: "red",
                                },
                                roundness: 8,
                            }}
                            mode="outlined"
                            label="Meeting title"
                        />
                        <TextInput
                            // autoFocus
                            value={venue}
                            onChangeText={(value) => { setvenue(value) }}
                            style={{ width: "100%", marginTop: 30 }}
                            textColor={Colors.dark}
                            theme={{
                                colors: {
                                    primary: Colors.grey,
                                    background: 'white',
                                    placeholder: "red",
                                },
                                roundness: 8,
                            }}
                            mode="outlined"
                            label="Meeting venue"
                        />

                        <BoldText2 style={{ fontSize: 10, marginTop: 30 }} text={`${CurrentDate()}  :  ${CurrentTime()}`} color="black" />

                    </View>

                    <PrimaryButton
                        loading={loading}
                        style={{ width: "100%", textTransform: 'uppercase', }}
                        callBack={() => {
                            CreateMeeting()
                        }} title={`Create `} />
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
        disp_user: (payload) => dispatch(user_state(payload)),
        disp_Meeting: (payload) => dispatch(DispMeeting(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Createmeeting);



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        // marginBottom: 10,
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
    },

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        // backgroundColor:"red", 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        width: '92%',
    },
});

