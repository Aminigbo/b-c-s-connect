import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    Pressable, Easing,
    PermissionsAndroid,
    FlatList,
    Image,
    Linking,
    TouchableOpacity,
    BackHandler,
    StatusBar,
    Vibration
} from 'react-native';
import { Alert, Box, IconButton, CloseIcon, HStack, VStack, Center, NativeBaseProvider } from "native-base";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCarAlt, faChurch, faClock, faClose, faDirections, faHouse, faMapMarker, faMapMarkerAlt, faMarker, faPhone, faPhoneAlt, faRecycle, faRepeat, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountIcon, CustomEnrouteMarker, CustomMarker, NotificationIcon, OpenDrawer, UserMarker } from '../../components/icons';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { surprise_state, user_state, logoutUser, MyLocation, myNotification, AllBethels, DeltaDispatch, EnrouteDispath } from '../../redux';
import { Style } from '../../../assets/styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { AnimatedRegion, Animated, Circle, Polyline } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { PillButton, PrimaryButton } from '../../components/buttons/primary';
import Autocomplete from 'react-native-autocomplete-input';
import { EmptyData } from '../../events/components/empty-display';
import { FetchAllNotifications, FetchStateData } from '../models';

import { HandleFPN } from '../../services/handleFPN';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { RequestLocationPermission, WatchLocationChange, WatchLocationChangeXX } from '../../utilities/getLocation';
import { GetAllBethel, LocationPermission } from '../controllers';
import { BethelImage, ImgBaseUrl } from '../../utilities';
import { ScrollView } from 'react-native-gesture-handler';
import { FetchMetaData } from '../../auth/models/auth-models';
import { BetheImageSkeleton } from '../compnents/skeletonLoader';

const Colors = Color()






