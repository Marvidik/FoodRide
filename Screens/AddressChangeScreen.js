import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView,Platform,ActivityIndicator } from 'react-native';
import React ,{useState, useEffect }from 'react';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import axios from 'axios'; // Import axios for making API calls
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function AddressChangeScreen({navigation}) {
  const [address, setAddress] = useState('');
  const [userid,setUserid]= useState('');
  const [phone,setPhone]=useState();
  const [loading, setLoading] = useState(false);

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;

  const Changeaddress = async () => {
    setUserid(user.id)
    try {
      if(address=== ""){
        showMessage({
          message: "Empty Address",
          type: "warning",
          style:styles.message
        });
        return;
      }      
      // Start loading
      setLoading(true);
      
      // Make API call to register user
      const response = await axios.post('https://savvy.pythonanywhere.com/profile/user/add/', {
        user: userid,
        address,
        phone,
      });

      setLoading(false);
      // Handle successful registration, navigate to login screen
      showMessage({
        message: "ADDRESS ADDED",
        description: " Address Added Successfully",
        type: "success",
        style:styles.message
      });
      console.log('Change successful:', response.data);
      navigation.navigate('Cart');
    } catch (error) {
      // Handle registration error
      showMessage({
        message: "ADDRESS CHANGED ERROR",
        description: "An Error Occured While Changing Address",
        type: "danger",
        style:styles.message
      });
      setLoading(false);
      console.log(error)
      console.log(address,userid)
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
          <Text style={styles.text1}>Change Address</Text>
          <Text style={styles.text2}>Change your delivery address</Text>

          <TextInputWithIcons style={styles.textinput} placeholder={"Address"} leftIcon={"location"} value={address} onChangeText={setAddress}/>
          <TextInputWithIcons style={styles.textinput} placeholder={"Phone NUmber"} leftIcon={"phone-portrait"} value={phone} onChangeText={setPhone}/>
          
          

          <CustomButton style={styles.but} title={"Save"}  onPress={Changeaddress}/>
        </View>
      </ScrollView>)}
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:20,
      backgroundColor:"white",
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
    message:{
      marginTop:64,
      marginHorizontal:10,
      borderRadius:10
    }
  });
  