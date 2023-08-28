import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from '../theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Colors = Color()
const FilterButton = ({ onPress, title, icon }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{title}</Text>
                <FontAwesomeIcon style={{
                    flex: 1,
                    color: Colors.light,
                    marginLeft: 10

                }} size={15} icon={icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 45,
        right: 20,
        zIndex: 2000
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 190,
        height: 45,
        borderRadius: 10,
        // backgroundColor: '#00A8E8',
        backgroundColor: Colors.primary,
        display:"flex",
        flexDirection:"row",
        paddingLeft:20,
        paddingRight:20,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default FilterButton;
