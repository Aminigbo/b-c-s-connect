import { FetchStateData } from "../models"
import { Alert, PermissionsAndroid } from "react-native"

export function GetAllBethel({
    state,
    setFechBethels
}) {
    FetchStateData(state)
        .then(res => {
            if (res.error != null) {
                Alert.alert("Make sure your are connected to the internet")
                console.log(res)
            } else {
                setFechBethels(res.data[0].bethel)
                console.log("Fetched bethels",res.data[0].bethel)
            }
        })
}

export const LocationPermission = async () => {
    // setLoading(true)
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission accepted")
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn("Error here === ", err);
    }


};