function Add_details({ navigation, disp_deltas, appState, dispLocation, disp_Login, disp_notification, disp_bethels, disp_enroute }) {
    // navigator.geolocation = require('@react-native-community/geolocation');
    const mapRef = useRef(null);
    const markerRef = useRef(null)
    const User = appState.User;
    const Notifications = appState.Notifications;
    const myCurrentLocation = appState.myLocation;
    const Bethels = appState.Bethels;
    const Enroute = appState.Enroute;
    const Deltas = appState.Deltas;
    const [latLng, setLatLng] = useState(null);
    const [drawerState, setdrawerState] = useState(0)
    const APIKEY = 'AIzaSyC2jZWqEdoJyi_0glJCZLOJ9NslccFwKI0'
    const GOOGLE_MAPS_APIKEY = APIKEY;


    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [delta, setDelta] = useState()
    const [error, seterror] = useState({
        type: "",
        msg: "",
        status: false
    })
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [MiniLoading, setMiniLoading] = useState(false)
    const [drawerType, setDrawerType] = useState("IDLE");
    const [bethelData, setbethelData] = useState(null);
    const [drawRoute, setdrawRoute] = useState(false);
    const [FechBethels, setFechBethels] = useState([])
    const [routeLoading, setrouteLoading] = useState(false)
    const [RouteData, setRouteData] = useState(null)
    const [Driving, setDriving] = useState(false)
    const [NotificationsCount, setNotifications] = useState(null)
    const [Heading, setHeading] = useState(0)
    const [success, setSuccess] = useState({
        status: true
    })

    const handleRotateMap = (data) => {
        if (mapRef.current) {
            console.log(mapRef.current.getCamera())
            mapRef.current.setCamera({
                center: data,
                heading: 120,
                pitch: 0,
                zoom: 8,
                altitude: 30,
            });
        }
    };


    HandleFPN(navigation)




    // this function get the user's current street name
    const fetchStreetAddress = async (latitude, longitude) => {
        // setLoading(true)
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
            );
            // console.log(response.data)
            if (response.data.results.length > 0) {
                const streetAddress = response.data.results[0].formatted_address;
                // console.log('Street Address:', streetAddress);
            }
            // setLoading(false)
        } catch (error) {
            // setLoading(false)
            // seterror({
            //     msg: "Error connecting to server, make sure you are connected to the internet",
            //     type: "Network error",
            //     status: true
            // })
            console.error('Error fetching street address:', error);
        }
    };





    useEffect(() => {

        const handleBackButton = () => {
            if (drawerState != 0) {
                //     setBottomSheetVisible(false); 
                handleSnapPress(0)
                setdrawerState(0)
                // console.log(drawerState)
                return true; // Prevent default back button behavior
            } else if (Enroute.status != "ENROUTE") {
                CancelMapRouting()
                return true; // Prevent default back button behavior
            }
            return false; // Allow default back button behavior
        };

        // Add event listener when the component mounts
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);



        const GetNotification = () => {

            // setLoading2(true)
            // get all notification
            FetchAllNotifications(User.phone)
                .then(response => {
                    // setLoading2(false)
                    let Seen = response.data.filter(e => e.seen == false)
                    setNotifications(Seen.length)
                    disp_notification(response.data)
                    // console.log("Fetched notification", Seen.length)
                })
                .catch(error => {
                    // setLoading2(false)
                    console.log(error)
                })
        }

        const RefreshUserData = () => {
            FetchMetaData(User.phone)
                .then(response => {
                    setLoading2(false)
                    if (response.error != null) {
                        // console.log("Error refreshing user")
                    } else {
                        disp_Login(response.data[0])
                        // console.log("Refreshed user", response.data[0])
                    }
                })
                .catch(error => {
                    setLoading2(false)
                    console.log(error)
                })
        }

        const unsubscribe = navigation.addListener('focus', async () => {
            // console.log("User", User)
            if (User == null) {
                navigation.replace("Auth");
            }
            handleSnapPress(0)

            if (User) {
                if (myCurrentLocation == null) {
                    // fetch low accuracy location with loader , on success fetch high accuracy without loader
                    RequestLocationPermission({ accuracy: false, setLoading, dispLocation })
                } else {
                    // fetch high aacuracuracy without loader.
                    RequestLocationPermission({ accuracy: true, dispLocation })
                }
            }

            GetAllBethel({ state: User.state, setFechBethels: disp_bethels }) // get all bethels 
            GetNotification()
            RefreshUserData()
            if (Bethels.length > 0) { ClosestBethes(Bethels) }

        });

        // Remove event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            unsubscribe;
        };


        // return unsubscribe;
    }, [navigation, drawerState, setDelta])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            AlertUserWhenTheyAreCloseToTheBethel()
        });

        // Remove event listener when the component unmounts
        return () => {
            unsubscribe;
        };

        // return unsubscribe;
    }, [navigation, disp_enroute])



    // start map routing when the direction button in click.
    function StartMapRouting() {
        setLatLng(myCurrentLocation)
        setrouteLoading(true)

        setTimeout(() => {
            setdrawRoute(true)
            setsearch(false)
            disp_enroute({
                status: "ENROUTE",
                location: {
                    latitude: myCurrentLocation.latitude,
                    longitude: myCurrentLocation.longitude,
                },
                destination: {
                    latitude: bethelData.metadata.data.latitude,
                    longitude: bethelData.metadata.data.longitude
                },
                bethel: bethelData
            })
        }, 2000);
    }

    // cancel map routing on button click
    function CancelMapRouting() {
        handleSnapPress(0)
        setDrawerType("IDLE")
        // setsearch(true)
        setWordEntered("")
        setFilteredData([])
        setdrawRoute(false)
        setDriving(false)
        setLatLng(null)
        mapRef.current.animateToRegion(
            {
                ...myCurrentLocation, latitudeDelta: 0.12,
                longitudeDelta: 0.12,
            }, 2000);
        setTimeout(() => {
            disp_deltas({
                latitudeDelta: 0.12,
                longitudeDelta: 0.12,
            })
        }, 3000);
        disp_enroute({
            ...Enroute,
            status: null
        })
    }

    // ======================
    // when click on marker, retrieve the Lat and Lng
    // filter through the bethels to get the bethel with matching Lat and Lng
    // save that bethel to Bethel state
    const saveBethelToState = (data) => {
        let { lat, lng } = data;
        let getBethel = Bethels.filter(e => e.metadata.data.longitude == lng && e.metadata.data.latitude == lat)
        // console.log(getBethel)
        setbethelData(getBethel[0])

        disp_enroute({
            status: "SELECTED BETHEL",
            location: {
                latitude: myCurrentLocation.latitude,
                longitude: myCurrentLocation.longitude,
            },
            destination: {
                latitude: lat,
                longitude: lng
            },
            bethel: getBethel[0]
        })


        // SELECTED BETHEL
    }

    // state to control the FIND A BETHEL label
    const [search, setsearch] = useState(false)

    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['25%', '75%', '95%'], []);

    // callbacks when the drawer is closed or open
    const handleSheetChanges = useCallback((index) => {
        if (index == -1) {
            handleSnapPress(0)
            // setDrawerType("IDLE")
            setsearch(false)
        }

        if (index == 0) {
            // setDrawerType("IDLE")
            setsearch(false)
        }
        setdrawerState(index)

        if (Bethels.length > 0) { ClosestBethes(Bethels) }
    }, []);

    // show the overlay from the bottom drawer
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    // control bottom drawer hide and show
    const handleSnapPress = useCallback((index) => {
        setdrawerState(index)
        bottomSheetRef.current?.snapToIndex(index);
    }, []);


    const handleFilter = (searchWord) => {
        const newFilter = Bethels.filter((value) => {
            return value.bethelName.toLowerCase().includes(searchWord.toLowerCase());
        });
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handlePlaceSelect = (data, details) => {
        if (details && details.geometry && details.geometry.location) {
            const { lat, lng } = details.geometry.location;
            // console.log('Latitude:', lat);
            // console.log('Longitude:', lng);
            // console.log(details.geometry)

            // setdrawRoute(false)
            // let coord = details.geometry.location
            // setTimeout(() => {
            //     handleSnapPress(1)
            //     setDrawerType("SELECTED BETHEL")
            // }, 500);
            // console.log(coord)

            // setbethelData({
            //     latitude: coord.lat,
            //     longitude: coord.lng,
            //     latitudeDelta: 0.008,
            //     longitudeDelta: 0.008,
            //     bethel: "Ndele bethel"
            // })




        } else {
            // console.error('Invalid place details:', details);
        }
    };



    const RenderBethelInfo = () => {
        if (Enroute.status == "SELECTED BETHEL" || Enroute.status == "ENROUTE") {
            return (

                <>
                    <ScrollView >
                        <View  >
                            {/* {console.log(drawerType)} */}
                            <View style={{ width: "100%", justifyContent: "flex-start", flex: 1, }} >


                                <View style={{
                                    paddingHorizontal: 10
                                }} >
                                    <TouchableOpacity onPress={() => {
                                    }} >

                                        <BoldText3
                                            color={Colors.primary}
                                            text={`${Enroute.bethel.bethelName} ${Enroute.bethel.state}`}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Divider style={{ marginVertical: 10 }} />

                                <View
                                    style={{
                                        padding: 10,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        // marginBottom: 10
                                    }}
                                >

                                    {Enroute.status == "ENROUTE" ?
                                        <View style={{
                                            flexDirection: "row"
                                        }} >
                                            <FontAwesomeIcon size={12} style={{
                                                // color: Colors.primary, 
                                                marginTop: 3
                                            }} icon={faCarAlt} />
                                            <Text style={{
                                                color: Colors.primary
                                            }}> {RouteData && parseFloat(RouteData.duration).toFixed(1)} km to destination</Text>

                                            <FontAwesomeIcon size={12} style={{
                                                color: Colors.primary,
                                                margin: 3, marginLeft: 10,
                                            }} icon={faClock} />
                                            <Text style={{
                                                color: Colors.primary
                                            }} >{parseInt(RouteData && RouteData.distance)} mins to destination</Text>
                                        </View>
                                        :
                                        <Pressable
                                            onPress={() => {
                                                StartMapRouting()
                                            }}
                                            style={{ flexDirection: "row", marginLeft: 10, }}
                                        >
                                            <BoldText2
                                                text="Direction"
                                                color={Colors.primary}
                                                style={{ marginRight: 7 }}
                                            />
                                            {routeLoading ?
                                                <ActivityIndicator style={{ paddingHorizontal: 20 }} />
                                                :
                                                <FontAwesomeIcon size={19} style={{
                                                    marginRight: 5,
                                                    // color: Colors.primary,
                                                }}
                                                    icon={faDirections} />
                                            }

                                        </Pressable>

                                    }

                                    {Enroute.bethel.metadata.data.phones &&
                                        <Pressable
                                            onPress={() => {
                                                let numb = Enroute.bethel.metadata.data.phones.split(",")[0]
                                                const phoneNumber = `tel:${numb}`;
                                                Linking.openURL(phoneNumber);
                                            }}
                                            style={{ flexDirection: "row" }}
                                        >
                                            <FontAwesomeIcon size={19} style={{
                                                marginRight: 20,
                                                color: Colors.primary,
                                            }}
                                                icon={faPhoneAlt} />
                                        </Pressable>
                                    }


                                </View>
                                <Divider style={{ marginVertical: 10 }} />
                                <View
                                    style={{
                                        // flex: 1,
                                        justifyContent: 'space-between',
                                        padding: 10
                                    }} >



                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: "96%"
                                        }}
                                    >
                                        <FontAwesomeIcon size={16} style={{
                                            // flex: 1,
                                            color: Colors.primary,
                                        }}
                                            icon={faMapMarkerAlt} />


                                        <BoldText2
                                            style={{ marginLeft: 10, marginTop: 10 }}
                                            text={Enroute.bethel.metadata.data.data.address}
                                            color="black"
                                        />


                                    </View>


                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ flexDirection: 'row', }}
                                        style={{
                                            // backgroundColor: "green",
                                            height: 320
                                        }}
                                    >
                                        {Enroute.bethel.metadata.data.Uris.map((URI, index) => {
                                            return <View
                                                key={index}
                                                style={{
                                                    width: 300,
                                                    // backgroundColor: "red"
                                                }}>
                                                <Image
                                                    style={[styles.imageBackground, {
                                                        // width: 90,
                                                        // height: 90,
                                                        marginTop: 14,
                                                        marginLeft: "5%",
                                                        aspectRatio: 1.1
                                                        // borderRadius: 10,
                                                    }]}
                                                    src={`${BethelImage}/${URI}`}
                                                    resizeMode={'stretch'} />

                                            </View>
                                        })}

                                    </ScrollView>




                                    {/* <Image
                                        style={[styles.imageBackground, {
                                            // width: "90%", height: "30%",
                                            marginTop: 14,
                                            marginLeft: "5%",
                                            aspectRatio: 1
                                            // borderRadius: 10,
                                        }]}
                                        src={`${ImgBaseUrl}/${bethelData.Uris[0]}`}
                                        resizeMode={'stretch'} /> */}


                                    <Divider style={{ marginBottom: 20 }} />
                                    <BoldText1
                                        style={{ marginLeft: 15 }}
                                        text="All information provided is subject to verification, and users are advised to make a direct call for further verification if needed."
                                        color={Colors.grey}
                                    />
                                    {/* <BoldText2
                                            style={{ marginLeft: 15 }}
                                            text={bethelData.data.phones}
                                            color={Colors.primary}
                                        /> */}

                                    <Pressable
                                        style={{
                                            alignItems: "center",
                                            marginTop: 20
                                        }}
                                        onPress={() => {
                                            CancelMapRouting()
                                            clearInterval(intervalId);
                                        }}
                                    >
                                        <BoldText2
                                            style={{ marginLeft: 15 }}
                                            text="Cancel"
                                            color={Colors.primary}
                                        />
                                    </Pressable>


                                </View>

                            </View >
                        </View>

                    </ScrollView >
                </>
            )
        }

    }

    const AlertUserWhenTheyAreCloseToTheBethel = () => {
        console.log(calculateDistanceOfingleBethel(Enroute.bethel.metadata.data.latitude, Enroute.bethel.metadata.data.longitude) < 2)
        if (calculateDistanceOfingleBethel(Enroute.bethel.metadata.data.latitude, Enroute.bethel.metadata.data.longitude) < 1) {
            setSuccess({
                ...success,
                status: true
            })
            Vibration.vibrate(2000);
            setTimeout(() => {
                Vibration.vibrate(2000);
            }, 5000);

            setTimeout(() => {
                Vibration.vibrate(2000);
            }, 7000);

        } else {
            setSuccess({
                ...success,
                status: false
            })
        }
    }

    const Redirect = () => {
        return navigation.replace("Auth")
    }


    const [CloseBethels, setCloseBethels] = useState([])

    // Get Bethel name by latitude
    function BethelByLatitude(lat, lng, distance) {
        let BethelName = Bethels.filter(e => e.metadata.data.latitude == lat)[0].bethelName;
        if (distance < 20) {
            let filter = CloseBethels.filter(e => e.lat == lat);
            let findIndex = CloseBethels.findIndex(e => e.lat == lat);

            if (filter.length > 0) {
                CloseBethels.splice(findIndex, 1, {
                    bethel: BethelName,
                    lat: lat,
                    lng: lng,
                    distane: distance
                })
            } else {
                CloseBethels.push({
                    bethel: BethelName,
                    lat: lat,
                    lng: lng,
                    distane: distance
                })
            }
            setCloseBethels(CloseBethels)
        }
    }

    // calculate distances
    function calculateDistance(lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - myCurrentLocation.latitude) * (Math.PI / 180);
        const dLon = (lon2 - myCurrentLocation.longitude) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(myCurrentLocation.latitude * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        // return distance;
        BethelByLatitude(lat2, lon2, distance)
    }


    // calculate and return only distance between users
    // current location and the bethel picked
    function calculateDistanceOfingleBethel(lat, lng) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat - myCurrentLocation.latitude) * (Math.PI / 180);
        const dLon = (lng - myCurrentLocation.longitude) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(myCurrentLocation.latitude * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        return distance;
    }

    function ClosestBethes(Bethels) {
        for (let i = 0; i < Bethels.length; i++) {
            const bethel = Bethels[i].metadata.data;
            console.log("Filter by distance", bethel)
            calculateDistance(bethel.latitude, bethel.longitude)
        }
    }

    const [intervalId, setintervalId] = useState()
    function WatchLocationChange() {
        setintervalId(setInterval(() => {
            WatchLocationChangeXX({ dispLocation, setHeading, mapRef, Driving, disp_enroute, Enroute })
        }, 8000))

        // Cleanup the interval when the component unmounts.
        return () => {
            clearInterval(intervalId);
        };
    }
    useEffect(() => {
        // WatchLocationChange({ dispLocation, setHeading, mapRef, Driving, disp_enroute, Enroute }) // watch user location change 
        LocationPermission() // request for permission  



    }, []);



    // havdle bethel images
    const [loadingStates, setLoadingStates] = useState(
        new Array(bethelData && bethelData.metadata.data.Uris.length).fill(true)
    );




    return User == null ? Redirect() : (

        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.dark}
                // barStyle={statusBarStyle}
                // showHideTransition={statusBarTransition}
                hidden={false}
            />


            {loading == true &&
                <View
                    style={{
                        display: "flex",
                        // marginTop: 10,
                        // backgroundColor: Colors.light,
                        backgroundColor: "rgb(0,0,0)",
                        opacity: 0.6,
                        marginBottom: 5,
                        position: 'absolute',
                        // top: 10,
                        // right: 19,
                        zIndex: 2100,
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                    <ActivityIndicator color="white" />
                    <Text>please wait...</Text>
                </View>
            }


            {
                error.status == true ? <>
                    < EmptyData title={error.type} message={error.msg} />

                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            marginBottom: 40
                            // backgroundColor:"red"
                        }}>
                        <TouchableOpacity
                            onPress={() => { }} >
                            {loading == true ? <ActivityIndicator /> : <Text style={[Style.boldText]} >Retry</Text>}
                        </TouchableOpacity>
                    </View>
                </> :
                    <>
                        {
                            Driving == true && success.status == true &&
                            <Alert w="100%" status="success" style={{ zIndex: 1000, position: "absolute", top: "10%" }}>
                                <VStack space={2} flexShrink={1} w="100%">
                                    <HStack flexShrink={1} space={1} alignItems="center" justifyContent="space-between">
                                        <HStack space={2} flexShrink={1} alignItems="center">
                                            <Alert.Icon />
                                            <Text fontSize="md" fontWeight="medium" _dark={{
                                                color: "coolGray.800"
                                            }}>
                                                Arrived successfully!
                                            </Text>
                                        </HStack>
                                        <IconButton variant="unstyled" _focus={{
                                            borderWidth: 0
                                        }} icon={<CloseIcon size="3" onPress={() => {
                                            setSuccess({
                                                ...success,
                                                status: false
                                            })
                                        }} />} _icon={{
                                            color: "coolGray.600"
                                        }} />
                                    </HStack>
                                    <Box pl="6" _dark={{
                                        _text: {
                                            color: "coolGray.600"
                                        }
                                    }}>
                                        You have arrived  your destination. Use the phone icon to place a call to either the bethel Admin, Priest or caretaker.
                                    </Box>
                                </VStack>
                            </Alert>
                        }

                        {myCurrentLocation &&
                            <MapView

                                // initial location view of the map
                                region={
                                    {
                                        latitude: myCurrentLocation.latitude,
                                        longitude: myCurrentLocation.longitude,
                                        latitudeDelta: Deltas && Deltas.latitudeDelta,
                                        longitudeDelta: Deltas && Deltas.longitudeDelta,
                                        // latitudeDelta: 0.05,
                                        // longitudeDelta: 0.05,
                                        // heading: 90,
                                    }
                                }
                                ref={mapRef}
                                style={{
                                    // flex: 1,
                                    // minHeight: 100,
                                    height: "75%"
                                }}

                            >


                                {Enroute.status == null &&
                                    <Circle
                                        fillColor="rgba(135, 206, 235, 0.5)"
                                        strokeColor='transparent'
                                        center={myCurrentLocation} radius={6500}
                                    />
                                }


                                {/* draw direction only when the user have selected their destination bethel */}
                                {Enroute.status == "ENROUTE" ?
                                    <>
                                        <MapViewDirections
                                            origin={Enroute.location}
                                            destination={Enroute.destination}
                                            apikey={GOOGLE_MAPS_APIKEY}
                                            strokeWidth={8}
                                            strokeColor={Colors.primary}
                                            optimizeWaypoints={true}
                                            precision="high"
                                            timePrecision="now"
                                            onReady={result => {
                                                setDrawerType("ENROUTE")
                                                handleSnapPress(0)
                                                setrouteLoading(false)
                                                setRouteData({
                                                    duration: result.distance,
                                                    distance: result.duration,
                                                })


                                                let Aminate = () => {
                                                    mapRef.current.animateToRegion(
                                                        {
                                                            ...Enroute.destination, latitudeDelta: 0.00421,
                                                            longitudeDelta: 0.00421,
                                                        }, 2000);

                                                    setTimeout(() => {
                                                        mapRef.current.animateToRegion(
                                                            {
                                                                ...Enroute.location, latitudeDelta: 0.0099,
                                                                longitudeDelta: 0.0099,
                                                            }, 4000);
                                                        setDriving(true)
                                                    }, 3000);

                                                    setTimeout(() => {
                                                        disp_deltas({
                                                            latitudeDelta: 0.0099,
                                                            longitudeDelta: 0.0099,
                                                        })
                                                        WatchLocationChange()
                                                    }, 10000);


                                                }
                                                if (Driving == false) {
                                                    Aminate()
                                                }
                                            }}
                                        />

                                        <Circle
                                            fillColor="rgba(218, 26, 97, 0.3)"
                                            strokeColor='transparent'
                                            center={{
                                                latitude: myCurrentLocation.latitude,
                                                longitude: myCurrentLocation.longitude,
                                            }} radius={60}
                                        />
                                        < Marker
                                            coordinate={{
                                                latitude: myCurrentLocation.latitude,
                                                longitude: myCurrentLocation.longitude,
                                            }}
                                            title={`Info`}
                                            description={`Your current location`}
                                        >
                                            <UserMarker />
                                        </Marker>


                                    </> :

                                    < Marker
                                        coordinate={{
                                            latitude: myCurrentLocation.latitude,
                                            longitude: myCurrentLocation.longitude,
                                        }}
                                        title={`Info`}
                                        description={`Your current location`}
                                    >
                                        <UserMarker />
                                    </Marker>
                                }



                                {/* marker showing bethels */}
                                {Bethels && Bethels.length > 0 && Bethels.map((marker, index) => (
                                    <Marker.Animated
                                        key={index}
                                        // ref={markerRef}
                                        // draggable
                                        coordinate={marker.metadata.data}
                                        // title={`View Detail`}
                                        description={`Click the Icon to see details.`}
                                        onPress={(e) => {
                                            // setdrawRoute(false)
                                            let coord = e.nativeEvent.coordinate
                                            // console.log(mapRef.current.animateToRegion)

                                            // console.log(coord)
                                            setTimeout(() => {
                                                handleSnapPress(1)
                                                // 
                                                // setDrawerType("SELECTED BETHEL")
                                            }, 500);
                                            saveBethelToState({ lat: coord.latitude, lng: coord.longitude })

                                        }}
                                    >
                                        <CustomMarker />
                                    </Marker.Animated>
                                ))}



                            </MapView>
                        }



                        <View style={styles.content}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 10,
                                // flex: 1,
                                // backgroundColor: Colors.light,
                                width: "100%",
                                marginHorizontal: 10,
                            }} >
                                <OpenDrawer style={{
                                    // marginRight: 20
                                }} />
                                <NotificationIcon User={User} count={Notifications} />
                                {/* <NotificationIcon count={Notifications.filter(e => e.seen == false).length} /> */}
                                <AccountIcon />

                            </View>


                        </View>

                        <BottomSheet
                            enablePanDownToClose={false}
                            ref={bottomSheetRef}
                            index={0}
                            snapPoints={snapPoints}
                            backdropComponent={renderBackdrop}
                            onChange={handleSheetChanges}
                        >

                            <ScrollView>
                                <RenderBethelInfo />
                            </ScrollView>

                            {Enroute && Enroute.status != "SELECTED BETHEL" && Enroute.status != "ENROUTE" && <>
                                <View style={[styles.content, {
                                    zIndex: 2000
                                }]}>

                                    {/* <RenderIdle /> */}

                                    {
                                        drawerType == "IDLE" ? <>
                                            <View style={{ width: "100%", justifyContent: "flex-start" }} >
                                                <Pressable
                                                    onPress={() => {
                                                        handleSnapPress(2)
                                                        setsearch(true)
                                                    }}
                                                    style={{
                                                        // backgroundColor: "red",
                                                        padding: 10, flexDirection: "row"
                                                    }} >

                                                    {/* <FontAwesomeIcon size={23} style={{
                                                    // flex: 1,
                                                    color: Colors.primary,
                                                    // opacity: 0.8,
                                                    marginLeft: 10
                                                    // margin: 20,
                                                }}
                                                    icon={faMapMarkerAlt} /> */}
                                                    <CustomMarker />
                                                    <BoldText2
                                                        color="black"
                                                        text="Find the closest Bethel"
                                                        style={{
                                                            marginLeft: 10,
                                                            marginTop: 20
                                                        }}
                                                    />
                                                </Pressable>


                                                {/* <GooglePlacesAutocomplete
                                                placeholder='Enter Bethel name'
                                                onPress={(data, details = null) => {
                                                    // 'details' is provided when fetchDetails = true
                                                    // console.log(data, details);
                                                    handlePlaceSelect(data, details)
                                                }}
                                                // onPress={handlePlaceSelect}
                                                query={{
                                                    key: APIKEY,
                                                    language: 'en',
                                                    components: 'country:ng',
                                                }}
                                                // predefinedPlaces={FechBethels}
                                                textInputProps={{
                                                    onFocus: () => { handleSnapPress(2) },
                                                    style:
                                                    {
                                                        width: "90%",
                                                        height: "80%",
                                                        borderWidth: 1,
                                                        borderColor: '#ccc',
                                                        borderRadius: 4,
                                                        paddingHorizontal: 10,
                                                        marginLeft: "5%",
                                                        marginBottom: 10,
                                                    }
                                                }}
                                                // currentLocation={true}
                                                fetchDetails={true}
                                            /> */}

                                                <TextInput
                                                    onFocus={() => { handleSnapPress(2) }}
                                                    value={wordEntered}
                                                    onChangeText={(value) => handleFilter(value)}
                                                    style={{ width: "90%", marginLeft: "5%", marginTop: 10 }}
                                                    textColor={Colors.dark}
                                                    theme={{
                                                        colors: {
                                                            primary: Colors.dark,
                                                            background: 'white',
                                                            placeholder: "red",
                                                        },
                                                        // roundness: 8,
                                                    }}
                                                    mode="outlined"
                                                    // multiline
                                                    label="Enter bethel name to find."
                                                />

                                                {filteredData.length != 0 ? (
                                                    <View>
                                                        {filteredData.slice(0, 4).map((value, index) => {
                                                            console.log(value.metadata.data.latitude)
                                                            return (
                                                                <Pressable key={index} style={{
                                                                    backgroundColor: Colors.light,
                                                                    width: "90%",
                                                                    marginLeft: "5%",
                                                                    marginTop: 6,
                                                                    paddingVertical: 6,
                                                                    borderRadius: 6,

                                                                }}
                                                                    onPress={() => {

                                                                        saveBethelToState({ lat: value.metadata.data.latitude, lng: value.metadata.data.longitude })
                                                                        setdrawRoute(false)
                                                                        handleSnapPress(1)
                                                                        setDrawerType("SELECTED BETHEL")
                                                                    }}
                                                                >
                                                                    <View style={{
                                                                        display: "flex",
                                                                        flexDirection: "row"
                                                                    }}>
                                                                        <CustomMarker />
                                                                        <View style={{ marginLeft: 10 }}>
                                                                            <BoldText2 text={value.bethelName}
                                                                                color="black" style={{ marginBottom: -5 }}
                                                                            />

                                                                            {/* {console.log(value.metadata.data.latitude)} */}
                                                                            <BoldText1
                                                                                text={`${calculateDistanceOfingleBethel(value.metadata.data.latitude, value.metadata.data.longitude).toFixed(1)} KM away from you `}
                                                                                color={Colors.primary} style={{ marginTop: -5 }} />
                                                                        </View>
                                                                    </View>
                                                                </Pressable>
                                                            );
                                                        })}
                                                    </View>
                                                ) : (<>
                                                    <View>
                                                        <BoldText1
                                                            text="Bethels close to you"
                                                            color="grey" style={{ marginLeft: 20, marginTop: 20 }} />
                                                        {CloseBethels.slice(0, 4).sort(function (a, b) {
                                                            return a.distane - b.distane;
                                                        }).map((value, index) => {
                                                            return (
                                                                <Pressable key={index} style={{
                                                                    backgroundColor: Colors.light,
                                                                    width: "90%",
                                                                    marginLeft: "5%",
                                                                    marginTop: 6,
                                                                    paddingVertical: 6,
                                                                    borderRadius: 6,

                                                                }}
                                                                    onPress={() => {
                                                                        // console.log(value)
                                                                        // setbethelData(value)
                                                                        saveBethelToState({ lat: value.lat, lng: value.lng })
                                                                        setdrawRoute(false)
                                                                        handleSnapPress(1)
                                                                        setDrawerType("SELECTED BETHEL")
                                                                    }}
                                                                >
                                                                    <View style={{
                                                                        display: "flex",
                                                                        flexDirection: "row"
                                                                    }}>
                                                                        <CustomMarker />
                                                                        <View style={{ marginLeft: 10 }}>
                                                                            <BoldText2 text={value.bethel}
                                                                                color="black" style={{ marginBottom: -5 }}
                                                                            />
                                                                            <BoldText1
                                                                                text={`${parseFloat(value.distane).toFixed(1)} KM away from you`}
                                                                                color={Colors.primary} style={{ marginTop: -5 }} />
                                                                        </View>
                                                                    </View>
                                                                </Pressable>
                                                            );
                                                        })}
                                                    </View>
                                                </>)}

                                            </View>
                                        </> : drawerType == "IDLE" &&
                                        <>
                                            <View style={{ width: "100%", justifyContent: "flex-start" }} >
                                                <Pressable
                                                    onPress={() => {
                                                        handleSnapPress(2)
                                                        setsearch(true)
                                                    }}
                                                    style={{
                                                        // backgroundColor: "red",
                                                        padding: 10, flexDirection: "row"
                                                    }} >

                                                    <FontAwesomeIcon size={23} style={{
                                                        // flex: 1,
                                                        color: Colors.primary,
                                                        // opacity: 0.8,
                                                        marginLeft: 10
                                                        // margin: 20,
                                                    }}
                                                        icon={faMapMarkerAlt} />
                                                    {/* <BoldText3
                                                    text="Find A Bethel"
                                                /> */}
                                                </Pressable>


                                                {/* <GooglePlacesAutocomplete
                                    placeholder='Enter Bethel name'
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        // console.log(data, details);
                                        handlePlaceSelect(data, details)
                                    }}
                                    // onPress={handlePlaceSelect}
                                    query={{
                                        key: APIKEY,
                                        language: 'en',
                                        components: 'country:ng',
                                    }}
                                    // predefinedPlaces={FechBethels}
                                    textInputProps={{
                                        onFocus: () => { handleSnapPress(2) },
                                        style:
                                        {
                                            width: "90%",
                                            height: "80%",
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 4,
                                            paddingHorizontal: 10,
                                            marginLeft: "5%",
                                            marginBottom: 10,
                                        }
                                    }}
                                    // currentLocation={true}
                                    fetchDetails={true}
                                /> */}


                                            </View>
                                        </>
                                    }
                                </View>
                            </>}


                        </BottomSheet>
                    </>
            }


            {/* <View style={{
                width: "100%",
                justifyContent: "flex-start",
                position: "absolute",
                bottom: 0,
                backgroundColor:Colors.light,
                paddingVertical:20,
                borderTopRightRadius:20,
                borderTopLeftRadius:20,
                // elevation:42
            }} >
                <Pressable
                    onPress={() => {
                        handleSnapPress(2)
                        setsearch(true)
                    }}
                    style={{
                        // backgroundColor: "red",
                        padding: 10, flexDirection: "row"
                    }} >

                    <FontAwesomeIcon size={23} style={{
                        // flex: 1,
                        color: Colors.primary,
                        // opacity: 0.8,
                        marginLeft: 10
                        // margin: 20,
                    }}
                        icon={faMapMarkerAlt} />
                    <Text style={[Style.boldText, { marginLeft: 10 }]}>Find A Bethel</Text>
                </Pressable>

                <TextInput
                    onFocus={() => { handleSnapPress(2) }}
                    value={wordEntered}
                    onChangeText={(value) => handleFilter(value)}
                    style={{ width: "90%", marginLeft: "5%" }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Enter bethel name to find."
                />


            </View> */}
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
        disp_logout: () => dispatch(logoutUser()),
        dispLocation: (payload) => dispatch(MyLocation(payload)),
        disp_Login: (payload) => dispatch(user_state(payload)),
        disp_notification: (payload) => dispatch(myNotification(payload)),
        disp_bethels: (payload) => dispatch(AllBethels(payload)),
        disp_deltas: (payload) => dispatch(DeltaDispatch(payload)),
        disp_enroute: (payload) => dispatch(EnrouteDispath(payload)),
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
        // backgroundColor: Colors.light,
        position: "absolute",
        width: "100%",
        // zIndex:2000
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

