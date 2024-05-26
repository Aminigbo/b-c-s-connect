import { Alert } from "react-native";
import { CreateEventModel, FetchAllDonations, MakeDonationModel, PlaceWithdrawal } from "../models";
import { supabase } from "../../config/supabase";
import { NumberWithCommas } from "../../utilities";


export const GetApp_Campaigns = ({
    setData,
    setLoading,
    drawerState,
    setDrawerState,
    setcomponent,
    component,
    setDataDefalt,

    seterror,
    handleSnapPress,
    setsupportRequestDrawer,
    disp_events
}) => {

    if (setLoading) { setLoading(true) }
    // console.log("started fetching")
    FetchAllDonations()
        .then(res => {
            if (setLoading) { setLoading(false) }
            if (res.success == true) {
                if (res.data.length < 1) {
                    setData([])
                    if (seterror) {
                        seterror({
                            msg: "Use the add button (+) to create a campaign.",
                            type: "No active campaign.",
                            status: true
                        })
                    }
                    if (setLoading) { setLoading(false) }
                } else {
                    const EventData = res.data;
                    setData(EventData)
                    if (disp_events) { disp_events(EventData) }
                    if (handleSnapPress) { handleSnapPress(1) }
                    if (setsupportRequestDrawer) { setsupportRequestDrawer(true) }
                    if (setDataDefalt) { setDataDefalt(res.data.slice(0, 4)) }

                    if (seterror) {
                        seterror({
                            msg: "",
                            type: "",
                            status: false
                        })
                    }
                }
                if (setcomponent) { setcomponent(component) }
                if (setLoading) { setLoading(false) }
            } else {
                if (seterror) {
                    seterror({
                        msg: "Make sure you are connected to the internet",
                        type: "Network Error",
                        status: true
                    })
                } else {
                    Alert.alert("Network error", "Make sure you are connected to the internet")
                }
                if (setLoading) { setLoading(false) }
            }

        })
        .catch(error => {
            if (seterror) {
                seterror({
                    msg: "Make sure you are connected to the internet",
                    type: "Network Error",
                    status: true
                })
            }
            if (setLoading) { setLoading(false) }
        })
}


export function CreateEventController({
    createdata,
    setModalVisible,
    handleScrollToTop,
    setLoading,
    PickedImage,
    User,
    setcreateData,
    date,
    setPickedImage,
    setCampaigns,
    setData
}) {

    if (!createdata.title || !createdata.amount || !createdata.description) {
        alert("Fill out all forms")
    } else {
        if (createdata.title.length < 3 || createdata.amount.length < 3 || createdata.description.length < 3) {
            alert("Provide valid campaign details")
        } else {
            setModalVisible(false)
            handleScrollToTop()
            setLoading(true)

            //  upload without image
            if (PickedImage == null) {
                let newData = {
                    ...createdata,
                    deadline: date,
                    poster: User.name,
                    poster_id: User.meta.email,
                }
                CreateEventModel(newData).then(res => {
                    setLoading(false)
                    setcreateData({
                        title: "",
                        amount: "",
                        description: "",
                    })
                    alert("Campaign created successfully")
                    GetApp_Campaigns({
                        setLoading,
                        setData: setCampaigns,
                        setDataDefalt: setData
                    })
                })
                    .catch(error => {
                        console.log(error)
                        // setDrawerState({ ...drawerState, ["bottom"]: true });
                        alert("A network error occured")
                        setLoading(false)
                    })
            } else {
                // upload image
                supabase.storage
                    .from("images")
                    .upload(PickedImage.fileName, PickedImage.formData)
                    .then(response => {
                        let Img = response.data.path;
                        let newData = {
                            ...createdata,
                            deadline: date,
                            poster: User.name,
                            poster_id: User.meta.email,
                            posterPhone: User.phone,
                            Img: {
                                uri: Img,
                                height: PickedImage.height,
                                width: PickedImage.width
                            }
                        }
                        setLoading(false)
                        CreateEventModel(newData).then(res => {
                            if (res.success == false) {
                                alert(res.message)
                            } else {
                                setcreateData({
                                    title: "",
                                    amount: "",
                                    description: "",
                                })
                                setPickedImage(null)
                                alert("Campaign created successfully")
                                GetApp_Campaigns({
                                    setLoading,
                                    setData: setCampaigns,
                                    setDataDefalt: setData
                                })
                            }
                        })
                            .catch(error => {
                                console.log(error)
                                // setDrawerState({ ...drawerState, ["bottom"]: true });
                                alert("A network error occured")
                                setLoading(false)
                            })


                    })

            }


        }
    }

}


export function MakeDonationController(payload) {


    MakeDonationModel(payload)
        .then(response => {
            if (response.success == true) {
                payload.GetApp_Campaigns({
                    setLoading: payload.setLoading,
                    setData: payload.setData,
                    setDataDefalt: payload.setDataDefalt
                })
                payload.setamount("")
                payload.setLoading(false)
                payload.Alert.alert("Success", `Your donation of ₦${NumberWithCommas(payload.amount)} was successfully`, [
                    {
                        text: "Ok",
                        onPress: () => payload.setModalVisible(false)
                    }
                ])
            } else {
                payload.setLoading(false)
                payload.Alert.alert("Error", response.message, [
                    {
                        text: "Ok",
                        onPress: () => payload.setModalVisible(false)
                    }
                ])
            }
            payload.handleSnapPress(0)

        })
}

export function PlaeWithdrawalController(payload) {
    PlaceWithdrawal(payload)
        .then(response => {
            if (response.success == true) {
                payload.GetApp_Campaigns({
                    setLoading: payload.setLoading,
                    setData: payload.setData,
                    setDataDefalt: payload.setDataDefalt
                })
                payload.setamount("")
                payload.setLoading(false)
                payload.Alert.alert("Success", "Withdrawal placed successfully")
            } else {
                payload.setLoading(false)
                payload.Alert.alert("Error", response.message)
            }
            payload.handleSnapPress(0)

        })
}