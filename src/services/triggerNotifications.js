import { API_URL } from "../utilities";

export function PushNotification({
    message,
    token,
    title,
    name,
    largeImg,
    id,
    type
}) {
    console.log("Large image", id)
    console.log(message)
    console.log("Token", token)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "name": name,
        "title": title,
        "fcnToken": token,
        "message": message,
        "largeImg": largeImg,
        "id": id.toString(),
        "type": type
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export function PushNotificationMultiple({
    message,
    title,
    name,
    largeImg,
    id,
    type
}) {
    console.log("start")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "name": name,
        "title": title,
        "message": message,
        "largeImg": largeImg,
        "id": id.toString(),
        "type": type,
        "fcnTokens": [
            "cUwmWVG_SqmrxWidrmmsNq:APA91bGNu6lga04o6JedCYVZrnfvSBxMTUF7mau6jKpOIoFXA7XhAhZa49aHV2AH5Gi5d3okfzXcCMgdW6CIQHVjTzwLZ42Yu5JflfPHxL2vwX9G8105Ay0MmBe1EeBQkVAQSZOjMdCY",
            "eHlnZg4YQvK62OTt1NoyR3:APA91bFVOH_kIlY0Jn_nHgKjtKMF2VGEksTzJDCbrrCXeo3HUhpLu3KbYTxewUKmA39uwrsJEudPWsBofxUQ8fV_9Z1HLav5kb6RubyPFdBJW15Xny1cbA-ym-InHVft-SsmfIFPP4XB"
        ],
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${API_URL}multiple`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}