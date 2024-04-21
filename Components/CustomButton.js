import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Icons library

const CustomButton = ({ title, onPress, icon, style, textStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={24} style={[styles.icon, iconStyle]} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FF7518",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5, // Adjust margin as needed
  },
  icon: {
    color: '#fff',
    marginRight: 5, // Adjust margin as needed
  },
});

export default CustomButton;
