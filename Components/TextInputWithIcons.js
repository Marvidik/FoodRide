import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Icons library

const TextInputWithIcons = ({ leftIcon, rightIcon, placeholder, style, ...rest }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {leftIcon && <Ionicons name={leftIcon} size={24} style={styles.icon} />}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        {...rest}
      />
      {rightIcon && <Ionicons name={rightIcon} size={24} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: 40, // Adjust height as needed
    marginLeft: 5, // Adjust margin as needed
  },
  icon: {
    marginRight: 5, // Adjust margin as needed
  },
});

export default TextInputWithIcons;
