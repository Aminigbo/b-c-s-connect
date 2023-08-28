import { AddUser_meta } from "../models/user-model"
import { Alert } from "react-native"

export const UpdateUserMetaController = ({
    data,
    metaType,
    User,
    setloading,
    disp_user,
    setModalVisible
}) => {
    setloading(true)
    // modify user's meta data to effect the cahne
    let New_meta = ""
    if (metaType == "BETHEL") {
        New_meta = {
            ...User.meta,
            bethel: data.bethel,
        }
    } else if (metaType == "ZONE") {
        New_meta = {
            ...User.meta,
            zone: data.zone,
        }
    }


    const payload = {
        data: New_meta,
        user: User.phone
    }

    AddUser_meta(payload)
        .then(res => {
            setloading(false)
            const newUser = {
                ...User,
                meta: New_meta
            }
            disp_user(newUser)
            Alert.alert("Success", `${metaType} updated succesfully`,
                [{ text: "Close", onPress: () => { setModalVisible(false) } }]
            );
        })
}

 