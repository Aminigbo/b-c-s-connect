import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    Pressable, Easing,
    PermissionsAndroid
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChurch, faHouse, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountIcon, OpenDrawer } from '../../components/icons';
import { Color } from '../../components/theme';
import { connect } from 'react-redux';
import { surprise_state, user_state, logoutUser } from '../../redux';
import { Style } from '../../../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser } from '../../auth/models/auth-models';
import { isAuth } from '../../auth/models/auth-models';
import MapView, { AnimatedRegion, Animated, Circle, Polyline } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const Colors = Color()


function Add_details({ navigation, disp_logout, appState }) {
    const mapRef = useRef(null);
    const [latLng, setLatLng] = useState();
    const APIKEY = 'AIzaSyC2jZWqEdoJyi_0glJCZLOJ9NslccFwKI0'
    const [currentLocation, setCurrentLocation] = useState(null);
    const [delta, setDelta] = useState({
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    })
    const [drawerType, setDrawerType] = useState(" ");
    const [bethelData, setbethelData] = useState(null);
    const [drawRoute, setdrawRoute] = useState(false);

    const handleRotateMap = (data) => {
        if (mapRef.current) {
            console.log(mapRef.current.getCamera())
            mapRef.current.setCamera({
                center: data,
                heading: 360,
                pitch: 0,
                zoom: 18,
                altitude: 0,
            });
        }
    };


    const MarkersLatng = [{
        latitude: 5.0363,
        longitude: 7.9167,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Ndele bethel"
    },
    {
        latitude: 5.0441,
        longitude: 7.9273,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Rumuji bethel"
    }, {
        latitude: 5.0511,
        longitude: 7.9337,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Emohua bethel"
    }, {
        latitude: 5.0279,
        longitude: 7.9340,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Ibaa bethel"
    }, {
        latitude: 5.0223,
        longitude: 7.9140,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Diobu bethel"
    }
    ]

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setLatLng({
                latitude: 5.0363,
                longitude: 7.9167,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })


            const fetchStreetAddress = async (latitude, longitude) => {
                try {
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
                    );
                    console.log(response.data)
                    if (response.data.results.length > 0) {
                        const streetAddress = response.data.results[0].formatted_address;
                        console.log('Street Address:', streetAddress);
                    }
                } catch (error) {
                    console.error('Error fetching street address:', error);
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
                                fetchStreetAddress(latitude, longitude); // Fetch street address 
                                console.log("fetched Lat lng")
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    } else {
                        console.log('Location permission denied');
                    }
                } catch (err) {
                    console.warn(err);
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

            requestLocationPermission();

        });

        return unsubscribe;
    }, [navigation])

    // ======================
    // save bethel detail to state
    const saveBethelToState = (data) => {
        let { lat, lng } = data;
        let getBethel = MarkersLatng.filter(e => e.longitude == lng && e.latitude == lat)
        console.log(getBethel[0])
        setbethelData(getBethel[0])
    }


    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['20%', '70%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index == -1) {
            handleSnapPress(0)
            setDrawerType(" ")
        }
    }, []);

    // renders
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

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const origin = { latitude: 5.0363, longitude: 7.9167, };
    const destination = { latitude: 5.0279, longitude: 7.9340, };
    const GOOGLE_MAPS_APIKEY = APIKEY;



    return (

        <>
            {currentLocation &&
                <>
                    {latLng &&
                        <MapView
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
                            onCalloutPress={() => {
                                // handleSnapPress(1)
                            }}

                        >


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
                                    backgroundColor: Colors.lightgrey,
                                    justifyContent: "center",
                                    flex: 1,
                                    alignItems: "center",
                                    borderRadius: 50
                                }} >
                                    <FontAwesomeIcon size={20} style={{
                                        // flex: 1,
                                        color: Colors.primary,
                                        // backgroundColor: "blue"
                                        // margin: 20,
                                    }}
                                        icon={faUser} />
                                </View>
                            </Marker>



                            {/* marker showing bethels */}
                            {MarkersLatng.map((marker, index) => (
                                <Marker
                                    // draggable
                                    coordinate={marker}
                                    title={`View Detail`}
                                    description={`Click to view bethel details.`}
                                    onPress={(e) => {
                                        let coord = e.nativeEvent.coordinate
                                        console.log(e.nativeEvent)
                                        setTimeout(() => {
                                            handleSnapPress(1)
                                            setDrawerType("BETHEL INFO")
                                        }, 500);
                                        saveBethelToState({ lat: coord.latitude, lng: coord.longitude })
                                        // Animate the map to the new region
                                        const duration = 3000;
                                        const easing = Easing.out(Easing.quad);
                                        const newAnimatedRegion = new AnimatedRegion(latLng);
                                        newAnimatedRegion
                                            .timing({ ...latLng, duration, easing })
                                            // .start();
                                            .start(() => {
                                                mapRef.current.animateToRegion(latLng);
                                                setTimeout(() => {
                                                    // handleRotateMap({
                                                    //     latitude: currentLocation.latitude,
                                                    //     longitude: currentLocation.longitude,
                                                    // })
                                                    // setDelta({
                                                    //     latitudeDelta: 0.01,
                                                    //     longitudeDelta: 0.01,
                                                    // })
                                                    newAnimatedRegion
                                                        .timing({
                                                            latitude: coord.latitude,
                                                            longitude: coord.longitude,
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
                                    }}


                                >
                                    {/* <FontAwesomeIcon size={16} style={{
                                // flex: 1,
                                color: Colors.primary,
                                // margin: 20,
                            }}
                                icon={faChurch} /> */}
                                </Marker>
                            ))}


                            {/* <Circle
                        center={latLng}
                        radius={3000}
                        strokeWidth={1}
                        strokeColor="#660708"
                        fillColor="rgb(255, 248, 240)"
                    /> */}
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
                    // backgroundColor:"red",
                    width: "100%",
                    marginHorizontal: 10,
                }} >
                    <OpenDrawer style={{ marginRight: 20 }} />
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

                <View style={styles.content}>
                    {drawerType == "BETHEL INFO" ?

                        <>
                            <View style={{ width: "100%", justifyContent: "flex-start" }} >
                                <Pressable
                                    onPress={() => {
                                        setdrawRoute(true)
                                        handleSnapPress(0)
                                        // setDrawerType(" ")
                                        setDelta({
                                            latitudeDelta: 0.02,
                                            longitudeDelta: 0.02,
                                        })
                                        handleRotateMap({
                                            latitude: currentLocation.latitude,
                                            longitude: currentLocation.longitude,
                                        })
                                    }}
                                    style={{
                                        // backgroundColor: "red",
                                        padding: 20, flexDirection: "row"
                                    }} >

                                    <FontAwesomeIcon size={23} style={{
                                        // flex: 1,
                                        color: Colors.primary,
                                        // opacity: 0.8,
                                        marginLeft: 10
                                        // margin: 20,
                                    }}
                                        icon={faMapMarkerAlt} />
                                    <Text style={[Style.boldText, { marginLeft: 10 }]}>
                                        {bethelData && bethelData.bethel}
                                    </Text>
                                </Pressable>

                            </View>
                        </> :
                        <>
                            <View style={{ width: "100%", justifyContent: "flex-start" }} >
                                <Pressable
                                    onPress={() => {
                                        console.log("pressed")
                                        setLatLng(
                                            {
                                                latitude: 5.0363,
                                                longitude: 7.9167,
                                                latitudeDelta: 0.001,
                                                longitudeDelta: 0.001,
                                                bethel: "Ndele bethel"
                                            }
                                        )
                                    }}
                                    style={{
                                        // backgroundColor: "red",
                                        padding: 20, flexDirection: "row"
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
                                    keyboardType='numeric'
                                    // autoFocus
                                    // onChangeText={(value) => setData({ ...data, email: value })}
                                    style={{ width: "90%", marginLeft: "5%" }}
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
                                    label="Your current location"
                                />
                                <TextInput
                                    keyboardType='numeric'
                                    // autoFocus
                                    // onChangeText={(value) => setData({ ...data, email: value })}
                                    style={{ width: "90%", marginLeft: "5%", marginTop: 20 }}
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
                                    label="Enter bethel name"
                                />
                            </View>
                        </>}



                </View>

            </BottomSheet>

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
        width: "100%"
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

