import {
    StyleSheet,
    View,
    Text,
    Pressable, Image, Dimensions, Alert,
    ActivityIndicator,
    StatusBar,
    Modal
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { Color } from '../../components/theme';
import { Loader } from '../../components/loader';
import { connect } from 'react-redux';
import { surprise_state, user_state } from '../../redux';
import { FetchGifts } from '../../controllers/items/itemsControllers';
import FilterButton from '../../components/buttons/filterButton';
import { faArrowLeftLong, faCalendar, faClose, faFileEdit, faFilter, faImage, faPlusSquare, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FeedCard } from '../components/feed-card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Style } from '../../../assets/styles';
import { DonationCard } from '../components/campaign-card';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/primary';
import { AddCampaign, FetchAllDonationsByID } from '../models';
import { EmptyData } from '../components/empty-display';
// import RNPaystack from 'react-native-paystack'; 
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { supabase } from '../../config/supabase';
import { ImgBaseUrl } from '../../utilities';
import { CreateEventController, GetApp_Campaigns } from '../controllers/campaign-contrller';
import { ViewCampaignCard } from '../components/view-campaign-card';

const Colors = Color()


function View_event({ navigation, disp_user, appState, disp_surprise, route }) {
    const User = appState.User;
    const [amount, setamount] = useState("")
    const [Campaigns, setCampaigns] = useState([])
    const [dataToView, setdateToView] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setLoading(true)
            let EventId = route.params.id;

            FetchAllDonationsByID(EventId)
                .then(response => {
                    if (response.success == true) {
                        setdateToView(response.data)
                        setLoading(false)
                    } else {

                    }
                })
                .catch(error => {

                })
        });


        return unsubscribe;
    }, [navigation])


    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );


    return (

        <>

            {loading == true ?
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
                    <ActivityIndicator />
                </View> :

                <SafeAreaView  >
                    <StatusBar
                        animated={true}
                        backgroundColor={Colors.light}
                        barStyle={statusBarStyle}
                        showHideTransition={statusBarTransition}
                        hidden={hidden}
                    />
                    <ScrollView >


                    </ScrollView>
                </SafeAreaView>
            }

            {dataToView &&
                <ViewCampaignCard
                    setModalVisible={setModalVisible}
                    setLoading={setLoading}
                    data={dataToView}
                    User={User}
                    loading={loading}
                    amount={amount}
                    setamount={setamount}
                    setData={setCampaigns}
                // setDataDefalt={setData}

                />
            }
            {/* Modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>

                    <View style={styles.centeredView}>

                        <View style={{
                            // backgroundColor: "red",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                            {dataToView &&
                                <Image
                                    style={[styles.imageBackground, {
                                        width: "100%",
                                        // height: 886/3,
                                        aspectRatio: dataToView && dataToView.meta.Img.width / dataToView.meta.Img.height,
                                        // marginTop: 50,
                                        borderRadius: 4,
                                        // marginLeft: "2.5%",
                                        position: "relative",
                                        // top: "10%"
                                    }]}
                                    src={`${ImgBaseUrl}/${dataToView.meta.Img.uri}`}
                                    resizeMode={'contain'} />
                            }
                        </View>

                    </View >
                </Modal >
            </View >
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


export default connect(mapStateToProps, mapDispatchToProps)(View_event);



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

    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: "red",
        // padding: 10
        // marginTop: 22,
    },

});

