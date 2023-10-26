import React from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground, Image } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faCheckDouble, faDonate, faGroupArrowsRotate, faIdBadge, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider } from 'react-native-paper';
import { ImgBaseUrl, NumberWithCommas } from '../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoldText2, BoldText3 } from '../../components/text';
import { getTotalAmount } from './view-campaign-card';

const Colors = Color()
export function DonationCard({
    navigation,
    data,
    setModalVisible,
    setdateToView,
    Alert,
    AlertCallback,
    user

}) {

    return (
        <Pressable

            style={[styles.container, {

            }]}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                // marginTop: 10
            }} >
                <View style={{
                    // flex: 0.3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    // backgroundColor:"green"
                }} >

                    <FontAwesomeIcon style={{
                        flex: 1,
                        color: Colors.primary,
                        // marginLeft: 10,
                        marginTop: 2,

                    }} size={15} icon={faCheckDouble} />

                </View>

                <View style={{ flex: 5 }} >





                    <Pressable
                        onPress={() => {
                            // Navigation.navigate("view-user")
                            if (setdateToView) {
                                // setdateToView({
                                //     type: "VIEW MORE",
                                //     data: data
                                // })
                                // setModalVisible(true)
                                navigation.navigate("View-event", { id: data.id })
                            } else {
                                // When user wants to invite other to support a campaign
                                if (Alert) {
                                    Alert.alert("Proceed", `${user} will be invited to support ${data.meta.title}`, [
                                        {
                                            text: "Cancel"
                                        },
                                        {
                                            text: "Invite", onPress: () => {
                                                AlertCallback()
                                            }
                                        }
                                    ])
                                }

                            }


                        }}
                        style={[Style.Text, { marginTop: 5, }]}>

                        <BoldText2
                            color="black"
                            text={data && data.meta.title}
                        />


                        {data && data.meta.description.length > 100 ? <>
                            <Text style={{ color: Colors.dark }} >
                                {data && data.meta.description.slice(0, 190) + "...."} <Text style={[Style.Text]} >See more</Text></Text>

                        </> : <Text style={{ color: Colors.dark }} > {data && data.meta.description} </Text>}
                    </Pressable>

                    {
                        data && data.meta.Img &&
                        <Pressable
                            onPress={() => {
                                if (setdateToView) {
                                    navigation.navigate("View-event", { id: data.id })
                                    // setdateToView({
                                    //     type: "IMAGE",
                                    //     data: data
                                    // })
                                    // setModalVisible(true)
                                } else {

                                    // When user wants to invite other to support a campaign
                                    if (Alert) {
                                        Alert.alert("Proceed", `${user} will be invited to support ${data.meta.title}`, [
                                            {
                                                text: "Cancel"
                                            },
                                            {
                                                text: "Invite", onPress: () => {
                                                    AlertCallback()
                                                }
                                            }
                                        ])
                                    }
                                }


                            }}
                            style={{
                                // width: '100%',
                                // height: 200,
                                // backgroundColor: "green"
                            }}>


                            <View style={{ aspectRatio: data.meta.Img.width / data.meta.Img.height, backgroundColor: "lightgrey",opacity:1 }}>

                                <Image
                                    style={[styles.imageBackground, {
                                        width: "100%",
                                        // height: "100%",
                                        aspectRatio: data.meta.Img.width / data.meta.Img.height,
                                        // marginTop: 10,
                                        borderRadius: 2,
                                        zIndex:1000
                                    }]}
                                    src={`${ImgBaseUrl}/${data.meta.Img.uri}`}
                                    resizeMode={'cover'} />

                            </View>

                        </Pressable>
                    }
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginTop: 20
                    }} >
                        <TouchableOpacity style={{
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
                        </TouchableOpacity>



                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            // backgroundColor:"red",
                            flex: 1,

                        }} >
                            <Text style={[Style.LabelText, { marginLeft: 10, marginTop: 5 }]}>
                                ₦{NumberWithCommas(getTotalAmount(data.donations))}
                            </Text>
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.lightgrey,
                                marginLeft: 3,
                                marginTop: 7

                            }} size={13} icon={faDonate} />
                        </View>

                    </View>


                    <Divider style={{
                        marginTop: 15,
                        marginBottom: -10,
                        backgroundColor: "lightgrey"
                    }} />

                </View>


            </View>
        </Pressable>
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
