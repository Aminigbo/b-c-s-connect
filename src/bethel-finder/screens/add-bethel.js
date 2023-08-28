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
import { Picker } from '@react-native-picker/picker';
import { AddNewBethel, FetchStateData } from '../models';
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
    const [selectedState, setselectedState] = useState(false);
    const [selectedZone, setselectedZone] = useState(false);
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


    const FechBethels = [{
        description: 'Ndele bethel',
        latitude: 5.0363,
        longitude: 7.9167,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Ndele bethel",
    },
    {
        description: 'Rumuji bethel',
        latitude: 5.0441,
        longitude: 7.9273,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Rumuji bethel",
    }, {
        description: 'Emohua bethel',
        latitude: 5.0511,
        longitude: 7.9337,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Emohua bethel",
    }, {
        description: 'Ibaa bethel',
        latitude: 5.0279,
        longitude: 7.9340,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Ibaa bethel",
    }, {
        description: 'Diobu bethel',
        latitude: 5.0223,
        longitude: 7.9140,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        bethel: "Diobu bethel",
    }
    ]



    // this function get the user's current street name
    const fetchStreetAddress = async (latitude, longitude) => {
        // setLoading(true)
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
            );
            console.log(response.data)
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

    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['88%'], []);

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

    function AddBethelFunction() {
        if (!newBethelDatas.state || !newBethelDatas.zone || !newBethelDatas.name || !newBethelDatas.name ||
            !newBethelDatas.phones || !newBethelDatas.address || !newBethelDatas.landmark || !newBethelDatas.landmark) {
            alert("Fill out all forms")
        } else {
            console.log(newBethelDatas)
            setLoading(true)
            // fetch data from the selected state
            FetchStateData(newBethelDatas.state)
                .then(response => {
                    console.log(response.data[0])


                    // new bthel object
                    let NewBetheObj = {
                        description: newBethelDatas.address,
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
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
                            returnedBethels.push(NewBetheObj)
                            let payload = {
                                data: returnedBethels,
                                state: newBethelDatas.state
                            }
                            AddNewBethel(payload)
                                .then(res => {
                                    // console.log(res)
                                    setLoading(false)
                                    Alert.alert("Success", `${newBethelDatas.name} have been added successfully`, [
                                        {
                                            text: "Ok", onPress: () => {
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
                        }
                    } else {
                        returnedBethels.push(NewBetheObj)
                        let payload = {
                            data: returnedBethels,
                            state: newBethelDatas.state
                        }
                        AddNewBethel(payload)
                            .then(res => {
                                // console.log(res)
                                setLoading(false)
                                Alert.alert("Success", `${newBethelDatas.name} have been added successfully`, [
                                    {
                                        text: "Ok", onPress: () => {
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
                        <Pressable
                            onPress={() => {
                                // setLoading(false)
                                requestLocationPermission()
                            }}
                            style={{
                                // backgroundColor: "red",
                                padding: 10,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }} >

                            {/* <FontAwesomeIcon size={23} style={{
                                // flex: 1,
                                color: Colors.primary,
                                // opacity: 0.8,
                                marginLeft: 10
                                // margin: 20,
                            }}
                                icon={faChurch} /> */}

                            <Text style={[Style.boldText, { marginLeft: 10 }]}>Add A Bethel</Text>

                            {loading == true ? <ActivityIndicator style={{
                                // flex: 1,
                                color: Colors.primary,
                                marginRight: 15,
                            }} /> :
                                <FontAwesomeIcon size={19} style={{
                                    flex: 1,
                                    color: Colors.primary,
                                    marginRight: 20,
                                }}
                                    icon={faRepeat} />
                            }
                        </Pressable>

                        <Text
                            style={{
                                marginLeft: "5%",
                            }}>
                            latitude: {currentLocation && currentLocation.latitude} |||
                            longitude:{currentLocation && currentLocation.longitude}
                        </Text>

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
                                        label="Enter bethel name to find."
                                    />

                                    <Text style={{
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
                                    />

                                    <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Phone contacts of Admin & Priest</Text>
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
                                        label="Seperate with comma ( , )"
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

                                    <Text style={{
                                        marginLeft: "5%",
                                        marginTop: 25, marginBottom: 4,
                                        color: Colors.dark
                                    }}>Nearest landmark</Text>
                                    <TextInput
                                        // onFocus={() => { handleSnapPress(2) }}
                                        value={newBethelDatas.landmark}
                                        onChangeText={(value) => {
                                            setnewBethelDatas({
                                                ...newBethelDatas,
                                                landmark: value
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
                                        label="What's the nearest landmark ?"
                                    />

                                    <Text style={{
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
                                    />
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
                                        title="Add Bethel"
                                        callBack={() => {
                                            AddBethelFunction()
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

