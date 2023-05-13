import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

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
    bottom: 20,
    right: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00A8E8',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default FloatingButton;
