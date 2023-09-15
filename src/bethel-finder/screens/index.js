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
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCarAlt, faChurch, faClock, faClose, faDirections, faHouse, faMapMarker, faMapMarkerAlt, faMarker, faPhone, faPhoneAlt, faRecycle, faRepeat, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountIcon, CustomMarker, NotificationIcon, OpenDrawer } from '../../components/icons';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { surprise_state, user_state, logoutUser, MyLocation } from '../../redux';
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
import { FetchStateData } from '../models';

import { HandleFPN } from '../../services/handleFPN';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { RequestLocationPermission, WatchLocationChange } from '../../utilities/getLocation';
import { GetAllBethel, LocationPermission } from '../controllers';
import { BethelImage, ImgBaseUrl } from '../../utilities';
import { ScrollView } from 'react-native-gesture-handler';

const Colors = Color()






function Add_details({ navigation, disp_logout, appState, dispLocation }) {
    // navigator.geolocation = require('@react-native-community/geolocation');
    const mapRef = useRef(null);
    const markerRef = useRef(null)
    const User = appState.User;
    const myCurrentLocation = appState.myLocation;
    const [latLng, setLatLng] = useState();
    const [drawerState, setdrawerState] = useState(0)
    const APIKEY = 'AIzaSyC2jZWqEdoJyi_0glJCZLOJ9NslccFwKI0'
    const GOOGLE_MAPS_APIKEY = APIKEY;


    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [delta, setDelta] = useState({
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    })
    const [error, seterror] = useState({
        type: "",
        msg: "",
        status: false
    })
    const [loading, setLoading] = useState(false)
    const [drawerType, setDrawerType] = useState("IDLE");
    const [bethelData, setbethelData] = useState(null);
    const [drawRoute, setdrawRoute] = useState(false);
    const [FechBethels, setFechBethels] = useState([])
    const [routeLoading, setrouteLoading] = useState(false)
    const [RouteData, setRouteData] = useState({})
    const [Driving, setDriving] = useState(false)

    const handleRotateMap = (data) => {
        if (mapRef.current) {
            // console.log(mapRef.current.getCamera())
            mapRef.current.setCamera({
                center: data,
                heading: 360,
                pitch: 0,
                zoom: 18,
                altitude: 0,
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
                console.log('Street Address:', streetAddress);
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
                console.log(drawerState)
                return true; // Prevent default back button behavior
            }
            return false; // Allow default back button behavior
        };

        // Add event listener when the component mounts
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);





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
                GetAllBethel({ state: User.state, setFechBethels }) // get all bethels
            }
        });

        // Remove event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            unsubscribe;
        };


        // return unsubscribe;
    }, [navigation, drawerState])


    // ======================
    // when click on marker, retrieve the Lat and Lng
    // filter through the bethels to get the bethel with matching Lat and Lng
    // save that bethel to Bethel state
    const saveBethelToState = (data) => {
        let { lat, lng } = data;
        let getBethel = FechBethels.filter(e => e.longitude == lng && e.latitude == lat)
        console.log(getBethel[0])
        setbethelData(getBethel[0])
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
        const newFilter = FechBethels.filter((value) => {
            return value.bethel.toLowerCase().includes(searchWord.toLowerCase());
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
            console.log('Latitude:', lat);
            console.log('Longitude:', lng);
            console.log(details.geometry)

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
            console.error('Invalid place details:', details);
        }
    };

    const RenderIdle = () => {
        if (drawerType == "IDLE" || drawerType == "TYPING") {
            return (
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
                        <Text style={[Style.boldText, { marginLeft: 10 }]}>Find A Bethel</Text>
                    </Pressable>




                    {/* <TextInput
                        // autoFocus
                        type="text"
                        ref={setref}
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                        id="searchInput"
                        style={{ width: "100%", outline: "none", border: "none", margin: "auto", background: "" }}
                    /> */}


                </View>
            )
        }
    }

    const RenderBethelInfo = () => {
        if (drawerType == "SELECTED BETHEL" || drawerType == "ENROUTE") {
            return (


                <>


                    <ScrollView >
                        <View  >
                            {console.log(drawerType)}
                            <View style={{ width: "100%", justifyContent: "flex-start", flex: 1, }} >


                                <View style={{
                                    paddingHorizontal: 10
                                }} >
                                    <BoldText3
                                        color={Colors.primary}
                                        text={`${bethelData.bethel} ${bethelData.data.state}`}
                                    />
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

                                    {drawerType == "ENROUTE" ?
                                        <View style={{
                                            flexDirection: "row"
                                        }} >
                                            <FontAwesomeIcon size={12} style={{
                                                // color: Colors.primary, 
                                                marginTop: 3
                                            }} icon={faCarAlt} />
                                            <Text style={{
                                                // color: Colors.primary
                                            }}> {parseInt(RouteData.duration)} km</Text>

                                            <FontAwesomeIcon size={12} style={{
                                                // color: Colors.primary,
                                                margin: 3, marginLeft: 10,
                                            }} icon={faClock} />
                                            <Text style={{
                                                // color: Colors.primary 
                                            }} >{parseInt(RouteData.distance)} mins.</Text>
                                        </View>
                                        :
                                        <Pressable
                                            onPress={() => {
                                                setrouteLoading(true)
                                                setdrawRoute(true)
                                                setsearch(false)
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

                                    <Pressable
                                        onPress={() => {
                                            let numb = bethelData.data.phones.split(",")[0]
                                            const phoneNumber = `tel:${numb}`;
                                            Linking.openURL(phoneNumber);
                                        }}
                                        style={{ flexDirection: "row" }}
                                    >
                                        {/* <BoldText2
                                    text="Call"
                                    color={Colors.primary}
                                    style={{ marginRight: 7 }}
                                /> */}
                                        <FontAwesomeIcon size={19} style={{
                                            marginRight: 20,
                                            color: Colors.primary,
                                        }}
                                            icon={faPhoneAlt} />
                                    </Pressable>



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
                                            text={bethelData.data.address}
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
                                        {bethelData.Uris.map((URI, index) => {
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
                                        text="I have two routes in my app on the one route it contains three tab each tab has a listview and each listview content has a link to go detail page. The detail page contains two tabs."
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
                                            handleSnapPress(0)
                                            setDrawerType("IDLE")
                                            // setsearch(true)
                                            setWordEntered("")
                                            setFilteredData([])
                                            setdrawRoute(false)

                                            mapRef.current.animateToRegion(
                                                {
                                                    ...myCurrentLocation, latitudeDelta: 0.09,
                                                    longitudeDelta: 0.09,
                                                }, 2000);
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

    const Redirect = () => {
        return navigation.replace("Auth")
    }


    useEffect(() => {
        WatchLocationChange({ dispLocation }) // watch user location change 
        LocationPermission() // request for permission 
    }, []);



    return User == null ? Redirect() : (

        <>
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
                        {myCurrentLocation &&
                            <MapView

                                // initial location view of the map
                                region={
                                    {
                                        latitude: myCurrentLocation.latitude,
                                        longitude: myCurrentLocation.longitude,
                                        latitudeDelta: delta.latitudeDelta,
                                        longitudeDelta: delta.longitudeDelta,
                                    }
                                }
                                ref={mapRef}
                                style={{
                                    // flex: 1,
                                    // minHeight: 100,
                                    height: "75%"
                                }}

                            >

                                <Circle 
                                fillColor="rgba(135, 206, 235, 0.5)"
                                strokeColor='transparent'
                                center={myCurrentLocation} radius={10000} />

                                {/* draw direction only when the user have selected their destination bethel */}
                                {
                                    drawRoute == true && bethelData &&
                                    <MapViewDirections
                                        origin={myCurrentLocation}
                                        destination={
                                            {
                                                latitude: bethelData.latitude,
                                                longitude: bethelData.longitude
                                            }
                                        }
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        strokeWidth={3}
                                        strokeColor={Colors.primary}
                                        optimizeWaypoints={true}
                                        onReady={result => {
                                            setDrawerType("ENROUTE")
                                            handleSnapPress(0)
                                            setrouteLoading(false)
                                            setRouteData({
                                                duration: result.duration,
                                                distance: result.distance,
                                            })


                                            let Aminate = () => {
                                                mapRef.current.animateToRegion(
                                                    {
                                                        ...bethelData, latitudeDelta: 0.00421,
                                                        longitudeDelta: 0.00421,
                                                    }, 3000);

                                                setTimeout(() => {
                                                    mapRef.current.animateToRegion(
                                                        {
                                                            ...myCurrentLocation, latitudeDelta: 0.00421,
                                                            longitudeDelta: 0.00421,
                                                        }, 5000);
                                                    setDriving(true)
                                                }, 4000);


                                                // setDrawerType("ENROUTE") 0.00421
                                            }
                                            if (Driving == false) {
                                                Aminate()
                                            }
                                        }}
                                    />
                                }


                                {/* Marker showing User's current location */}
                                <Marker
                                    coordinate={{
                                        latitude: myCurrentLocation.latitude,
                                        longitude: myCurrentLocation.longitude,
                                    }}
                                    title={`Info`}
                                    description={`Your current location`}
                                />

                                {/* marker showing bethels */}

                                {FechBethels.length > 0 && FechBethels.map((marker, index) => (
                                    <Marker.Animated
                                        key={index}
                                        // ref={markerRef}
                                        // draggable
                                        coordinate={marker}
                                        title={`View Detail`}
                                        description={`Click to view bethel details.`}
                                        onPress={(e) => {
                                            // setdrawRoute(false)
                                            let coord = e.nativeEvent.coordinate
                                            console.log(mapRef.current.animateToRegion)
                                            setTimeout(() => {
                                                handleSnapPress(1)
                                                setDrawerType("SELECTED BETHEL")
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
                                marginTop:10,
                                // flex: 1,
                                // backgroundColor: Colors.light,
                                width: "100%",
                                marginHorizontal: 10,
                            }} >
                                <OpenDrawer style={{
                                    // marginRight: 20
                                }} />

                                <AccountIcon />

                                <NotificationIcon />
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

                                            {filteredData.length != 0 && (
                                                <View>
                                                    {filteredData.slice(0, 4).map((value, index) => {
                                                        return (
                                                            <Pressable key={index} style={{
                                                                backgroundColor: Colors.light,
                                                                width: "90%",
                                                                marginLeft: "5%",
                                                                marginTop: 6,
                                                                padding: 11,
                                                                borderRadius: 6
                                                            }}
                                                                onPress={() => {
                                                                    // console.log(value)
                                                                    setbethelData(value)
                                                                    setdrawRoute(false)
                                                                    handleSnapPress(1)
                                                                    setDrawerType("SELECTED BETHEL")
                                                                }}
                                                            >
                                                                <Text style={
                                                                    [
                                                                        Style.boldText,
                                                                        {}]
                                                                }>{value.bethel} </Text>
                                                            </Pressable>
                                                        );
                                                    })}
                                                </View>
                                            )}

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
        dispLocation: (payload) => dispatch(MyLocation(payload))
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

