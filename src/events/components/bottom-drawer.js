import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faCheckDouble, faCheckSquare, faDonate, faGroupArrowsRotate, faIdBadge, faRotate, faSquare } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider, TextInput, Button, Icon, RadioButton } from 'react-native-paper';
import { CurrentDate, CurrentTime, NumberWithCommas } from '../../utilities';
import { PrimaryButton } from '../../components/buttons/primary';
import CustomBottomDrawer from '../../components/bottomDrawer';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AddDonation, FetchAllDonationsByID } from '../models';
import { AddUser_meta } from '../../user/models/user-model';
import { GetApp_Campaigns } from '../controllers/campaign-contrller';

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
    setData

}) {
    const [annonymous, setannonymous] = useState(false)



    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // control bottom drawer hide and show
    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['17%', '50%', '95%'], []);

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
                phone: User.meta.phone
            },
            payref: ref,
            amount,
            date: new Date(),
            annonymous: annonymous

        }
        FetchAllDonationsByID(data.id).then(res => {
            console.log(res)
            res.data[0].donations.push(donationData)
            AddDonation({
                donations: res.data[0].donations,
                id: data.id
            })
                .then(response => {
                    GetApp_Campaigns({
                        setLoading,
                        setData
                    })
                    setamount("")
                    setLoading(false)
                    Alert.alert(`Your donation of ₦${NumberWithCommas(amount)} was successfully`, "")
                    setModalVisible(false)
                    // save to user table
                    let newRecord = {
                        type: "DONATION",
                        data: { ...res.data[0], donations: null, payment: donationData }
                    }
                    SaveFinanceHistory(newRecord)
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }



    return (
        <> 
            <BottomSheet
                enablePanDownToClose={true}
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >

                {/* <DrawerContents /> */}
                <View style={styles.content}>
                    <View style={{ width: "100%", justifyContent: "flex-start" }} >
                        {/* <Text style={{ marginLeft: 20, color: Colors.dark }}>Amount to donate</Text> */}
                        <TextInput
                            keyboardType='numeric'
                            // autoFocus
                            value={amount}
                            onChangeText={(value) => setamount(value)}
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
                            handleSuccess()
                        }} title={`Make payment`} />
                </View>

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
