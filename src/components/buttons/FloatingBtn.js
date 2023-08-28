import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from '../theme';

const Colors = Color()
const FloatingButton = ({ onPress, title }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 57,
    right: 30,
    zIndex: 2000
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    // backgroundColor: '#00A8E8',
    backgroundColor: Colors.primary,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default FloatingButton;
