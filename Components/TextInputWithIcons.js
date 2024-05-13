import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Icons library

const TextInputWithIcons = ({ leftIcon, rightIcon, placeholder, style, ...rest }) => {
  const [secureText, setSecureText] = useState(rest.secureTextEntry || false);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      {leftIcon && <Ionicons name={leftIcon} size={24} style={styles.icon} />}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureText}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity onPress={toggleSecureText}>
          <Ionicons 
            name={secureText ? "eye-off-outline" : "eye-outline"} 
            size={24} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      )}
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
