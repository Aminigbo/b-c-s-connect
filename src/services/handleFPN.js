import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";
import { Vibration } from "react-native"

export function HandleFPN(navigation) {


    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Background Message:', remoteMessage);
    });


    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );

    });



    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );


    // quiet state
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                const notificationType = remoteMessage;
                console.log(" .I have migrated()", notificationType)
                // navigation.navigate('Jobs');
            }
        });

    PushNotification.configure({
        onNotification: function (notification) {
            console.log("Notification data", notification)
            const clicked = notification.userInteraction;
            const clickedNotification = notification;
            if (clicked) {
                // ToastAndroid.show(notification.message, ToastAndroid.CENTER);
                console.log("Clicked notificationXX", clickedNotification)
                navigation.navigate('Jobs');
            } else {
                if (notification.foreground == true) {
                    console.log("Recieved notification in foregroundr")
                    // Vibrate the device for 500 milliseconds
                    Vibration.vibrate(900);
                    PushNotification.localNotification({
                        // largeIcon: "ic_launcher",
                        largeIconUrl: notification.data.largeImg,
                        smallIcon: "ic_notifications",
                        bigText: notification.message,
                        message: notification.message,
                        details: { repeted: false },
                        channelId: "channel-id",
                        subText: notification.title,
                        // bigLargeIcon: "ic_launcher",
                        bigPictureUrl: notification.data.largeImg,
                        // actions: ['Accept', 'Reject'],
                    })
                } else {
                    PushNotification.localNotification({
                        // largeIcon: "ic_launcher",
                        largeIconUrl: notification.data.largeImg,
                        smallIcon: "ic_notifications",
                        bigText: notification.message,
                        message: notification.message,
                        details: { repeted: false },
                        channelId: "channel-id",
                        subText: notification.title,
                        // bigLargeIcon: "ic_launcher",
                        bigPictureUrl: notification.data.largeImg,
                        // actions: ['Accept', 'Reject'],
                    })
                }
            }
        },

        requestPermissions: Platform.OS === 'ios'
    })

}
