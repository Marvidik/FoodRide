import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function OTPScreen({navigation}) {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setUseremail] = useState('');

  const responseData = useSelector(state => state.responseData);
  
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOTP(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    setUseremail(responseData);
    const otpString = otp.join('');
    
    if (!otpString) {
      setError('Please enter OTP');
      return;
    }
    
    try {
      setLoading(true);
  
      const response = await axios.post('https://foodride.viziddecors.com/otp/', { 
        email,
        otp: otpString
      });
  
      setLoading(false);
  
      console.log('OTP verified:', response.data);
      showMessage({
        message: "OTP VERIFIED",
        description: " OTP Verified Successfully",
        type: "success",
        style:styles.message
      });
      // Handle successful verification here
      navigation.navigate('Changepassword'); // Assuming navigation is available
    } catch (error) {
      setLoading(false);
      showMessage({
        message: "OTP ERROR",
        description: " OTP ecoutered a error please retry",
        type: "danger",
        style:styles.message
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
      <Text style={styles.text1}>OTP Request</Text>
      <View style={styles.box1}>
        <Text style={styles.text2}>4 digit code sent to </Text>
        <Text style={styles.text3}>{responseData}</Text>
      </View>

      <View style={styles.otpinputs}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.textinput}
            placeholder={""}
            value={value}
            onChangeText={text => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: 150,
    width: 200,
    alignSelf: 'center',
  },
  text1: {
    fontSize: 28,
    color: '#FF7518',
    alignSelf: 'center',
    paddingTop: 20,
    fontFamily:"defont"
  },
  text2: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 30,
    fontFamily:"defont"
  },
  box1: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text3: {
    fontSize: 18,
    color: '#FF7518',
    paddingLeft: 5,
    fontFamily:"defont"
  },
  button: {
    marginTop: 70,
    height: 50,
    width: 370,
    marginHorizontal: 20,
    backgroundColor: '#FF7518',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  customInput: {
    marginHorizontal: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  otpinputs:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
   
    
  },
  textinput:{
    height:70,
    width:60,
    paddingHorizontal:20,
    marginHorizontal:20,
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    borderColor:"grey",
    alignSelf:"center",
  },
  message:{
    marginTop:64,
    marginHorizontal:10,
    borderRadius:10
  }
});
