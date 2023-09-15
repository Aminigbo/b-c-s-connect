import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native'; 
import { NavigationType } from 'react-router-dom'; 
import { Color } from '../../components/theme';
import { NumberWithCommas } from '../../utilities';

const Colors = Color()
export function NotificationCard({
    navigation,
    data
}) {
    return (
        <Pressable
            onPress={() => {
                // navigation.navigate("View-finance-history", { data })
            }}
            style={styles.container} >
 
                <>
                    <Text style={{ fontWeight: 900, fontSize: 15, color: Colors.dark }} >
                      Notification title
                    </Text>
                </> 

 
                <Text style={{ color: Colors.grey, fontSize: 14, marginTop: 10 }}>
                    Notification description will be here
                </Text> 

            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
            }} >
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                   2023-08-12
                </Text>
                <Text style={{ color: Colors.grey, fontSize: 16, }}>
                   3:08px
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
