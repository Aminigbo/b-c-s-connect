import {
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faCalendar, faCheckSquare, faClose, faEye } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '../../components/buttons/primary';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import { Style } from '../../../assets/styles';
import { AddSkillset, deleteSkillset } from '../models/user-model';
import { Certificates } from '../../components/certification/cert-list';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Add_details({ navigation, disp_user, appState, disp_surprise, route }) {
    const User = appState.User;
    const [loading, setloading] = useState(false);
    const [checked, setChecked] = useState('first');

    const [data, setData] = useState();

    function AddSkill() {
        setloading(true)
        // let position = User.skills.findIndex(e => e == joined)
        User.skills.push(data)

        const payload = {
            data: User.skills,
            user: User.phone
        }
        let SkillPayload = { label: data, value: data }
        let New_User = {
            ...User,
            skills: User.skills
        }
        AddSkillset(payload)
            .then(res => {
                setloading(false)
                if (res.error == null) {
                    // setsuccess(true)
                    disp_user(New_User)
                    setData(" ")
                    Alert.alert("Success", `Skill added succesfully`,
                        [{
                            text: "Close", onPress: () => {
                                // navigation.navigate("Edit-profile")
                            }
                        }]
                    );
                }
            })


    }

    const Delete = (skill) => {
        setloading(true)
        let position = User.skills.findIndex(e => e == skill)
        User.skills.splice(position, 1)
        const payload = {
            data: User.skills,
            user: User.phone
        }
        let New_User = {
            ...User,
            skills: User.skills
        }
        deleteSkillset(payload)
            .then(res => {
                setloading(false)
                if (res.error == null) {
                    disp_user(New_User)
                    Alert.alert("Success", `Skill deleted succesfully`,
                        [{
                            text: "Close", onPress: () => {
                                // navigation.navigate("Edit-profile")
                            }
                        }]
                    );
                }
            })
    }

    useEffect(() => {
        console.log("Add screen")

    }, [])
    // const Type = route.params.type
    return (

        <>
            <View style={{
                display: "flex",
                flexDirection: "column",
                zIndex: 2000,
                width: "100%",
                // height: 50,
                paddingTop: 15,
                // paddingBottom: 10,
            }} >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    height: 40,
                    // paddingBottom:10
                }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Edit-profile")
                        }}
                        style={{
                            flex: 0, alignItems: "center",
                            // borderRadius: 8,
                            paddingTop: 10,
                            marginLeft: 20,
                            flexDirection: "row"
                        }} >

                        <FontAwesomeIcon size={16} style={{
                            flex: 1,
                            color: Colors.primary,
                            opacity: 0.8
                            // margin: 20,
                        }}
                            icon={faArrowLeftLong} />
                        <Text style={[Style.Text, { marginLeft: 5 }]} >
                            Add a skill you've acquired.
                        </Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity
                        onPress={() => {
                        }}
                        style={{
                            borderBottomWidth: 0, borderBottomColor: Colors.white,
                            //  backgroundColor:Colors.light,
                            paddingTop: 10,
                            borderRadius: 8,
                            flex: 1,
                            alignItems: "center",
                            marginRight: 20
                        }} >
                        <Text style={{
                            fontSize: 15, color: Colors.primary, flex: 1, fontWeight: 900
                        }} >Your Skils</Text>
                    </TouchableOpacity> */}

                </View>
            </View >


            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={{ width: "100%" }} >
                        <TextInput
                            autoFocus
                            value={data}
                            onChangeText={(value) => { setData(value) }}
                            style={{ width: "100%" }}
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
                            label={`Start typing your ......`}
                        // left={<TextInput.Icon icon="email" onPress={() => { console.log("hello") }} />}
                        />
                        {
                            User.skills.map((e, index) => {
                                console.log(e)
                                return (
                                    <>
                                        <View
                                            key={index}
                                            style={{
                                                // flex: 1,
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginTop: 27,
                                                paddingRight: 15,
                                                paddingLeft: 10,
                                                // backgroundColor:"red"
                                            }} >

                                            <View style={{
                                                flexDirection: "row",
                                                // marginRight: 20,
                                                // backgroundColor:"green",
                                                flex: 1,
                                                justifyContent: "space-between",
                                                // paddingLeft: 20

                                            }} >
                                                <FontAwesomeIcon size={14} style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                    opacity: 0.8
                                                    // margin: 20,
                                                }}
                                                    icon={faCheckSquare} />
                                                <Text style={[Style.boldText, { flex: 1, marginLeft: 10, marginTop: -2, }]} >{e}</Text>
                                                <TouchableOpacity style={{ flex: 2 }}
                                                    onPress={() => {
                                                        Delete(e)
                                                    }}
                                                >
                                                    <FontAwesomeIcon size={17} style={{
                                                        // flex: 1,
                                                        color: Colors.primary,
                                                        opacity: 0.8
                                                        // margin: 20,
                                                    }}
                                                        icon={faClose} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                                )
                            })
                        }

                    </View>

                    <PrimaryButton
                        loading={loading}
                        style={{ width: "100%", textTransform: 'uppercase', }}
                        callBack={() => {
                            AddSkill()
                        }} title={`Save `} />
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
        disp_surprise: (payload) => dispatch(surprise_state(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Add_details);



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

