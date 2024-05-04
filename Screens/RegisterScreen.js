import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, { useState, useContext  } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { useDispatch } from 'react-redux';


export default function RegisterScreen({ navigation }) {

  const dispatch = useDispatch();

  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral_name, setReferal] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if(email=== ""){
        alert('Email is empty');
        return;
      }

      if(username=== ""){
        alert('Username is empty');
        return;
      }

      if(password=== ""){
        alert('password is empty');
        return;
      }

      // Start loading
      setLoading(true);

      // Make API call to register user
      const response = await axios.post('https://savvy.pythonanywhere.com/signup/', {
        email,
        username,
        password,
        referral_name
      });

      setLoading(false);
      dispatch({ type: 'SET_RESPONSE_DATA', payload: response.data });
      // Handle successful registration, navigate to login screen
      console.log('Registration successful:', response.data);
      navigation.navigate('Home');
    } catch (error) {
      // Handle registration error
      alert('Error registering:', error);
      setError('Error registering user');
      setLoading(false);
    }
  };

  return (
    
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Conditional rendering of spinner based on isLoading state */}
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) :   (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.content}>
          <Image style={styles.image} source={require('../assets/logosmall.jpeg')} />
          <Text style={styles.text1}>Register</Text>
          <Text style={styles.text2}>Create Your New Account</Text>

          <TextInput
            style={styles.textinput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.textinput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.textinput}
            placeholder="Referal (OPTIONAL)"
            value={referral_name}
            onChangeText={setReferal}
            
          />

          <TouchableOpacity  onPress={()=> navigation.navigate('Login')}>
          <Text style={styles.login}>Login</Text>
          </TouchableOpacity>

          
        
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          
        </View>
      </ScrollView>)}
    </KeyboardAvoidingView>
  );
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
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: '90%',
    backgroundColor: '#FF7518',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  spinner:{
    alignSelf:"center",
    flex:1
  },
  login:{
    paddingLeft:300,
    fontSize:22,
    color:'#FF7518'
  }
});
