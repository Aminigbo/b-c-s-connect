import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid } from "react-native";


const HighAccuracy = async ({ dispLocation }) => {
    return Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            dispLocation({ latitude, longitude });
            console.log("fetched high accuracy", position.coords)
        },
        (error) => {
            console.error("Error fetching map", error);
            if (setLoading) { setLoading(false) }
        },
        {
            enableHighAccuracy: true,
        },
    );


};


export const RequestLocationPermission = async ({
    setLoading,
    dispLocation,
    accuracy
}) => {
    if (setLoading) { setLoading(true) }
    return Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            dispLocation({ latitude, longitude });
            console.log(`Accuracy: ${accuracy}`, position.coords)
            if (setLoading) { setLoading(false) }
            if (accuracy == false) {
                HighAccuracy({ dispLocation })
            }
        },
        (error) => {
            console.error("Error fetching map", error);
            if (setLoading) { setLoading(false) }
        },
        {
            enableHighAccuracy: accuracy,
            // timeout: 15000,
            // maximumAge: 10000
        },
    );


};

export function WatchLocationChange({dispLocation}){
    const watchId = Geolocation.watchPosition(
        (position) => {
            // Handle the position update here
            // setPosition(position); 
            const { latitude, longitude } = position.coords;
            dispLocation({ latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true, // Use GPS if available
            timeout: 20000,           // Timeout after 20 seconds
            maximumAge: 1000,         // Accept cached location data within 1 second
        }
    );

    return () => {
        // Clean up the watchPosition when the component unmounts
        Geolocation.clearWatch(watchId);
    };
}