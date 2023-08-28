import React from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground, Image } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBandage, faCheckCircle, faGroupArrowsRotate, faIdBadge, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Avatar, Divider } from 'react-native-paper';

const Colors = Color()
export function FeedCard({
    Navigation
}) {
    return (
        <Pressable
            onPress={() => {
                // Navigation.navigate("view-user")
            }}
            style={styles.container}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                // marginTop: 10
            }} >
                <View style={{
                    flex: 1,
                    justifyContent: "center", alignContent: "center"
                }} >

                    <Avatar.Text size={35} label="FT" style={{ backgroundColor: "#1E1E24" }} />

                </View>

                <View style={{ flex: 5 }} >
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }} >
                        <Text style={[Style.boldText, {}]} >
                            @FreeTalker
                        </Text>
                        <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={15} icon={faCheckCircle} />
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }} >
                        <Text style={[Style.LabelText, { marginTop: 2 }]}>
                            Tech product manager
                        </Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }} >
                            <Text style={[Style.LabelText, { marginLeft: 10, marginTop: 5 }]}>
                                11k
                            </Text>
                            <FontAwesomeIcon style={{
                                flex: 1,
                                color: Colors.lightgrey,
                                marginLeft: 3,
                                marginTop: 7

                            }} size={13} icon={faRotate} />
                        </View>

                    </View>

                    <Text style={[Style.Text, { marginTop: 5 }]}>
                        Do you really want to know about the Rivers State CNCF Singing Exercise? Then slide to my dm.
                    </Text>
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
                            // source={require('../../../assets/img2.jpg')}
                            // source={require('@expo/snack-static/react-native-logo.png')}
                            src={'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/358493856_3542083182778032_7112673311330109004_n.jpg?_nc_cat=105&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFpOkiXbHw9FSo_CGwU5DXD8LBL3iMUrovwsEveIxSui6l54HnFzplu5FwZwPJReRVcpDVSPWEqM-crqbcuMciT&_nc_ohc=-GTeWzey9bIAX9ctaW-&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfDFt3_p_YjK9DpJ9I2caWReQOU02QcpYlRwbTxGxnpq8A&oe=64AE0052'}
                            resizeMode={'cover'} />

                    </View>

                    {/* <Divider style={{ marginTop: 15, marginBottom: -15 }} /> */}
                </View>


            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
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
