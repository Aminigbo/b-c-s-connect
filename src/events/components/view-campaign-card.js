import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable, Keyboard, Image, TouchableOpacity, ScrollView, Alert, Vibration } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faCheckDouble, faCheckSquare, faDonate, faGroupArrowsRotate, faIdBadge, faRotate, faSquare } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider, TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { CurrentDate, CurrentTime, ImgBaseUrl, NumberWithCommas } from '../../utilities';
import { PrimaryButton } from '../../components/buttons/primary';
import CustomBottomDrawer from '../../components/bottomDrawer';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AddDonation, FetchAllDonationsByID, } from '../models';
import { AddUser_meta } from '../../user/models/user-model';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
import { GetApp_Campaigns, MakeDonationController, PlaeWithdrawalController } from '../../events/controllers/campaign-contrller';
import { Paystack } from "react-native-paystack-webview";
const Colors = Color()

export function getTotalAmount(arr) {
    return arr.reduce((total, item) => total + Number(item.amount), 0);
}


export function ViewCampaignCard({
    data, setModalVisible,
    User,
    setLoading,
    loading,
    amount,
    setamount,
    setData,
    setDataDefalt

}) {
    const [miniloading, setminiLoading] = useState(false)
    const [annonymous, setannonymous] = useState(false)
    const [WithdrawComponent, setWithdrawComponent] = useState(false)
    const [ToPay, setToPay] = useState(false)
    const [acc_number, setacc_number] = useState(false)
    const [bank, setbank] = useState(false)

    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // control bottom drawer hide and show
    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['1%', '50%', '95%'], []);

    // callbacks when the drawer is closed or open
    const handleSheetChanges = useCallback((index) => {
        if (index == -1) {
            handleSnapPress(0)
            // setDrawerType("IDLE")
            // setsearch(false)
        }

        if (index == 0) {
            // setDrawerType("IDLE")
            // setsearch(false)
        }

    }, []);

    // show the overlay from the bottom drawer
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    // save finance history
    function SaveFinanceHistory(SavePayload) {
        // save to user table
        let newRecord = {
            type: SavePayload.type,
            time: CurrentTime(),
            date: CurrentDate(),
            data: SavePayload.data
        };
        User.meta.finance.push(newRecord)
        let New_meta = {
            ...User.meta,
            finance: User.meta.finance,
        }
        const payload = {
            data: New_meta,
            user: User.phone
        }

        AddUser_meta(payload)
            .then(res => {
                if (res.error == null) {
                    // disp_Login(res.data[0])
                    console.log("Saved new record")
                }
            })
    }


    const handleSuccess = (ref) => {
        setLoading(true)

        let donationData = {
            user: {
                name: User.name,
                email: User.meta.email,
                phone: User.phone.slice(-10)
            },
            payref: ref,
            amount: amount.replace(/,/g, ''),
            date: new Date(),
            annonymous: annonymous,
            eventID: data.id,

            // UI data
            setData,
            setDataDefalt,
            setLoading,
            setamount,
            Alert,
            setModalVisible,
            GetApp_Campaigns,
            handleSnapPress

        }
        MakeDonationController(donationData)
        // handleSnapPress(0)
        Keyboard.dismiss();
    }


    return (
        <>
            <ScrollView>
                <View style={{
                    flex: 1
                }}>
                    {ToPay &&
                        <>
                            <View style={{ flex: 1 }}>
                                <Paystack
                                    paystackKey="pk_live_b04f8f73bcaf344c82b336ae754c9d9b8a1da938"
                                    amount={amount.replace(/,/g, '')}
                                    currency="NGN"
                                    billingEmail={User.meta.email}
                                    billingMobile={`+234${User.phone.slice(-10)}`}
                                    // billingEmail="aminigbopaul@gmail.com"
                                    // billingMobile="+2349011684637"
                                    activityIndicatorColor="green"
                                    onCancel={(e) => {
                                        // handle response here
                                        Vibration.vibrate(1000);
                                        setToPay(false)
                                        setLoading(false)
                                    }}
                                    onSuccess={(response) => {
                                        // handle response here

                                        const responseObject = response["transactionRef"]["message"];
                                        if (responseObject === "Approved") {
                                            setLoading(true)
                                            handleSuccess(response["transactionRef"])
                                        } else {
                                            Alert.alert("Error", "There was an error while funding your wallet.")
                                        }
                                        setToPay(false)

                                    }}
                                    autoStart={ToPay}
                                />
                            </View>
                        </>

                    }
                    <View
                        style={{
                            padding: 16,
                            width: "100%",
                        }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            // marginTop: 10
                        }} >
                            <View style={{
                                // flex: 1,
                                justifyContent: "center",
                                // alignContent: "center",
                                marginRight: 10
                            }} >

                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.primary,
                                    marginLeft: 10,
                                    marginTop: 2,

                                }} size={15} icon={faCheckDouble} />

                            </View>

                            <View style={{ flex: 5 }} >


                                <BoldText2
                                    color="black"
                                    text={data && data.meta.title}
                                />


                                {
                                    data && data.meta.img &&
                                    <View style={{
                                        width: '100%',
                                        height: 200,
                                        // backgroundColor: "green"
                                    }}>
                                        <Image
                                            style={[styles.imageBackground, {
                                                width: "100%", height: "100%",
                                                marginTop: 10,
                                                borderRadius: 10,
                                            }]}
                                            // source={require('../../assets/user.png')}
                                            source={require('../../../assets/img2.jpg')}
                                            resizeMode={'cover'} />
                                    </View>
                                }


                                {/* <Divider style={{ marginTop: 15, marginBottom: -15 }} /> */}
                            </View>



                        </View>
                        <View style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={[Style.LabelText, { marginTop: 9, }]}>
                                Amount needed
                            </Text>
                            <Text style={[Style.boldText, { marginTop: 9 }]}>
                                {data && " ₦" + NumberWithCommas(data.meta.amount)}
                            </Text>
                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={[Style.LabelText, { marginTop: 9 }]}>
                                Amount raised
                            </Text>
                            <Text style={[Style.boldText, { marginTop: 9 }]}>
                                {data && " ₦" + NumberWithCommas(getTotalAmount(data.donations))}
                            </Text>
                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={[Style.LabelText, { marginTop: 9 }]}>
                                Deadline
                            </Text>
                            <Text style={[Style.boldText, { marginTop: 9 }]}>
                                {data && data.deadline}
                            </Text>
                        </View>

                        <View style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={[Style.LabelText, { marginTop: 9 }]}>
                                Posted by:
                            </Text>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                            }} >
                                <Text style={[Style.TextLink, { marginTop: 2 }]}>
                                    {data && data.meta.poster}
                                </Text>
                                <FontAwesomeIcon style={{
                                    flex: 1,
                                    color: Colors.primary,
                                    marginLeft: 5,
                                    marginTop: 6,

                                }} size={10} icon={faCheckCircle} />
                            </View>
                        </View>


                        {

                            data && data.meta.Img &&
                            <View style={{
                                // width: '100%',
                                // height: 300,
                                // backgroundColor: "green"
                            }}>
                                <Pressable onPress={() => {
                                    setModalVisible(true)
                                }} >
                                    <Image
                                        style={[styles.imageBackground, {
                                            width: "100%",
                                            // height: "100%",
                                            aspectRatio: data.meta.Img.width / data.meta.Img.height,
                                            marginTop: 10,
                                            borderRadius: 2,
                                        }]}
                                        src={`${ImgBaseUrl}/${data.meta.Img.uri}`}
                                        resizeMode={'cover'} />
                                </Pressable>

                            </View>
                        }

                        <Text style={[Style.Text, { marginTop: 5 }]}>
                            {data && data.meta.description}
                        </Text>

                    </View>

                    {/* check if who is viewing is the poster */}
                    {data && data.meta.posterPhone != User.phone ? <>
                        <PrimaryButton title="Support campaign"
                            style={{
                                width: "90%",
                                marginLeft: "5%",
                                marginVertical: 30
                            }}
                            callBack={() => {
                                setWithdrawComponent("DONATE")
                                handleSnapPress(1)
                            }}
                        />
                    </> : <>

                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }} >
                            {/* <BoldText3 color="black" text={data && " ₦" + NumberWithCommas(getTotalAmount(data.donations))} /> */}
                            <PrimaryButton title={`Withdraw funds  ₦${NumberWithCommas(getTotalAmount(data.donations))}`}
                                style={{
                                    width: "90%",
                                    // marginLeft: "5%",
                                    marginBottom: 30,
                                    backgroundColor: getTotalAmount(data.donations) < 99 ? Colors.secondary : Colors.primary
                                }}
                                callBack={() => {
                                    if (getTotalAmount(data.donations) > 99) {
                                        setWithdrawComponent("WITHDRAW")
                                        handleSnapPress(1)
                                    }

                                }}
                            />
                        </View>

                    </>}

                </View>
            </ScrollView>

            <BottomSheet
                enablePanDownToClose={true}
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >

                {/* <DrawerContents /> */}

                {WithdrawComponent == "WITHDRAW" &&
                    <>
                        <View style={styles.content}>
                            <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center" }} >
                                <View style={{ width: "90%", }}>
                                    <BoldText1 text="Provide an account related to the campaign to avoid withdrawal decline." color="black" />
                                    <BoldText1 text="This campaign will be deactivated immediately this withdrawal is placed" color="black" />
                                </View>
                                <TextInput
                                    keyboardType='numeric'
                                    // autoFocus
                                    value={acc_number}
                                    onChangeText={(value) => {
                                        setacc_number(value);
                                    }}
                                    style={{ width: "90%", }}
                                    textColor={Colors.dark}
                                    theme={{
                                        colors: {
                                            primary: Colors.dark,
                                            background: 'white',
                                            placeholder: "red",
                                        },
                                        roundness: 8,
                                    }}
                                    mode="outlined"
                                    multiline
                                    label="Corperate account number"
                                />
                                <TextInput
                                    // keyboardType='numeric'
                                    // autoFocus
                                    value={bank}
                                    onChangeText={(value) => {
                                        setbank(value);
                                    }}
                                    style={{ width: "90%", marginTop: "5%" }}
                                    textColor={Colors.dark}
                                    theme={{
                                        colors: {
                                            primary: Colors.dark,
                                            background: 'white',
                                            placeholder: "red",
                                        },
                                        roundness: 8,
                                    }}
                                    mode="outlined"
                                    multiline
                                    label="Bank name"
                                />

                            </View>


                            <PrimaryButton
                                loading={miniloading}
                                style={{
                                    // width: "90%",
                                    marginLeft: "5%",
                                    marginTop: 40,
                                    textTransform: 'uppercase', marginBottom: 30

                                }}
                                callBack={() => {
                                    // handleSnapPress(0)
                                    if (!bank || bank.length < 3 || !acc_number || acc_number.length < 10) {
                                        Alert.alert("Error", "Fill all inpute field.")
                                    } else {
                                        Alert.alert("Warning", "This campaign will be deactivated immediately this withdrawal is placed", [
                                            { text: "Cancel" },
                                            {
                                                text: "Continue", onPress: () => {
                                                    let donationData = {
                                                        user: {
                                                            name: User.name,
                                                            email: User.meta.email,
                                                            phone: User.phone.slice(-10)
                                                        },
                                                        eventID: data.id,

                                                        // UI data
                                                        setData,
                                                        setDataDefalt,
                                                        setLoading: setminiLoading,
                                                        setamount,
                                                        Alert,
                                                        setModalVisible,
                                                        GetApp_Campaigns,
                                                        handleSnapPress

                                                    }
                                                    setminiLoading(true)
                                                    PlaeWithdrawalController(donationData)
                                                }
                                            }
                                        ])
                                    }
                                }} title={`Place withdrawal`} />
                        </View>
                    </>
                }

                {WithdrawComponent == "DONATE" && <>
                    <View style={styles.content}>
                        <View style={{ width: "100%", justifyContent: "flex-start" }} >
                            {/* <Text style={{ marginLeft: 20, color: Colors.dark }}>Amount to donate</Text> */}
                            <TextInput
                                keyboardType='numeric'
                                // autoFocus
                                value={amount}
                                onChangeText={(value) => {
                                    const formatNumber = (inputText) => {
                                        // Remove all non-numeric characters and leading zeros
                                        const cleanedText = inputText.replace(/[^0-9]/g, '').replace(/^0+/, '');

                                        // Add commas for thousands separator
                                        const formattedText = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                                        return formattedText;
                                    };
                                    // setamount(value)
                                    const formattedText = formatNumber(value);
                                    setamount(formattedText);
                                }}
                                style={{ width: "90%", marginLeft: "5%" }}
                                textColor={Colors.dark}
                                theme={{
                                    colors: {
                                        primary: Colors.dark,
                                        background: 'white',
                                        placeholder: "red",
                                    },
                                    roundness: 8,
                                }}
                                mode="outlined"
                                multiline
                                label="Enter amount to donate"
                            />
                            <View style={{
                                width: "90%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // backgroundColor: "red",
                                marginLeft: "5%", marginTop: 16
                            }} >
                                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                                    Donate annonymously?
                                </Text>

                                {annonymous == true ?
                                    <Pressable
                                        onPress={() => {
                                            setannonymous(false)
                                        }}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon size={23} style={{
                                            // flex: 1,
                                            color: Colors.primary,
                                            // opacity: 0.8,
                                            marginLeft: 10
                                            // margin: 20,
                                        }}
                                            icon={faCheckSquare} />
                                    </Pressable>
                                    :
                                    <Pressable
                                        onPress={() => {
                                            setannonymous(true)
                                        }}
                                        style={{}}
                                    >
                                        <FontAwesomeIcon size={23} style={{
                                            // flex: 1,
                                            color: Colors.lightgrey,
                                            // opacity: 0.8,
                                            marginLeft: 10
                                            // margin: 20,
                                        }}
                                            icon={faSquare} />
                                    </Pressable>}


                            </View>
                        </View>


                        <PrimaryButton
                            loading={loading}
                            style={{
                                // width: "90%",
                                marginLeft: "5%",
                                marginTop: 40,
                                textTransform: 'uppercase', marginBottom: 30

                            }}
                            callBack={() => {
                                // alert("Payment made successfully")
                                // setModalVisible(false)

                                console.log("data")
                                // handleSuccess()
                                setToPay(true)



                            }} title={`Make payment`} />
                    </View>
                </>}
            </BottomSheet>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // backgroundColor: "red",
        // borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "100%",
        // marginBottom:15
    },


    imageBackground: {
        flex: 1,
        resizeMode: "stretch",
        // backgroundColor: "red"
    },
});
