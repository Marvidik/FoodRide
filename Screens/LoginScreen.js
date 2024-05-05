import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity,ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useDispatch } from 'react-redux';

export default function LoginScreen({navigation}) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const Login = async () => {
    try {
      if(username=== ""){
        alert('Username is empty');
        return;
      }

      if(password=== ""){
        alert('Password is empty');
        return;
      }

      // Start loading
      setLoading(true);

      // Make API call to register user
      const response = await axios.post('https://savvy.pythonanywhere.com/login/', {
        username,
        password
      });

      setLoading(false);
      dispatch({ type: 'SET_RESPONSE_DATA', payload: response.data });
      // Handle successful registration, navigate to login screen
      console.log('Login successful:', response.data);
      navigation.navigate('Home');
    } catch (error) {
      // Handle registration error
      console.log('Login Error:', error);
      Alert.alert('Wrong Username or password');
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
          <Text style={styles.text1}>Welcome Back</Text>
          <Text style={styles.text2}>Log Into Your Account</Text>

          <TextInputWithIcons style={styles.textinput} placeholder={"Username"} value={username}
            onChangeText={setUsername}/>
          <TextInputWithIcons style={styles.textinput} placeholder={"Password"} value={password}
            onChangeText={setPassword} secureTextEntry/>
      
          <TouchableOpacity  onPress={()=> navigation.navigate('Register')}>
          <Text style={styles.login}>Register</Text>
          </TouchableOpacity>

          <CustomButton style={styles.but} title={"Login"} onPress={Login}/>
          <TouchableOpacity  onPress={()=> navigation.navigate('Forgottenpassword')}>
          <Text style={{color:"orange"}}>Forgotten Password</Text>
          </TouchableOpacity>
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
    login:{
      paddingLeft:300,
      fontSize:22,
      color:'#FF7518'
    },
    spinner:{
      alignSelf:"center",
      flex:1
    },
  });
  