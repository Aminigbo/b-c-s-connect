import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Pressable
} from 'react-native';

export default function Signup({ navigation }) {
    return (
        <>
            <SafeAreaView style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                backgroundColor: "mediumseagreen"
            }} >
                <View>
                    <Text style={{
                        fontSize: 30,
                        color: "white"
                    }} >
                        Account screen
                    </Text>
                </View>
            </SafeAreaView>
        </>
    )
}
