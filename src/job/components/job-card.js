import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faLocationPin, faUser } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';
import { Divider, Avatar } from 'react-native-paper';
import { NumberWithCommas } from '../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Colors = Color()
export function CampaignCard({
    data, navigation
}) {
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("View-job", { data })
                console.log(data)
            }}
            style={styles.container} >
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
            }} >

                <Text style={[Style.boldText, {
                    flex: 2, marginLeft: 4
                }]} >
                    {data.meta.title}
                </Text>
            </View>


            {data && data.meta.employerType == 'Me' && <>
                {/* <View style={{
                    // display: "flex",
                    flexDirection: "row",
                    // justifyContent: "flex-start",
                    marginTop: 10
                }} >
                    <FontAwesomeIcon size={15} style={{
                        flex: 0.4,
                        color:Colors.primary,
                        opacity: 0.8,
                        // marginTop: 2,
                    }}
                        icon={faUser} />
                    <Text style={{
                        fontSize: 15, color: Colors.dark,
                        flex: 2,
                        marginLeft: 7
                    }} >
                       Employer -
                    </Text>

                    <TouchableOpacity onPress={() => {
                        console.log(data)
                    }} >
                        <Text style={[Style.TextLink, { fontSize: 16, }]}>
                            {data.poster}

                        </Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    marginTop: 10
                }} >
                    <Text style={[Style.LabelText, { color: Colors.grey, fontSize: 16, }]}>
                        Employer:

                    </Text>
                    <TouchableOpacity onPress={() => {
                        console.log(data)
                    }} >
                        <Text style={[Style.boldText2, { color: Colors.primary, fontSize: 16, marginLeft: 10 }]}>
                            {data.poster}

                        </Text>
                    </TouchableOpacity>

                </View>
            </>}

            {data && data.meta.employerType == 'Private Individual' && <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    marginTop: 10
                }} >
                    <Text style={[Style.LabelText, { color: Colors.grey, fontSize: 16, }]}>
                        Employer:

                    </Text>
                    <Text style={[Style.boldText2, { color: Colors.grey, fontSize: 16, marginLeft: 10 }]}>
                        {data.meta.company}

                    </Text>
                </View>
            </>}
            {data && data.meta.employerType == 'Registered Business' && <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 2
                }} >

                    <Text style={[Style.boldText2, { color: Colors.grey, fontSize: 16, }]}>
                        @ {data.meta.company}

                    </Text>
                </View>
            </>}




            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16
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

            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
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
