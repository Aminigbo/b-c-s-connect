import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import React, { useState, } from 'react';



export function FilterComponent({
    navigation
}) {

    const [data, setData] = useState({
        states: "",
        fellowship: "",
        course: "",
        skills: ""
    })

    return (

        <>
            <View style={{
                // backgroundColor:"red",
                padding: 15
            }} >
                {/* <Bold */}

                <TextInput
                    // onFocus={() => { handleSnapPress(2) }}
                    value={data.state}
                    onChangeText={(value) => {

                    }}
                    style={{
                        width: "100%",
                        marginBottom: 20
                    }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Enter bethel name to find."
                />

                <TextInput
                    // onFocus={() => { handleSnapPress(2) }}
                    value={data.fellowship}
                    onChangeText={(value) => {

                    }}
                    style={{
                        width: "100%",
                        marginBottom: 20
                    }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Enter bethel name to find."
                />

                <TextInput
                    // onFocus={() => { handleSnapPress(2) }}
                    value={wordEntered}
                    onChangeText={(value) => {
                        
                    }}
                    style={{
                        width: "100%",
                        marginBottom: 20
                    }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Enter bethel name to find."
                />

                <TextInput
                    // onFocus={() => { handleSnapPress(2) }}
                    value={wordEntered}
                    onChangeText={(value) => handleFilter(value)}
                    style={{
                        width: "100%",
                        marginBottom: 20
                    }}
                    textColor={Colors.dark}
                    theme={{
                        colors: {
                            primary: Colors.dark,
                            background: 'white',
                            placeholder: "red",
                        },
                        // roundness: 8,
                    }}
                    mode="outlined"
                    // multiline
                    label="Enter bethel name to find."
                />

            </View>

        </>

    );
}



const styles = StyleSheet.create({

});

