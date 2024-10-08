import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Button, ScrollView, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { showMessage } from "react-native-flash-message";

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const Login = async () => {
    try {
      if (username === "") {
        showMessage({
          message: "Username is empty",
          type: "success",
          style: styles.message
        });
        return;
      }

      if (password === "") {
        showMessage({
          message: "Password is empty",
          type: "success",
          style: styles.message
        });
        return;
      }

      // Start loading
      setLoading(true);

      // Make API call to login user
      const response = await axios.post('https://savvy.pythonanywhere.com/login/', {
        username,
        password
      });

      setLoading(false);

      // Dispatch action to set response data in Redux store
      dispatch({ type: 'SET_RESPONSE_DATA', payload: response.data });

      // Save user login information to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));

      // Handle successful login, navigate to Home screen
      navigation.navigate('Home');
    } catch (error) {
      // Handle login error
      console.log('Login Error:', error);
      setError(error);
      showMessage({
        message: "Login Error",
        description: error.message,
        type: "danger",
        style: styles.message
      });
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

            <TextInputWithIcons style={styles.textinput} placeholder={"Username"}
              onChangeText={setUsername} />
            <TextInputWithIcons style={styles.textinput} placeholder={"Password"}
              onChangeText={setPassword} rightIcon />

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.login}>Register</Text>
            </TouchableOpacity>

            <CustomButton style={styles.but} title={"Login"} onPress={Login} />
            <TouchableOpacity onPress={() => navigation.navigate('Forgottenpassword')}>
              <Text style={{ color: "orange",fontFamily:"defont" }}>Forgotten Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white"
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
    fontFamily:"defont"
  },
  textinput: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 10,
  },
  but: {
    marginTop: 20,
    height: 50,
    marginBottom: 50,
    width: "90%"
  },
  login: {
    paddingLeft: "70%",
    fontSize: 22,
    color: '#FF7518',
    fontFamily:"defont"
  },
  spinner: {
    alignSelf: "center",
    flex: 1
  },
  message: {
    marginTop: 64,
    marginHorizontal: 10,
    borderRadius: 10
  }
});
