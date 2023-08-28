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
import { AddCampaign } from '../models';
import { EmptyData } from '../components/empty-display';
// import RNPaystack from 'react-native-paystack'; 
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { supabase } from '../../config/supabase';
import { ImgBaseUrl } from '../../utilities';
import { CreateEventController, GetApp_Campaigns } from '../controllers/campaign-contrller';
import { ViewCampaignCard } from '../components/view-campaign-card';

const Colors = Color()


function Events({ navigation, disp_user, appState, disp_surprise, route }) {
    const User = appState.User;
    const [component, setcomponent] = useState('EVENTSxx');
    const { height } = Dimensions.get('window');
    const [amount, setamount] = useState("")
    const [Campaigns, setCampaigns] = useState([])
    const [dataToView, setdateToView] = useState({
        type: "",
        data: {}
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [posts, setPosts] = useState(
        [
            {
                ID: 1,
                animalName: "Lion",
                specie: "Wild",
                description: "The lion is a large carnivorous mammal of the Felidae family."
            },
            {
                ID: 2,
                animalName: "Tiger",
                specie: "Wild",
                description: "The tiger is the largest cat species and a member of the Felidae family."
            },
            {
                ID: 3,
                animalName: "Elephant",
                specie: "Wild",
                description: "The elephant is the largest land animal and has a long trunk."
            },
            {
                ID: 4,
                animalName: "Giraffe",
                specie: "Wild",
                description: "The giraffe is a tall African mammal known for its long neck and legs."
            },
            {
                ID: 5,
                animalName: "Zebra",
                specie: "Wild",
                description: "The zebra is a wild horse-like mammal native to Africa."
            },
            {
                ID: 6,
                animalName: "Cheetah",
                specie: "Wild",
                description: "The cheetah is a large cat known for its speed and distinctive coat patterns."
            },
            {
                ID: 7,
                animalName: "Gorilla",
                specie: "Wild",
                description: "The gorilla is a large primate native to Africa and known for its strength."
            },
            {
                ID: 8,
                animalName: "Kangaroo",
                specie: "Wild",
                description: "The kangaroo is a marsupial from Australia known for its powerful hind legs."
            },
            {
                ID: 9,
                animalName: "Koala",
                specie: "Wild",
                description: "The koala is a marsupial native to Australia and known for its cuddly appearance."
            },
            {
                ID: 10,
                animalName: "Panda",
                specie: "Wild",
                description: "The panda is a bear native to China and known for its distinctive black and white fur."
            },
            {
                ID: 11,
                animalName: "Polar Bear",
                specie: "Wild",
                description: "The polar bear is a large bear native to the Arctic regions and adapted to cold climates."
            },
            {
                ID: 12,
                animalName: "Kangaroo",
                specie: "Wild",
                description: "The kangaroo is a marsupial from Australia known for its powerful hind legs."
            },
            {
                ID: 13,
                animalName: "Cheetah",
                specie: "Wild",
                description: "The cheetah is a large cat known for its speed and distinctive coat patterns."
            },
            {
                ID: 14,
                animalName: "Gorilla",
                specie: "Wild",
                description: "The gorilla is a large primate native to Africa and known for its strength."
            },
            {
                ID: 15,
                animalName: "Koala",
                specie: "Wild",
                description: "The koala is a marsupial native to Australia and known for its cuddly appearance."
            },
            {
                ID: 16,
                animalName: "Panda",
                specie: "Wild",
                description: "The panda is a bear native to China and known for its distinctive black and white fur."
            },
            {
                ID: 17,
                animalName: "Polar Bear",
                specie: "Wild",
                description: "The polar bear is a large bear native to the Arctic regions and adapted to cold climates."
            },
            {
                ID: 18,
                animalName: "Dog",
                specie: "Domestic",
                description: "The dog is a domesticated carnivorous mammal and a popular pet."
            },
            {
                ID: 19,
                animalName: "Cat",
                specie: "Domestic",
                description: "The cat is a small carnivorous mammal and a popular pet worldwide."
            },
            {
                ID: 20,
                animalName: "Horse",
                specie: "Domestic",
                description: "The horse is a large ungulate mammal used for riding, racing, and working purposes."
            },
            {
                ID: 21,
                animalName: "Cow",
                specie: "Domestic",
                description: "The cow is a domesticated herbivorous mammal raised for its milk and meat."
            },
            {
                ID: 22,
                animalName: "Sheep",
                specie: "Domestic",
                description: "The sheep is a domesticated ruminant mammal valued for its wool and meat."
            },
            {
                ID: 23,
                animalName: "Goat",
                specie: "Domestic",
                description: "The goat is a domesticated mammal widely kept for its milk, meat, and fiber."
            },
            {
                ID: 24,
                animalName: "Chicken",
                specie: "Domestic",
                description: "The chicken is a domesticated bird primarily raised for its meat and eggs."
            },
            {
                ID: 25,
                animalName: "Duck",
                specie: "Domestic",
                description: "The duck is a domesticated waterfowl bird known for its quack and webbed feet."
            },
            {
                ID: 26,
                animalName: "Turkey",
                specie: "Domestic",
                description: "The turkey is a large bird native to North America and often consumed during holidays."
            },
            {
                ID: 27,
                animalName: "Rabbit",
                specie: "Domestic",
                description: "The rabbit is a small mammal known for its long ears and ability to hop."
            },
            {
                ID: 28,
                animalName: "Guinea Pig",
                specie: "Domestic",
                description: "The guinea pig is a small domesticated rodent often kept as a pet."
            },
            {
                ID: 29,
                animalName: "Hamster",
                specie: "Domestic",
                description: "The hamster is a small rodent popular as a pocket pet due to its small size."
            },
            {
                ID: 30,
                animalName: "Goldfish",
                specie: "Domestic",
                description: "The goldfish is a freshwater fish often kept in aquariums as a pet."
            },
            {
                ID: 31,
                animalName: "Parrot",
                specie: "Domestic",
                description: "The parrot is a colorful bird known for its ability to mimic human speech."
            },
            {
                ID: 32,
                animalName: "Cockatoo",
                specie: "Domestic",
                description: "The cockatoo is a large crested bird native to Australia known for its intelligence."
            },
            {
                ID: 33,
                animalName: "Pigeon",
                specie: "Domestic",
                description: "The pigeon is a domesticated bird known for its homing instinct and use in racing."
            },
            {
                ID: 34,
                animalName: "Guppy",
                specie: "Domestic",
                description: "The guppy is a small colorful fish often kept in aquariums."
            },
            {
                ID: 35,
                animalName: "Iguana",
                specie: "Wild",
                description: "The iguana is a large lizard found in tropical and subtropical regions."
            },
            {
                ID: 36,
                animalName: "Chameleon",
                specie: "Wild",
                description: "The chameleon is a reptile known for its ability to change color and long tongue."
            },
            {
                ID: 37,
                animalName: "Crocodile",
                specie: "Wild",
                description: "The crocodile is a large reptile known for its long snout and sharp teeth."
            },
            {
                ID: 38,
                animalName: "Python",
                specie: "Wild",
                description: "The python is a large nonvenomous snake found in tropical regions."
            },
            {
                ID: 39,
                animalName: "Koala",
                specie: "Wild",
                description: "The koala is a marsupial native to Australia and known for its cuddly appearance."
            },
            {
                ID: 40,
                animalName: "Panda",
                specie: "Wild",
                description: "The panda is a bear native to China and known for its distinctive black and white fur."
            },
            {
                ID: 41,
                animalName: "Polar Bear",
                specie: "Wild",
                description: "The polar bear is a large bear native to the Arctic regions and adapted to cold climates."
            },
            {
                ID: 42,
                animalName: "Dog",
                specie: "Domestic",
                description: "The dog is a domesticated carnivorous mammal and a popular pet."
            },
            {
                ID: 43,
                animalName: "Cat",
                specie: "Domestic",
                description: "The cat is a small carnivorous mammal and a popular pet worldwide."
            },
            {
                ID: 44,
                animalName: "Horse",
                specie: "Domestic",
                description: "The horse is a large ungulate mammal used for riding, racing, and working purposes."
            },
            {
                ID: 45,
                animalName: "Cow",
                specie: "Domestic",
                description: "The cow is a domesticated herbivorous mammal raised for its milk and meat."
            },
            {
                ID: 46,
                animalName: "Sheep",
                specie: "Domestic",
                description: "The sheep is a domesticated ruminant mammal valued for its wool and meat."
            },
            {
                ID: 47,
                animalName: "Goat",
                specie: "Domestic",
                description: "The goat is a domesticated mammal widely kept for its milk, meat, and fiber."
            },
            {
                ID: 48,
                animalName: "Chicken",
                specie: "Domestic",
                description: "The chicken is a domesticated bird primarily raised for its meat and eggs."
            },
            {
                ID: 49,
                animalName: "Duck",
                specie: "Domestic",
                description: "The duck is a domesticated waterfowl bird known for its quack and webbed feet."
            },
            {
                ID: 50,
                animalName: "Turkey",
                specie: "Domestic",
                description: "The turkey is a large bird native to North America and often consumed during holidays."
            }
        ]
    );
    const [page, setPage] = useState(5);
    const fetchPosts = () => {
        setLoading(true);

        // // Simulating API call delay
        setTimeout(() => {
            generatePosts(page);
            setLoading(false);
        }, 3000);
    };

    const generatePosts = page => {
        console.log("page-count", page)
        let newPost = Campaigns.slice(page, page + 4)
        for (let index = 0; index < newPost.length; index++) {
            data.push(newPost[index])
        }
        setPage(page + 4)
        setData(data)
        console.log("refreshed", Campaigns.length)

    };

    //  Refs =============
    // ref
    const bottomSheetRef = useRef(null);
    const scrollViewRef = useRef();





    const [loading, setLoading] = useState(false)
    const [imageHeight, setImageHeight] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // setLoading(true)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 1000);
            setPage(4)
            GetApp_Campaigns({
                setLoading,
                seterror,
                setData: setCampaigns,
                setDataDefalt: setData
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


    // handle scroll to top
    const handleScrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };


    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Calculate the timestamp for 5 days from now (in milliseconds)
    const fiveDaysFromNow = currentTimestamp + (5 * 24 * 60 * 60 * 1000);

    const [createdata, setcreateData] = useState({});
    const [error, seterror] = useState({
        type: "",
        msg: "",
        status: false
    })
    const [date, setDate] = useState(new Date(fiveDaysFromNow));
    const [show, setShow] = useState(false);
    const [PickedImage, setPickedImage] = useState(null)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };



    // create campaign
    function CreateCampaign() {
        let payload = {
            createdata,
            setModalVisible,
            handleScrollToTop,
            setLoading,
            PickedImage,
            User,
            setcreateData,
            date,
            setPickedImage,
            setCampaigns,
            setData
        }
        CreateEventController(payload)

    }



    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        // Calculate the end position (bottom) of the content area
        const contentEndY = contentSize.height - layoutMeasurement.height;

        // Check if the user has reached the bottom
        if (contentOffset.y >= contentEndY) {
            console.log("Fetch more data");
            fetchPosts()
        }
    };

    const SelectPhoto = () => {
        const options = {
            storageOptions: {
                path: "images",
                mediaType: "photo"
            },
            includeBase64: true,
            quality: 0.7
        }
        launchImageLibrary(options, response => {
            // console.log("ResponseXX", response.assets.id)

            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {
                console.log(response.customButton)
            } else {
                const source = {
                    uri: response.assets[0].uri
                }


                const fileExt = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf(".") + 1);
                const fileName = `${Math.random()}.${fileExt}`;
                var formData = new FormData();
                formData.append("files", {
                    uri: response.assets[0].uri,
                    name: fileName,
                    type: `image/${fileExt}`
                })

                console.log(formData)
                setPickedImage({
                    source,
                    fileName,
                    formData,
                    height: response.assets[0].height,
                    width: response.assets[0].width
                })

            }
        })
    }

    return (

        <>
            {/* <FilterButton title="Filter" icon={faFilter} onPress={() => {
                navigation.navigate("Payments")
            }} /> */}

            <View style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // marginTop: 20,
                backgroundColor: Colors.light,
                // backgroundColor: "red",
                // marginBottom: 15,
                position: 'absolute',
                // top: 10,
                // right: 19,
                zIndex: 2000,
                width: "100%",
                height: 75,
                // paddingVertical:10
                // paddingBottom: 22
            }} >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        zIndex: 2000,
                        width: "100%",
                        marginTop: 10
                    }}
                >
                    <Pressable
                        onPress={() => {
                            handleScrollToTop()
                            GetApp_Campaigns({
                                setLoading,
                                setData: setCampaigns,
                                component: "DONATIONS", setcomponent
                            })
                        }}
                        style={{
                            // justifyContent: "center",
                            flex: 1,
                            marginLeft: 15,
                            // alignItems: "center",
                            marginTop: 10,
                            // backgroundColor:"green"
                            borderBottomWidth: loading == false && component == "DONATIONS" ? 1 : 0,
                            borderBottomColor: loading == false && component == "DONATIONS" ? Colors.lightgrey : Colors.light
                        }} >
                        <Text style={[component == "DONATIONS" && Style.boldText, { paddingBottom: 10, color: Colors.dark }]} >Donation Campaigns</Text>
                    </Pressable>

                    {/* <Pressable
                        onPress={() => {
                            navigation.navigate("Profile")
                        }}
                        style={{
                            justifyContent: "center",
                            flex: 1,
                            alignItems: "flex-start",
                            marginLeft: 20
                        }} >
                        <FontAwesomeIcon style={{
                            color: Colors.primary,

                        }} size={23} icon={faUser} />
                    </Pressable> */}

                    <Pressable
                        onPress={() => {
                            setModalVisible(true)
                            setdateToView(null)
                        }}
                        style={{
                            justifyContent: "center",
                            flex: 1,
                            alignItems: "flex-end",
                            marginRight: 30,
                            // backgroundColor:"red",
                            paddingRight: 15
                        }} >
                        <FontAwesomeIcon style={{
                            color: Colors.primary,

                        }} size={23} icon={faPlusSquare} />
                    </Pressable>
                </View>

                {/* {loading == false &&
                    <View style={{
                        justifyContent: "flex-end",
                        flex: 1,
                    }} >
                        <ActivityIndicator />
                    </View>} */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "space-around",
                        justifyContent: "flex-start",
                        zIndex: 2000,
                        width: "100%",
                    }}
                >
                    {/* <Pressable
                        onPress={() => {
                            // setcomponent("EVENTS")
                            handleScrollToTop()
                            GetApp_Campaigns({
                                setLoading,
                                setData: setCampaigns,
                                component: "EVENTS",
                                setcomponent
                            })
                        }}
                        style={{
                            justifyContent: "center",
                            flex: 1,
                            alignItems: "center",
                            // marginLeft: 20,
                            // backgroundColor:"red",
                            borderBottomWidth: loading == false && component == "EVENTS" ? 1 : 0,
                            borderBottomColor: loading == false && component == "EVENTS" ? Colors.lightgrey : Colors.light
                        }} >
                        <Text style={[component == "EVENTS" && Style.boldText, { paddingBottom: 10 }]} >BCS Events</Text>
                    </Pressable> */}

                    {/* <Pressable
                        onPress={() => {
                            handleScrollToTop()
                            GetApp_Campaigns({
                                setLoading,
                                setData: setCampaigns,
                                component: "DONATIONS", setcomponent
                            })
                        }}
                        style={{
                            // justifyContent: "center",
                            flex: 1,
                            marginLeft: 15,
                            // alignItems: "center",
                            // marginRight: 20,
                            // backgroundColor:"green"
                            borderBottomWidth: loading == false && component == "DONATIONS" ? 1 : 0,
                            borderBottomColor: loading == false && component == "DONATIONS" ? Colors.lightgrey : Colors.light
                        }} >
                        <Text style={[component == "DONATIONS" && Style.boldText, { paddingBottom: 10,color:Colors.dark }]} >Donation Campaigns</Text>
                    </Pressable> */}
                </View>

            </View >

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
                    <ActivityIndicator />
                </View>
            }
            <>

                <SafeAreaView  >
                    <StatusBar
                        animated={true}
                        backgroundColor={Colors.light}
                        barStyle={statusBarStyle}
                        showHideTransition={statusBarTransition}
                        hidden={hidden}
                    />
                    <ScrollView
                        ref={scrollViewRef}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >


                        <>
                            <View style={styles.content}>

                                {component == "EVENTS" ?
                                    <>
                                        <View style={{ marginTop: 10, width: "100%" }} >
                                            {
                                                // data.sort(() => 0.5 - Math.random()).map((e, index) => {
                                                data.map((e, index) => {
                                                    return (
                                                        <>
                                                            <FeedCard Navigation={navigation} key={index} />
                                                        </>
                                                    )
                                                })
                                            }
                                        </View></>
                                    :
                                    <>
                                        <View style={{ marginTop: 10, width: "100%" }} >
                                            {

                                                // replace Campaigns with data if you want to continue with the pagination
                                                // Campaigns.length > 0 && Campaigns.sort(() => 0.5 - Math.random()).map((e, index) => {
                                                Campaigns.length > 0 && Campaigns.map((e, index) => {
                                                    return (
                                                        <>
                                                            <DonationCard
                                                                data={e}
                                                                navigation={navigation}
                                                                key={index}
                                                                setdateToView={setdateToView}
                                                                setModalVisible={setModalVisible}
                                                            />
                                                        </>
                                                    )
                                                })
                                            }
                                        </View>
                                    </>}
                            </View>
                        </>

                        {/* {data.length > 2 &&
                            loading == true &&
                            <View
                                onPress={() => {
                                    fetchPosts()
                                }}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    marginVertical: 9,
                                    height: 20,
                                    width: "30%",
                                    marginLeft: "35%",
                                    borderRadius: 5
                                }} >
                                <ActivityIndicator />
                            </View>
                        } */}

                        {/* show error */}
                        {loading == false && error.status == true && < EmptyData title={error.type} message={error.msg} />}

                    </ScrollView>
                </SafeAreaView>
            </>

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
                        {dataToView ?
                            dataToView.type != "IMAGE" ?
                                <ViewCampaignCard
                                    setModalVisible={setModalVisible}
                                    setLoading={setLoading}
                                    data={dataToView.data}
                                    User={User}
                                    loading={loading}
                                    amount={amount}
                                    setamount={setamount}
                                    setData={setCampaigns}
                                    setDataDefalt={setData}

                                />
                                :
                                <>
                                    <View style={{
                                        // backgroundColor: "red",
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }} >
                                        {console.log(dataToView.data.meta)}
                                        <Image
                                            style={[styles.imageBackground, {
                                                width: "100%",
                                                // height: 886/3,
                                                aspectRatio: dataToView.data.meta.Img.width / dataToView.data.meta.Img.height,
                                                // marginTop: 50,
                                                borderRadius: 4,
                                                // marginLeft: "2.5%",
                                                position: "relative",
                                                // top: "10%"
                                            }]}
                                            src={`${ImgBaseUrl}/${dataToView.data.meta.Img.uri}`}
                                            resizeMode={'contain'} />
                                    </View>
                                </> :


                            <View style={{
                                padding: 20,
                                // backgroundColor: "red",
                                // height: 200
                            }} >
                                <ScrollView>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }} >
                                        <View>
                                            <Text style={[Style.boldText2, { marginTop: 10, marginBottom: 4 }]}>Post Job</Text>
                                            <Text style={{ marginBottom: 4, color: Colors.dark }}>Tell us who you are hiring</Text>
                                        </View>

                                        <Pressable
                                            onPress={() => {
                                                setModalVisible(false)
                                            }}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "row",
                                                // backgroundColor:"red", 
                                                alignItems: "center"
                                            }} >

                                            <Text style={[Style.TextLink]} >Close</Text>
                                            <FontAwesomeIcon size={19} style={{
                                                flex: 1,
                                                color: Colors.primary,
                                                opacity: 0.8,
                                                marginLeft: 10
                                                // margin: 20,
                                            }}
                                                icon={faClose} />


                                        </Pressable>
                                    </View>



                                    <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>What's the campaign for?</Text>
                                    <TextInput
                                        // autoFocus
                                        value={createdata.title}
                                        onChangeText={(value) => setcreateData({
                                            ...createdata,
                                            title: value
                                        })}
                                        style={{ width: "100%", marginTop: 5, }}
                                        textColor={Colors.dark}
                                        theme={{
                                            colors: {
                                                primary: Colors.dark,
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        multiline
                                        label="Enter title *"
                                    />

                                    <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>How much is needed?</Text>
                                    <TextInput
                                        // autoFocus
                                        value={createdata.amount}
                                        onChangeText={(value) => setcreateData({
                                            ...createdata,
                                            amount: value
                                        })}
                                        style={{ width: "100%", marginTop: 5, }}
                                        textColor={Colors.dark}
                                        theme={{
                                            colors: {
                                                primary: Colors.dark,
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        keyboardType='numeric'
                                        mode="outlined"
                                        multiline
                                        label="Enter amount needed *"
                                    />



                                    <Text style={{ marginTop: 20, marginBottom: 4, color: Colors.dark }}>Donation deadline</Text>

                                    <SecondaryButton
                                        icon
                                        style={{
                                            width: "100%",
                                            textTransform: 'uppercase',
                                            marginTop: 5,
                                            backgroundColor: Colors.light,
                                            color: Colors.dark,
                                            borderWidth: 0.7,
                                            height: 50
                                        }} callBack={() => {
                                            setShow(true)
                                        }}
                                        titleColor={Colors.dark}
                                        title={createdata ? date.toLocaleString() : `Select application deadline`} />

                                    {
                                        show == true &&
                                        (
                                            <>
                                                <DateTimePicker
                                                    display='spinner'
                                                    testID="dateTimePicker"
                                                    value={date}
                                                    mode="date"
                                                    is24Hour={true}
                                                    onChange={onChange}
                                                    maximumDate={new Date(2030, 10, 20)}
                                                    minimumDate={new Date()}
                                                />
                                            </>
                                        )
                                    }


                                    <Text style={{ marginTop: 30, marginBottom: 4, color: Colors.dark }}>Add description</Text>
                                    <TextInput
                                        // autoFocus
                                        value={createdata.description}
                                        onChangeText={(value) => setcreateData({
                                            ...createdata,
                                            description: value
                                        })}
                                        style={{ width: "100%", height: 100, marginTop: 4, }}
                                        textColor={Colors.dark}
                                        theme={{
                                            colors: {
                                                primary: Colors.dark,
                                                background: 'white',
                                                placeholder: "red",
                                            },
                                            roundness: 8,
                                        }}
                                        mode="outlined"
                                        multiline
                                        label="Add description *"
                                    />

                                    <View style={{
                                        marginTop: 20,
                                        width: "100%",
                                        // backgroundColor: "red",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                    }}>
                                        {
                                            PickedImage == null &&
                                            <Pressable
                                                style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {

                                                    if (PickedImage != null) {
                                                        setPickedImage(null)
                                                    }
                                                    else {
                                                        SelectPhoto()
                                                    }
                                                }} >
                                                <FontAwesomeIcon style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                }} size={25} icon={faImage} />
                                                <Text style={{ color: Colors.grey, marginLeft: 10 }} >Add photo</Text>
                                            </Pressable>
                                        }

                                    </View>


                                    {PickedImage != null &&
                                        <>

                                            <Image
                                                style={[styles.imageBackground, {
                                                    width: "100%",
                                                    height: 200,
                                                    // marginTop: 20,
                                                    borderRadius: 4,
                                                }]}
                                                source={PickedImage.source}
                                            // resizeMode={'contain'} 
                                            />
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>

                                                <Pressable
                                                    android_ripple={{ color: Colors.primary }}
                                                    onPress={() => { SelectPhoto() }}
                                                    style={[{
                                                        // backgroundColor:Colors.lightgrey,
                                                        height: 46,
                                                        // width: "90%",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        // elevation: 2,
                                                        borderRadius: 9,
                                                        paddingHorizontal: 10,
                                                        // marginLeft:"5%"
                                                    },]}>
                                                    <FontAwesomeIcon style={{
                                                        flex: 1,
                                                        color: Colors.dark,
                                                    }} size={17} icon={faImage} />
                                                    <Text style={{
                                                        color: Colors.grey,
                                                        marginLeft: 10
                                                    }} >
                                                        Change photo
                                                    </Text>
                                                </Pressable>

                                                <Pressable
                                                    android_ripple={{ color: Colors.primary }}
                                                    onPress={() => {

                                                        setPickedImage(null)
                                                    }}
                                                    style={[{
                                                        // backgroundColor:Colors.lightgrey,
                                                        height: 46,
                                                        // width: "90%",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        // elevation: 2,
                                                        borderRadius: 9,
                                                        paddingHorizontal: 10,
                                                        // marginLeft:"5%"
                                                    },]}>
                                                    <FontAwesomeIcon style={{
                                                        flex: 1,
                                                        color: Colors.dark,
                                                    }} size={17} icon={faClose} />
                                                    <Text style={{
                                                        color: Colors.grey,
                                                        marginLeft: 10
                                                    }} >
                                                        Cancel
                                                    </Text>
                                                </Pressable>

                                            </View>
                                        </>
                                    }



                                    <PrimaryButton title="Create campaign" callBack={() => {
                                        CreateCampaign()
                                    }}
                                        loading={loading}
                                        style={{ marginTop: 40, width: "100%" }}
                                    />







                                </ScrollView>
                            </View>
                        }

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

    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: "red",
        // padding: 10
        // marginTop: 22,
    },

});

