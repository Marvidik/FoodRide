import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const passreset = async () => {
    try {
      if(email=== ""){
        alert('Email is empty');
        return;
      }

      // Start loading
      setLoading(true);

      // Make API call to register user
      const response = await axios.post('https://foodride.viziddecors.com/password/reset/', {
        email
      });

      setLoading(false);
      dispatch({ type: 'SET_RESPONSE_DATA', payload: email });
      showMessage({
        message: "OTP SENT TO EMAIL",
        description: "An OTP has been sent to the provided email address",
        type: "success",
        style:styles.message
      });
      // Handle successful registration, navigate to login screen
      console.log('OTP successful:', response.data);
      navigation.navigate('Otp');
    } catch (error) {
      // Handle registration error
      showMessage({
        message: "OTP",
        description: "User with the email does not exist",
        type: "danger",
        style:styles.message
      });
      setLoading(false);
    }
  };
  


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) :(
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
        <Text style={styles.text1}>Change Password</Text>
        <Text style={styles.text3}>To change your password Input the Email </Text>
        <Text style={styles.text2}>associated with your account</Text>

        <TextInputWithIcons style={styles.textinput} placeholder={"Email"}  value={email}
            onChangeText={setEmail}/>
       
    

        <CustomButton style={styles.but} title={"Submit"} onPress={passreset}  />
      </View>
    </ScrollView>)}
  </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:20,
      backgroundColor:"white"
    },
    content: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 150,
      width: 200,
      alignSelf: "center",
      marginBottom: 20,
    },
    text1: {
      fontSize: 28,
      color: "#FF7518",
      fontFamily:"defont"
    },
    text2: {
      fontSize: 18,
      color: "grey",
      marginBottom: 30,
      paddingHorizontal:30,
      fontFamily:"defont"
    },
    text3: {
        fontSize: 18,
        color: "grey",
        paddingHorizontal:30,
        fontFamily:"defont"
      },
    textinput: {
      marginHorizontal: 20,
      height: 50,
      marginBottom: 10,
    },
    but: {
      marginTop:20,
      height: 50,
      marginBottom: 50,
      width:370
    },
    spinner:{
      alignSelf:"center",
      flex:1
    },
    message:{
      marginTop:64,
      marginHorizontal:10,
      borderRadius:10
    }
  });
  