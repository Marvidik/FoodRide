import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ digitCount, inputStyle }) => {
  const [otp, setOTP] = useState(Array(digitCount).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (index < digitCount - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: digitCount }).map((_, index) => (
        <TextInput
          key={index}
          style={[styles.input, inputStyle]}
          keyboardType="numeric"
          maxLength={1}
          value={otp[index]}
          onChangeText={(value) => handleChange(index, value)}
          onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 60,
    height: 60,
    textAlign: 'center',
    fontSize: 20,
    
  },
});

export default OTPInput;
