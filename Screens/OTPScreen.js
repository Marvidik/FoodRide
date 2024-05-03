import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import TextInputWithIcons from '../Components/TextInputWithIcons';

export default function OTPScreen({ navigation }) {
  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userid, setUserid] = useState('');

  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const handleVerifyOTP = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;

    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    setUserid(14);

    try {
      setLoading(true);

      const response = await axios.post('https://savvy.pythonanywhere.com/otp/', { userid, otp });

      setLoading(false);

      console.log('OTP verified:', response.data);
      // Handle successful verification here
      navigation.navigate('changesuccess');
    } catch (error) {
      setLoading(false);
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  const handleBackspace = (index) => {
    switch (index) {
      case 1:
        otp1Ref.current.focus();
        break;
      case 2:
        otp2Ref.current.focus();
        break;
      case 3:
        otp3Ref.current.focus();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
      <Text style={styles.text1}>OTP Request</Text>
      <View style={styles.box1}>
        <Text style={styles.text2}>4 digit code sent to </Text>
        <Text style={styles.text3}>ebubeidika@gmail.com</Text>
      </View>

      <View style={styles.otpinputs}>
        <TextInputWithIcons
          style={styles.textinput}
          placeholder={""}
          value={otp1}
          onChangeText={(value) => {
            setOTP1(value);
            if (value) otp2Ref.current.focus();
          }}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInputWithIcons
          style={styles.textinput}
          placeholder={""}
          value={otp2}
          onChangeText={(value) => {
            setOTP2(value);
            if (value) otp3Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === 'Backspace' && !otp2) otp1Ref.current.focus();
          }}
          keyboardType="numeric"
          maxLength={1}
          ref={otp2Ref}
        />
        <TextInputWithIcons
          style={styles.textinput}
          placeholder={""}
          value={otp3}
          onChangeText={(value) => {
            setOTP3(value);
            if (value) otp4Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === 'Backspace' && !otp3) otp2Ref.current.focus();
          }}
          keyboardType="numeric"
          maxLength={1}
          ref={otp3Ref}
        />
        <TextInputWithIcons
          style={styles.textinput}
          placeholder={""}
          value={otp4}
          onChangeText={(value) => {
            setOTP4(value);
            if (!value) otp3Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === 'Backspace' && !otp4) otp3Ref.current.focus();
          }}
          keyboardType="numeric"
          maxLength={1}
          ref={otp4Ref}
        />
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
  },
  text2: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 30,
  },
  box1: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text3: {
    fontSize: 18,
    color: '#FF7518',
    paddingLeft: 5,
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
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  otpinputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    height: 70,
    width: 60,
    marginHorizontal: 20,
  },
});
