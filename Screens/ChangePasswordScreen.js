import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ChangePasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const responseData = useSelector(state => state.responseData);
 

  const Changepass = async () => {
    setEmail(responseData)
    try {
      if(password=== ""){
        alert('password is empty');
        return;
      }

      if(confirm_password=== ""){
        alert('confirm password is empty');
        return;
      }

      if (password !== confirm_password) {
        alert('Passwords do not match');
        return;
      }

      
      // Start loading
      setLoading(true);

      // Make API call to register user
      const response = await axios.post('https://foodride.viziddecors.com/password/reset/confirm', {
        email,
        password,
        confirm_password
      });

      setLoading(false);
      // Handle successful registration, navigate to login screen
      showMessage({
        message: "PASSWORD CHANGED",
        description: " Password Changed Successfully",
        type: "success",
        style:styles.message
      });
      console.log('Change successful:', response.data);
      navigation.navigate('Home');
    } catch (error) {
      // Handle registration error
      showMessage({
        message: "PASSWORD CHANGED ERROR",
        description: "An Error Occured While Changing Password please retry",
        type: "danger",
        style:styles.message
      });
      
      setLoading(false);
      console.log('error', response.error);
    }
  };
  return (

    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) : (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
        <Text style={styles.text1}>Change Password</Text>
        <Text style={styles.text3}>At least 8 characters with uppercase </Text>
        <Text style={styles.text2}>and a character</Text>

        <TextInputWithIcons style={styles.textinput} placeholder={"New Password"} 
            onChangeText={setPassword}/>
        <TextInputWithIcons style={styles.textinput} placeholder={"Confirm Password"} 
            onChangeText={setConfirmPassword}/>
       
        

        <CustomButton style={styles.but} title={"Submit"} onPress={Changepass}/>
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
  



