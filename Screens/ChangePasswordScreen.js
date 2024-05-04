import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useSelector } from 'react-redux';

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
      const response = await axios.post('https://savvy.pythonanywhere.com/password/reset/confirm/', {
        email,
        password,
        confirm_password
      });

      setLoading(false);
      // Handle successful registration, navigate to login screen
      console.log('Change successful:', response.data);
      navigation.navigate('changesuccess');
    } catch (error) {
      // Handle registration error
      console.log('ChangeError:', error);
      setLoading(false);
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

        <TextInputWithIcons style={styles.textinput} placeholder={"New Password"} value={password}
            onChangeText={setPassword}/>
        <TextInputWithIcons style={styles.textinput} placeholder={"Confirm Password"} value={confirm_password}
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
    },
    text2: {
      fontSize: 18,
      color: "grey",
      marginBottom: 30,
      paddingHorizontal:30
    },
    text3: {
        fontSize: 18,
        color: "grey",
        paddingHorizontal:30
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
  });
  



