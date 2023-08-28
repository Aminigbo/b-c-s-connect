import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { Color } from '../../components/theme';
import { CustomLogin, SaveMetadata, fetchMetadata, localstorageSaveUserMedata, signinService, signupService } from '../../controllers/auth/authController';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import FilterButton from '../../components/buttons/filterButton';
import { faFileEdit, faFilter, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FeedCard } from '../components/feed-card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Events({ navigation, disp_user, appState, disp_surprise, route }) {
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const { height } = Dimensions.get('window');
    const handleTextChange = useCallback((value) => {
        setText(value);
    }, [setText]);


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)


    useEffect(() => {


        const unsubscribe = navigation.addListener('focus', async () => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 10);
            console.log("events")
        });

        return unsubscribe;
    }, [navigation])
    return (

        <>
            {/* <FilterButton title="Filter" icon={faFilter} onPress={() => {
                navigation.navigate("Payments")
            }} /> */}
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: 20,
                backgroundColor: Colors.light,
                // backgroundColor: "green",
                // marginBottom: 15,
                position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 50,
                // paddingBottom: 22
            }} >
                <Pressable style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "flex-start",
                    marginLeft: 20
                }} >
                    <FontAwesomeIcon style={{
                        color: Colors.primary,

                    }} size={23} icon={faSearch} />
                </Pressable>

                <Pressable style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "flex-end",
                    marginRight: 20
                }} >
                    <FontAwesomeIcon style={{
                        color: Colors.primary,

                    }} size={23} icon={faPlusSquare} />
                </Pressable>

            </View >
            {
                loading == true ?
                    <>
                        <View style={{
                            justifyContent: "center",
                            flex: 1
                        }} >
                            <ActivityIndicator />
                        </View>
                    </>
                    :
                    <>

                        <SafeAreaView style={styles.container}>
                            <ScrollView>
                                <View style={styles.content}>

                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 3, 4, 5, 6, 7, 8, 9, 11, 12, 122].map((e, index) => {
                                            return (
                                                <>
                                                    <FeedCard Navigation={navigation} key={index} />
                                                </>
                                            )
                                        })
                                    }

                                </View>
                            </ScrollView>
                        </SafeAreaView>

                    </>
            }


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


export default connect(mapStateToProps, mapDispatchToProps)(Events);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 15,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: "red",
        marginTop: 50
    },

    textInput: {
        width: "70%",
        backgroundColor: Colors.light,
        height: 50,
        // borderWidth: 1,
        // borderColor: 'gray',
        // paddingLeft: 10,
        // borderRadius: 76, // Add a borderRadius of 16
    },

});

