import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color } from '../../components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Style } from '../../../assets/styles';

const Colors = Color()
export function CampaignCard({
    navigation, index
}) {
    return (
        <Pressable 
        onPress={()=>{
            navigation.navigate("View-Donations")
        }}
        style={styles.container} key={index}> 
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
            }} >
                <FontAwesomeIcon size={20} style={{
                    flex: 0.4,
                    color:"mediumseagreen",
                    opacity: 0.8,
                    // marginTop: 2,
                }}
                    icon={faCheckCircle} />
                <Text style={[Style.boldText, { flex: 2, marginLeft: 4 }]} >
                    CNCF INTER ZONAL SINGING EXERCISE 2023
                </Text>
            </View>


            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6
            }} >
                <Text style={[Style.LabelText]}>
                    Amount needed
                </Text>
                <Text style={[Style.boldText]}>
                    ₦60,000,000
                </Text>

            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6
            }} >
                <Text style={[Style.LabelText]}>
                    Amount raised
                </Text>
                <Text style={[Style.boldText]}>
                    ₦19,000,000
                </Text>

            </View>
            <Text style={[Style.Text, {marginTop: 6 }]}>
                Reason
            </Text>
            <Text style={{ color: Colors.dark, fontSize: 14, }}>
                After four years of no inter zonal singing exercise in Rivers State,
                the Father had finally......
            </Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        // backgroundColor: "red",
        borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "92%",
        marginLeft: "4%",
        marginBottom: 15
    },
});
