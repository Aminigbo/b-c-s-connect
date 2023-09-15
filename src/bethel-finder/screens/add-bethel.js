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
    Alert
} from 'react-native';
import { Divider, Avatar } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChurch, faClose, faHouse, faImage, faMapMarker, faMapMarkerAlt, faMarker, faPhone, faRecycle, faRepeat, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountIcon, CustomMarker, OpenDrawer } from '../../components/icons';
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
import { Picker } from '@react-native-picker/picker';
import { AddNewBethel, FetchStateData } from '../models';
import { PickPhoto } from '../../utilities/pickPhoto';
import { BoldText1 } from '../../components/text';
import { UploadImage } from '../../services/uploadImg';
import { supabase } from '../../config/supabase';
const Colors = Color()






function Add_bethel({ navigation, disp_logout, appState }) {
    // navigator.geolocation = require('@react-native-community/geolocation');
    const mapRef = useRef(null);
    const [latLng, setLatLng] = useState();
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
    const [loadingText, setLoadingText] = useState(null)
    const [selectedState, setselectedState] = useState(false);
    const [selectedZone, setselectedZone] = useState(false);
    const [previewDPchnage, setpreviewDPchnage] = useState({ status: false })
    const [previewDPchnage2, setpreviewDPchnage2] = useState({ status: false })
    const [previewDPchnage3, setpreviewDPchnage3] = useState({ status: false })
    const [previewDPchnage4, setpreviewDPchnage4] = useState({ status: false })
    const [bethelData, setbethelData] = useState(null);
    const [ZoneList, setZoneList] = useState([]);
    const [newBethelDatas, setnewBethelDatas] = useState({})
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
                        console.log("fetched Lat lng", { latitude, longitude })
                        seterror({
                            msg: "",
                            type: "",
                            status: false
                        })
                    },
                    (error) => {
                        console.error(error);
                    },
                    {
                        // enableHighAccuracy: true, // Use GPS if available
                        timeout: 20000,           // Timeout after 20 seconds
                        maximumAge: 1000,         // Accept cached location data within 1 second
                    }
                );
                setLoading(false)
            } else {
                setLoading(false)
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
            setLoading(false)
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
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

        });

        return unsubscribe;
    }, [navigation])


    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['95%'], []);

    // callbacks when the drawer is closed or open
    const handleSheetChanges = useCallback((index) => {
        console.log("Page close")
    }, []);

    // show the overlay from the bottom drawer
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const GOOGLE_MAPS_APIKEY = APIKEY;
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");


    function AddBethelFunction() {
        if (!newBethelDatas.state || !newBethelDatas.zone || !newBethelDatas.name || !newBethelDatas.name ||
            !newBethelDatas.phones || !newBethelDatas.address) {
            alert("Fill out all forms")
        } else {
            console.log(newBethelDatas)
            setLoading(true)
            // fetch data from the selected state
            FetchStateData(newBethelDatas.state)
                .then(response => {
                    // console.log(response.data[0])


                    // new bthel object
                    let NewBetheObj = {
                        description: newBethelDatas.address,
                        // latitude: currentLocation.latitude,
                        // longitude: currentLocation.longitude,
                        latitude: lat.length > 4 ? parseFloat(lat) : currentLocation.latitude,
                        longitude: lng.length > 4 ? parseFloat(lng) : currentLocation.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                        bethel: newBethelDatas.name,
                        data: newBethelDatas
                    }


                    let returnedBethels = response.data[0].bethel
                    // check if there's any bethel existing with such name
                    if (returnedBethels.length > 0) {
                        // get index
                        let index = returnedBethels.findIndex(e => e.bethel == newBethelDatas.name)
                        // check if it exists
                        let Filter = returnedBethels.filter(e => e.bethel == newBethelDatas.name && e.latitude == currentLocation.latitude)

                        //  Bethel with such name exists
                        if (Filter.length > 0) {
                            // console.log("splice")
                            // returnedBethels.splice(index, 1 NewBetheObj)
                            alert(`${newBethelDatas.name} already exists`)
                            setLoading(false)
                        } else {


                            // setLoading(false) 
                            let Uris = []
                            supabase.storage
                                .from("bethels")
                                .upload(previewDPchnage.fileName, previewDPchnage.formData)
                                .then(response => {
                                    console.log("First response", response)
                                    setLoadingText("Added first image")
                                    Uris.push(response.data.path)
                                    supabase.storage
                                        .from("bethels")
                                        .upload(previewDPchnage2.fileName, previewDPchnage2.formData)
                                        .then(response2 => {
                                            console.log("second response", response2)
                                            setLoadingText("Added second image")
                                            Uris.push(response2.data.path)
                                            supabase.storage
                                                .from("bethels")
                                                .upload(previewDPchnage3.fileName, previewDPchnage3.formData)
                                                .then(response3 => {
                                                    console.log("third response", response3)
                                                    setLoadingText("Added third image")
                                                    Uris.push(response3.data.path)
                                                    supabase.storage
                                                        .from("bethels")
                                                        .upload(previewDPchnage4.fileName, previewDPchnage4.formData)
                                                        .then(response4 => {
                                                            console.log("fourth response", response4)
                                                            setLoadingText("Added fourth image")
                                                            Uris.push(response4.data.path)

                                                            // setLoading(false)
                                                            console.log()
                                                            returnedBethels.push({ ...NewBetheObj, Uris })
                                                            let payload = {
                                                                data: returnedBethels,
                                                                state: newBethelDatas.state
                                                            }
                                                            AddNewBethel(payload)
                                                                .then(res => {
                                                                    // console.log(res)
                                                                    Alert.alert("Success", `${newBethelDatas.name} have been added successfully`, [
                                                                        {
                                                                            text: "Ok", onPress: () => {
                                                                                setLoading(false)
                                                                                setbethelData(null)
                                                                                setselectedZone(false)
                                                                                setselectedState(false)
                                                                                // navigation.pop()
                                                                            }
                                                                        }
                                                                    ])
                                                                })
                                                                .catch(err => {

                                                                })
                                                        })
                                                })
                                        })
                                })
                            // console.log(previewDPchnage.source[0])


                        }
                    } else {

                        // setLoading(false) 
                        let Uris = []
                        supabase.storage
                            .from("bethels")
                            .upload(previewDPchnage.fileName, previewDPchnage.formData)
                            .then(response => {
                                console.log("First response", response)
                                setLoadingText("Added first image")
                                Uris.push(response.data.path)
                                supabase.storage
                                    .from("bethels")
                                    .upload(previewDPchnage2.fileName, previewDPchnage2.formData)
                                    .then(response2 => {
                                        console.log("second response", response2)
                                        setLoadingText("Added second image")
                                        Uris.push(response2.data.path)
                                        supabase.storage
                                            .from("bethels")
                                            .upload(previewDPchnage3.fileName, previewDPchnage3.formData)
                                            .then(response3 => {
                                                console.log("third response", response3)
                                                setLoadingText("Added third image")
                                                Uris.push(response3.data.path)
                                                supabase.storage
                                                    .from("bethels")
                                                    .upload(previewDPchnage4.fileName, previewDPchnage4.formData)
                                                    .then(response4 => {
                                                        console.log("fourth response", response4)
                                                        setLoadingText("Added fourth image")
                                                        Uris.push(response4.data.path)

                                                        // setLoading(false)
                                                        console.log()
                                                        returnedBethels.push({ ...NewBetheObj, Uris })
                                                        let payload = {
                                                            data: returnedBethels,
                                                            state: newBethelDatas.state
                                                        }
                                                        AddNewBethel(payload)
                                                            .then(res => {
                                                                // console.log(res)
                                                                Alert.alert("Success", `${newBethelDatas.name} have been added successfully`, [
                                                                    {
                                                                        text: "Ok", onPress: () => {
                                                                            setLoading(false)
                                                                            setbethelData(null)
                                                                            setselectedZone(false)
                                                                            setselectedState(false)
                                                                            // navigation.pop()
                                                                        }
                                                                    }
                                                                ])
                                                            })
                                                            .catch(err => {

                                                            })
                                                    })
                                            })
                                    })
                            })


                        // returnedBethels.push(NewBetheObj)
                        // let payload = {
                        //     data: returnedBethels,
                        //     state: newBethelDatas.state
                        // }
                        // AddNewBethel(payload)
                        //     .then(res => {
                        //         // console.log(res)
                        //         setLoading(false)
                        //         Alert.alert("Success", `${newBethelDatas.name} have been added successfully`, [
                        //             {
                        //                 text: "Ok", onPress: () => {
                        //                     setbethelData(null)
                        //                     setselectedZone(false)
                        //                     setselectedState(false)
                        //                     // navigation.pop()
                        //                 }
                        //             }
                        //         ])
                        //     })
                        //     .catch(err => {

                        //     })
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })


        }
    }



    return (
        <>
            {loading == true &&
                <View
                    style={{
                        display: "flex",
                        // marginTop: 10,
                        // backgroundColor: Colors.light,
                        backgroundColor: "rgb(0,0,0)",
                        opacity: 0.8,
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
                    <ActivityIndicator />
                    <Text style={{ color: "white" }}>{loadingText}</Text>
                </View>
            }

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

                        </MapView>
                    }
                </>
            }



            <BottomSheet
                // enablePanDownToClose={false}
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >


                <ScrollView >
                    <View style={{ width: "100%", justifyContent: "flex-start" }} >

                        <View style={{
                            alignItems: "center"
                        }}>
                            <Text style={{ color: Colors.primary }} >
                                {currentLocation && currentLocation.latitude} {`>|<`}
                                {currentLocation && currentLocation.longitude}
                            </Text>
                            <View style={{
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingTop: 10,
                            }} >
                                <BoldText1 text="Your current location has been picked. Ensure you are in the bethel at the time of this upload." />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "space-between",
                            padding: 10
                        }} >
                            <TextInput
                                // onFocus={() => { handleSnapPress(2) }}
                                value={lat}
                                onChangeText={(value) => {
                                    setLat(value)
                                }}
                                style={{ flex: 1 }}
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
                                label="Lat."
                            />
                            <TextInput
                                // onFocus={() => { handleSnapPress(2) }}
                                value={lng}
                                onChangeText={(value) => {
                                    setLng(value)
                                }}
                                style={{ flex: 1 }}
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
                                label="Lng."
                            />
                        </View>

                        <Divider style={{
                            marginTop: "5%",
                        }} />

                        <Text style={{
                            marginLeft: "5%",
                            marginTop: 25, marginBottom: 4,
                            color: Colors.dark
                        }}>Select state</Text>
                        <View
                            style={{
                                backgroundColor: Colors.light,
                                color: Colors.dark,
                                borderRadius: 4,
                                marginLeft: "5%",
                                borderWidth: 0.5,
                                borderColor: Colors.dark,
                                width: "90%"
                            }}
                        >
                            <Picker
                                dropdownIconColor={Colors.dark}
                                selectedValue={newBethelDatas.state}
                                style={{ color: Colors.dark }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLoading(true)
                                    setnewBethelDatas({
                                        ...newBethelDatas,
                                        state: itemValue
                                    })


                                    FetchStateData(itemValue)
                                        .then(response => {
                                            console.log(response.data[0].zones)
                                            if (response.data[0].zones) {
                                                setselectedState(true)
                                                setZoneList(response.data[0].zones)
                                            }
                                            setLoading(false)
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            setLoading(false)
                                        })

                                }
                                }
                            >
                                <Picker.Item label="Select State" value={null} />
                                <Picker.Item label="Rivers State" value="Rivers State" />
                                <Picker.Item label="Akwa Ibom State" value="Akwa Ibom State" />
                                <Picker.Item label="Private Individual" value="Cross-Rivers State" />
                            </Picker>

                        </View>

                        {selectedState == true &&
                            <>
                                <Text style={{
                                    marginLeft: "5%",
                                    marginTop: 25, marginBottom: 4,
                                    color: Colors.dark
                                }}>Select Zone</Text>
                                <View
                                    style={{
                                        backgroundColor: Colors.light,
                                        color: Colors.dark,
                                        borderRadius: 4,
                                        marginLeft: "5%",
                                        borderWidth: 0.5,
                                        borderColor: Colors.dark,
                                        width: "90%"
                                    }}
                                >
                                    <Picker
                                        dropdownIconColor={Colors.dark}
                                        selectedValue={newBethelDatas.zone}
                                        style={{ color: Colors.dark }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setselectedZone(true)
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                zone: itemValue
                                            })
                                        }
                                        }
                                    >
                                        <Picker.Item label="Select Zone" value={null} />
                                        {ZoneList.length > 0 && ZoneList.map((e, index) => {
                                            return (
                                                <Picker.Item key={index} label={e.name} value={e.name} />
                                            )
                                        })}
                                        {/* <Picker.Item label="Rivers State" value="Rivers State" />
                                        <Picker.Item label="Akwa Ibom State" value="Akwa Ibom State" />
                                        <Picker.Item label="Private Individual" value="Cross-Rivers State" /> */}
                                    </Picker>

                                </View>
                            </>}
                        {
                            selectedZone == true && <>

                                <View>

                                    <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Bethel name</Text>
                                    <TextInput
                                        // onFocus={() => { handleSnapPress(2) }}
                                        value={newBethelDatas.name}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                name: value
                                            })
                                        }}
                                        style={{ width: "90%", marginLeft: "5%", }}
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
                                        label="Enter name of Bethel to add."
                                    />

                                    {/* <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Who's the Bethel Admin</Text>
                                    <TextInput
                                        // onFocus={() => { handleSnapPress(2) }} 
                                        value={newBethelDatas.admin}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                admin: value
                                            })
                                        }}
                                        style={{ width: "90%", marginLeft: "5%", }}
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
                                        label="Enter name of Bethel Admin"
                                    /> */}

                                    <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Phone contacts of Admin or Priest</Text>
                                    <TextInput
                                        // onFocus={() => { handleSnapPress(2) }}
                                        value={newBethelDatas.phones}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                phones: value
                                            })
                                        }}
                                        style={{ width: "90%", marginLeft: "5%", }}
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
                                        label="Enter contact phone number"
                                    />

                                    <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Bethel address</Text>
                                    <TextInput
                                        // onFocus={() => { handleSnapPress(2) }}
                                        value={newBethelDatas.address}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                address: value
                                            })
                                        }}
                                        style={{ width: "90%", marginLeft: "5%", }}
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
                                        label="What's the official address of the Bethel"
                                    />
                                    {/* <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Bethel Description</Text>
                                    <TextInput
                                        multiline
                                        // onFocus={() => { handleSnapPress(2) }}
                                        value={newBethelDatas.description}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                description: value
                                            })
                                        }}
                                        style={{ width: "90%", marginLeft: "5%", height: 80, }}
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
                                        label="Provide brief description of Bethel."
                                    /> */}


                                    {/* {console.log(previewDPchnage.source)} */}
                                    <View style={{
                                        // display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        flexWrap: 'wrap',
                                        marginTop: 30
                                    }}>
                                        {previewDPchnage.source ?
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage })
                                                }} >
                                                <Image
                                                    style={[{
                                                        aspectRatio: 1,
                                                        width: 150,
                                                        height: 150,
                                                        margin: 3
                                                    }]}
                                                    source={previewDPchnage.source}
                                                    resizeMode={'cover'} />
                                            </Pressable>

                                            :
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage })
                                                }}
                                                style={{
                                                    width: 150, height: 150, borderRightWidth: 2, justifyContent: "center", alignItems: "center"
                                                }}>
                                                <FontAwesomeIcon style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                }} size={25} icon={faImage} />
                                                <Text style={{ color: Colors.grey, marginLeft: 10 }} >Add Bethel photo</Text>
                                            </Pressable>
                                        }


                                        {previewDPchnage2.source ?
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage2 })
                                                }} >
                                                <Image
                                                    style={[{
                                                        aspectRatio: 1,
                                                        width: 150,
                                                        height: 150,
                                                        margin: 3
                                                    }]}
                                                    source={previewDPchnage2.source}
                                                    resizeMode={'cover'} />
                                            </Pressable>

                                            :
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage2 })
                                                }}
                                                style={{
                                                    width: 150, height: 150, justifyContent: "center", alignItems: "center"
                                                }}>
                                                <FontAwesomeIcon style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                }} size={25} icon={faImage} />
                                                <Text style={{ color: Colors.grey, marginLeft: 10 }} >Add Bethel photo</Text>
                                            </Pressable>}

                                        {previewDPchnage3.source ?
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage3 })
                                                }} >
                                                <Image
                                                    style={[{
                                                        aspectRatio: 1,
                                                        width: 150,
                                                        height: 150,
                                                        margin: 3
                                                    }]}
                                                    source={previewDPchnage3.source}
                                                    resizeMode={'cover'} />
                                            </Pressable>

                                            :
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage3 })
                                                }}
                                                style={{
                                                    width: 150, height: 150, borderRightWidth: 2, borderTopWidth: 2, justifyContent: "center", alignItems: "center"
                                                }}>
                                                <FontAwesomeIcon style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                }} size={25} icon={faImage} />
                                                <Text style={{ color: Colors.grey, marginLeft: 10 }} >Add Bethel photo</Text>
                                            </Pressable>}

                                        {previewDPchnage4.source ?
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage4 })
                                                }} >
                                                <Image
                                                    style={[{
                                                        aspectRatio: 1,
                                                        width: 150,
                                                        height: 150,
                                                        margin: 3
                                                    }]}
                                                    source={previewDPchnage4.source}
                                                    resizeMode={'cover'} />
                                            </Pressable>

                                            :
                                            <Pressable
                                                android_ripple={{ color: Colors.primary }}
                                                onPress={() => {
                                                    PickPhoto({ setpreviewDPchnage: setpreviewDPchnage4 })
                                                }}
                                                style={{
                                                    width: 150, height: 150, borderTopWidth: 2, justifyContent: "center", alignItems: "center"
                                                }}>
                                                <FontAwesomeIcon style={{
                                                    flex: 1,
                                                    color: Colors.primary,
                                                }} size={25} icon={faImage} />
                                                <Text style={{ color: Colors.grey, marginLeft: 10 }} >Add Bethel photo</Text>
                                            </Pressable>}

                                    </View>





                                    <PrimaryButton
                                        style={{
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: 40,
                                            flex: 1,
                                            marginBottom: 30
                                            // position: "absolute",
                                            // bottom: 10
                                        }}
                                        // loading={loading}
                                        title="Add Bethel.."
                                        callBack={() => {
                                            AddBethelFunction()
                                            // console.log(previewDPchnage)
                                        }} />

                                </View>
                            </>
                        }



                    </View>
                </ScrollView>


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


export default connect(mapStateToProps, mapDispatchToProps)(Add_bethel);



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

