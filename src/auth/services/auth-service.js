import { base_URL } from "../../utilities";

export function LoginService({
    phone,
    FcmToken,
    Alert,
    setLoading,
    navigation,
    SaveUserAfterLogin
}) {
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "phone": phone,
        "FcmToken": FcmToken,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${base_URL}/auth/login`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result)
            if (data.success == true) {
                let User = data;
                // disp_Login(User)
                SaveUserAfterLogin(User.data).then(res=>{
                    console.log("saved to local storage")
                })
                if (data.message == "Add password") {
                    navigation.navigate("Add-password")
                } else {
                    navigation.replace("RESET PWD")
                }
            } else {
                Alert.alert("Error", data.message,
                    [{
                        text: "Close",
                    }]
                );
            }
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            Alert.alert("Error", data.message,
                [{
                    text: "Close",
                }]
            );
        });
}