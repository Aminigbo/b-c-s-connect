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
    BackHandler
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChurch, faHouse, faMapMarker, faMapMarkerAlt, faMarker, faPhone, faRecycle, faRepeat, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountIcon, OpenDrawer } from '../../components/icons';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { surprise_state, user_state, logoutUser } from '../../redux';
import { Style } from '../../../assets/styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { AnimatedRegion, Animated, Circle, Polyline } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { PrimaryButton } from '../../components/buttons/primary';
import Autocomplete from 'react-native-autocomplete-input';
import { EmptyData } from '../../events/components/empty-display';
import { FetchStateData } from '../models';

import { HandleFPN } from '../../services/handleFPN';

const Colors = Color()






function Add_details({ navigation, disp_logout, appState }) {
    // navigator.geolocation = require('@react-native-community/geolocation');
    const mapRef = useRef(null);
    const User = appState.User
    const [latLng, setLatLng] = useState();
    const [drawerState, setdrawerState] = useState(0)
    const APIKEY = 'AIzaSyC2jZWqEdoJyi_0glJCZLOJ9NslccFwKI0'
    const [currentLocation, setCurrentLocation] = useState(null);
    const [delta, setDelta] = useState({
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
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
            // console.error('Error fetching street address:', error);
        }
    };

    // function to the current user's address
    // const fetchStreetAddress = async (latitude, longitude) => {
    //     try {
    //         const response = await fetch(
    //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
    //         );
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data)
    //             if (data.results.length > 0) {
    //                 const streetAddress = data.results[0].formatted_address;
    //                 console.log('Street Address:', streetAddress);
    //             }
    //         } else {
    //             console.error('Error fetching street address:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching street address:', error);
    //     }
    // };

    const requestLocationPermission = async () => {
        setLoading(true)
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("still  getting current loc")
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                        // fetchStreetAddress(latitude, longitude); // Fetch street address 
                        FetchStateData(User.state)
                            .then(res => {
                                if (res.error != null) {
                                    setLoading(false)
                                    alert("Make sure your are connected to the internet")
                                } else {
                                    setFechBethels(res.data[0].bethel)
                                    seterror({
                                        msg: "",
                                        type: "",
                                        status: false
                                    })
                                }
                                setLoading(false)
                                handleSnapPress(0)
                            })
                    },
                    (error) => {
                        console.error(error);
                        setLoading(false)
                    }
                );

            } else {
                setLoading(false)
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
            setLoading(false)
        }


        // console.log(currentLocation)
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         Geolocation.watchPosition(
        //             (position) => {
        //                 const { latitude, longitude } = position.coords;
        //                 setCurrentLocation({ latitude, longitude });
        //                 console.log(position)
        //             },
        //             (error) => {
        //                 console.error(error);
        //             },
        //             { enableHighAccuracy: true, distanceFilter: 10 }
        //         );
        //     } else {
        //         console.log('Location permission denied');
        //     }
        // } catch (err) {
        //     console.warn(err);
        // }
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
            console.log("User", User)
            if (User == null) {
                navigation.replace("Auth");
            } else {
                setDelta({
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                })
                setLatLng({
                    latitude: 5.0363,
                    longitude: 7.9167,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                })


                requestLocationPermission();
            }

            handleSnapPress(0)

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
    const snapPoints = useMemo(() => ['17%', '70%', '95%'], []);

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

    const GOOGLE_MAPS_APIKEY = APIKEY;


    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

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
            console.log(details.geometry.location)

            setdrawRoute(false)
            let coord = details.geometry.location
            setTimeout(() => {
                handleSnapPress(1)
                setDrawerType("SELECTED BETHEL")
            }, 500);
            console.log(coord)

            setbethelData({
                latitude: coord.lat,
                longitude: coord.lng,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
                bethel: "Ndele bethel"
            })




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
                    <View style={{ width: "100%", justifyContent: "flex-start", flex: 1, }} >
                        <Pressable
                            style={{
                                // backgroundColor: "red",
                                // padding: 20,
                                flexDirection: "row",
                                flex: 1
                            }}
                        >

                            <Pressable style={{
                                // backgroundColor: "blue",
                                // padding: 20,
                                flexDirection: "row",
                                flex: 1
                            }}

                                onPress={() => {
                                    handleSnapPress(1)
                                }}
                            >
                                <FontAwesomeIcon size={23} style={{
                                    // flex: 1,
                                    color: Colors.primary,
                                    // opacity: 0.8,
                                    marginLeft: 10
                                    // margin: 20,
                                }}
                                    icon={faMapMarkerAlt} />
                                <Text style={[Style.boldText, { marginLeft: 10 }]}>
                                    Bethel info
                                </Text>
                            </Pressable>

                            <Pressable style={{
                                // backgroundColor: "green", 
                                justifyContent: "center",
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                            }}
                                onPress={() => {
                                    handleSnapPress(2)
                                    setDrawerType("IDLE")
                                    setsearch(true)
                                    setWordEntered("")
                                    setFilteredData([])
                                }}
                            >
                                <FontAwesomeIcon size={23} style={{
                                    color: Colors.primary,
                                    marginLeft: 10,

                                }}
                                    icon={faRepeat} />
                            </Pressable>
                        </Pressable>
                        <View
                            style={{
                                backgroundColor: "#E1ECF4",
                                // backgroundColor: Colors.light,
                                padding: 18,
                                // borderRadius: 10,
                                marginTop: 14,
                                marginBottom: 10,
                                borderRadius: 6,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around"
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark,
                                    fontSize: 20,
                                    // textAlign:"center",
                                    fontWeight: 900,
                                    flex: 9,
                                    // backgroundColor:"red",
                                    textAlign: "left"
                                }}>
                                {bethelData.bethel}
                            </Text>
                            <FontAwesomeIcon size={29} style={{
                                color: Colors.grey,
                                marginLeft: 10,

                            }}
                                icon={faChurch} />
                        </View>

                        <View
                            style={{
                                // flex: 1,
                                justifyContent: 'space-between',
                                // flexDirection:"column",
                                // backgroundColor:"lime"
                            }} >
                            <View>

                                <Text
                                    style={[Style.boldText, {
                                        textAlign: "left",
                                        marginLeft: 20
                                    }]}>
                                    {bethelData.data.address}
                                </Text>

                                <Text
                                    style={[Style.Text, {
                                        textAlign: "left",
                                        marginLeft: 20,
                                        marginTop: 16
                                    }]}>
                                    Clossest Landmark
                                </Text>
                                <Text
                                    style={[Style.boldText, {
                                        textAlign: "left",
                                        marginLeft: 20
                                    }]}>
                                    {bethelData.data.landmark}
                                </Text>
                                <Text
                                    style={[Style.Text, {
                                        textAlign: "left",
                                        marginLeft: 20,
                                        marginTop: 16
                                    }]}>
                                    Contact :
                                </Text>

                                {bethelData.data.phones.split(",").map((e, index) => {
                                    return <>
                                        <Text
                                            key={index}
                                            style={[Style.boldText, {
                                                textAlign: "left",
                                                marginLeft: 20
                                            }]}>
                                            {e}
                                        </Text></>
                                })}

                                {/* <Image
                                style={[styles.imageBackground, {
                                    width: "90%", height: "30%",
                                    marginTop: 14,
                                    marginLeft: "5%"
                                    // borderRadius: 10,
                                }]}
                                // source={require('../../assets/user.png')}
                                // source={require('../../../assets/img2.jpg')}
                                // source={require('@expo/snack-static/react-native-logo.png')}
                                src={'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/358493856_3542083182778032_7112673311330109004_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFpOkiXbHw9FSo_CGwU5DXD8LBL3iMUrovwsEveIxSui6l54HnFzplu5FwZwPJReRVcpDVSPWEqM-crqbcuMciT&_nc_ohc=-GTeWzey9bIAX9ctaW-&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfDFt3_p_YjK9DpJ9I2caWReQOU02QcpYlRwbTxGxnpq8A&oe=64AE0052'}
                                resizeMode={'stretch'} /> */}
                            </View>

                        </View>

                        <Pressable style={{
                            flexDirection: "row",
                            flex: 1,
                            marginTop: 27
                        }}

                            onPress={() => {
                                let numb = bethelData.data.phones.split(",")[0]
                                const phoneNumber = `tel:${numb}`;
                                Linking.openURL(phoneNumber);
                            }}
                        >
                            <FontAwesomeIcon size={23} style={{
                                // flex: 1,
                                color: Colors.primary,
                                // opacity: 0.8,
                                marginLeft: 10
                                // margin: 20,
                            }}
                                icon={faPhone} />
                            <Text style={[Style.boldText2, { marginLeft: 10 }]}>
                                Call for direction
                            </Text>
                        </Pressable>


                    </View >

                    {/* button to draw route */}
                    {
                        drawerType != "ENROUTE" &&
                        <PrimaryButton
                            style={{
                                width: "90%",
                                // marginLeft: "5%",
                                marginTop: 40,
                                flex: 1,
                                // position: "absolute",
                                // bottom: 10
                            }}
                            title="See direction on map" callBack={() => {
                                setdrawRoute(true)
                                handleSnapPress(0)
                                setsearch(false)
                                setDrawerType("ENROUTE")
                                setDelta({
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                })
                                // handleRotateMap({
                                //     latitude: currentLocation.latitude,
                                //     longitude: currentLocation.longitude,
                                // })
                                // Animate the map to the new region
                                const duration = 1000;
                                const easing = Easing.out(Easing.quad);
                                const newAnimatedRegion = new AnimatedRegion(latLng);
                                newAnimatedRegion
                                    .timing({ ...latLng, duration, easing })
                                    // .start();
                                    .start(() => {
                                        mapRef.current.animateToRegion(latLng);
                                        setTimeout(() => {
                                            newAnimatedRegion
                                                .timing({
                                                    latitude: bethelData.latitude,
                                                    longitude: bethelData.longitude,
                                                    latitudeDelta: 0.02,
                                                    longitudeDelta: 0.02,
                                                    duration,
                                                    easing
                                                })
                                                .start(
                                                    () => {
                                                        mapRef.current.setCamera({
                                                            center: {
                                                                latitude: currentLocation.latitude,
                                                                longitude: currentLocation.longitude,
                                                            },
                                                            heading: 360,
                                                            pitch: 0,
                                                            zoom: 18,
                                                            altitude: 0,
                                                        });
                                                    }
                                                )
                                        }, 1000);
                                    });

                                // console.log(bethelData)
                            }} />
                    }

                    <Text
                        style={[Style.LabelText, {
                            textAlign: "left",
                            marginLeft: 20,
                            marginTop: 10
                        }]}>
                        Direction will be drawn on the map from your current location to {bethelData.bethel}.
                    </Text>

                </>
            )
        }
    }

    const Redirect = () => {
        return navigation.replace("Auth")
    }

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
                            onPress={() => requestLocationPermission()} >
                            {loading == true ? <ActivityIndicator /> : <Text style={[Style.boldText]} >Retry</Text>}
                        </TouchableOpacity>
                    </View>
                </> :
                    <>

                        {/* {console.log("User object", User)} */}
                        {/* only display the map whhen the user's current location is fetched. */}
                        {currentLocation &&
                            <>
                                {latLng &&
                                    <MapView

                                        // initial location view of the map
                                        region={
                                            {
                                                latitude: currentLocation.latitude,
                                                longitude: currentLocation.longitude,
                                                latitudeDelta: delta.latitudeDelta,
                                                longitudeDelta: delta.longitudeDelta,
                                            }
                                        }
                                        ref={mapRef}
                                        style={{
                                            flex: 1,
                                            minHeight: 100,
                                        }}

                                    >


                                        {/* draw direction only when the user have selected their destination bethel */}
                                        {
                                            drawRoute == true && bethelData &&
                                            <MapViewDirections
                                                origin={currentLocation}
                                                destination={
                                                    {
                                                        latitude: bethelData.latitude,
                                                        longitude: bethelData.longitude
                                                    }
                                                }
                                                apikey={GOOGLE_MAPS_APIKEY}
                                                strokeWidth={3}
                                                strokeColor={Colors.primary}
                                                onReady={result => {
                                                    console.log(`Distance: ${result.distance} km`)
                                                    console.log(`Duration: ${result.duration} min.`)
                                                }}
                                            />
                                        }


                                        {/* Marker showing User's current location */}
                                        <Marker
                                            coordinate={{
                                                latitude: currentLocation.latitude,
                                                longitude: currentLocation.longitude,
                                            }}
                                            title={`Info`}
                                            description={`Your current location`}
                                        >
                                            <View style={{
                                                height: 30, width: 30,
                                                backgroundColor: Colors.primary,
                                                justifyContent: "center",
                                                flex: 1,
                                                alignItems: "center",
                                                borderRadius: 50,
                                                // padding:12
                                            }} >
                                                <FontAwesomeIcon size={14} style={{
                                                    // flex: 1,
                                                    color: Colors.light,
                                                    // backgroundColor: "blue"
                                                    // margin: 20,
                                                }}
                                                    icon={faMapMarkerAlt} />
                                            </View>
                                        </Marker>



                                        {/* marker showing bethels */}
                                        {FechBethels.map((marker, index) => (
                                            <Marker
                                                key={index}
                                                // draggable
                                                coordinate={marker}
                                                title={`View Detail`}
                                                description={`Click to view bethel details.`}
                                                onPress={(e) => {
                                                    setdrawRoute(false)
                                                    let coord = e.nativeEvent.coordinate
                                                    console.log(e.nativeEvent)
                                                    setTimeout(() => {
                                                        handleSnapPress(1)
                                                        setDrawerType("SELECTED BETHEL")
                                                    }, 500);
                                                    saveBethelToState({ lat: coord.latitude, lng: coord.longitude })

                                                }}
                                            >
                                            </Marker>
                                        ))}

                                        {/* {
                                drawRoute == false &&
                                <Circle
                                    center={{
                                        latitude: currentLocation.latitude,
                                        longitude: currentLocation.longitude,
                                    }}
                                    radius={5000}
                                    strokeWidth={1}
                                    strokeColor="#660708"
                                    fillColor="rgb(255, 248, 240)"
                                />
                            } */}

                                    </MapView>
                                }
                            </>
                        }


                        <View style={styles.content}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // flex: 1,
                                // backgroundColor: Colors.light,
                                width: "100%",
                                marginHorizontal: 10,
                            }} >
                                <OpenDrawer style={{
                                    // marginRight: 20
                                }} />
                                
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

                            <View style={[styles.content,{
                                zIndex:2000
                            }]}>
                                <RenderBethelInfo />
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
                                                <Text style={[Style.boldText, { marginLeft: 10 }]}>Find A Bethel</Text>
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

