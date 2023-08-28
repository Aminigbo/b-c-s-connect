import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color } from '../../components/theme';
import { NavigationType } from 'react-router-dom';
import { NumberWithCommas } from '../../utilities';

const Colors = Color()
export function HistoryCard({
    navigation,
    data
}) {
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("View-finance-history", { data })
            }}
            style={styles.container} >

            {data && data.type == "DONATION" ?
                <>
                    <Text style={{ fontWeight: 900, fontSize: 15, color: Colors.dark }} >
                       Donation of ₦{NumberWithCommas(data && data.data.payment.amount)}
                    </Text>
                </>
                :
                <>
                    <Text style={{ fontWeight: 900, fontSize: 15, color: Colors.dark }} >
                        {data && data.title} payment of ₦{NumberWithCommas(data && data.data.amount)}
                    </Text>
                </>}


            {data.type == "DONATION" ?
                <Text style={{ color: Colors.grey, fontSize: 14, marginTop: 10 }}>
                    For {data.data.meta.title}
                </Text>
                :
                <Text style={{ color: Colors.grey, fontSize: 14, marginTop: 10 }}>
                    Dues payment
                </Text>
            }

            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
            }} >
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                    {data.date}
                </Text>
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                    {data.time}
                </Text>

            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fffdfd",
        borderRadius: 10,
        elevation: 1,
        padding: 16,
        width: "92%",
        marginLeft: "4%",
        marginBottom: 15
    },
});
