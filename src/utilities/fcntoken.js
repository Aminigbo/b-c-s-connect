import AsyncStorage from "@react-native-async-storage/async-storage"
import messaging from '@react-native-firebase/messaging';

export async function RequestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        // console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem("FcmToken")

    if (!fcmToken) {
        try {
            const NewfcmToken = await messaging().getToken()
            if (NewfcmToken) {
                // console.log(NewfcmToken, "new Token")
                await AsyncStorage.setItem("FcmToken", NewfcmToken)
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        // console.log(fcmToken)
    }
}

export const fetchFcmToken = async (setFcmoken) => {
    let fcmToken = await AsyncStorage.getItem("FcmToken")

    if (fcmToken) {
        setFcmoken(fcmToken)
    }
}