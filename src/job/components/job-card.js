import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faLocationPin, faUser } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Divider, Avatar } from 'react-native-paper';
import { NumberWithCommas } from '../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoldText1, BoldText2, BoldText3 } from '../../components/text';
const Colors = Color()
export function CampaignCard({
    data, navigation, type
}) {
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("View-job", { id: data.id })
            }} style={styles.container} >

            <View style={{
                display: "flex",
                // flexDirection: "row",
                // justifyContent: "space-between",
                marginBottom: 5
            }} >
                {data && data.meta.employerType == 'Me' && <>

                    <BoldText3 text={`${data.poster} is hiring a ${data.meta.title}`} color="black" />
                </>}

                {data && data.meta.employerType == 'Private Individual' && <>
                    <BoldText3 text={`${data.meta.company}  is hiring a ${data.meta.title}`} color="black" />
                </>}

                {data && data.meta.employerType == 'Registered Business' && <>
                    <BoldText3 text={`${data.meta.company}  is hiring a ${data.meta.title}`} color="black" />
                </>}

                {/* <BoldText2 text={data.meta.title} color="black" /> */}

            </View>






            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6
            }} >
                <FontAwesomeIcon size={15} style={{
                    flex: 0.4,
                    color: Colors.primary,
                    opacity: 0.8,
                    // marginTop: 2,
                }}
                    icon={faLocationPin} />
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2,
                    marginLeft: 7
                }} >
                    {data.meta.location}
                </Text>
                <Text style={[Style.boldText]}>
                    ({data.meta.jobtype})
                </Text>
            </View>



            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
            }} >
                <FontAwesomeIcon size={15} style={{
                    flex: 0.4,
                    color: Colors.primary,
                    opacity: 0.8,
                    // marginTop: 2,
                }}
                    icon={faCheckCircle} />
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2,
                    marginLeft: 7
                }} >
                    Actively recruiting -
                </Text>
                <Text style={[Style.boldText]} >₦{NumberWithCommas(data.meta.salary)}</Text>
            </View>

            <BoldText2 text={`Description`} color="black" style={{ marginTop: 20, marginBottom: -20 }} />
            <BoldText1 text={`${data.meta.description.slice(0, 200)} ${data.meta.description.length > 200 && "........"}`} color="black" />

            <Divider style={{ marginTop: 5, marginBottom: 15 }} />
            <View style={{
                // display: "flex",
                flexDirection: "row",
                // justifyContent: "flex-start",
                // backgroundColor:"red"

            }} >
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    flex: 2, marginLeft: 4
                }} >
                    Deadline
                </Text>
                <Text style={{
                    fontSize: 15, color: Colors.dark,
                    // flex: 2,
                    marginLeft: 4
                }} >
                    {data.deadline}
                </Text>
            </View>

        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // backgroundColor: "red",
        borderRadius: 4,
        elevation: 1,
        padding: 16,
        width: "100%",
        // marginLeft: "4%",
        marginBottom: 10
    },
});
