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
  const [phone1,setPhone1]=useState();
  const [loading, setLoading] = useState(false);

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;

  const Changeaddress = async () => {
    
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
      const response = await axios.post('https://foodride.viziddecors.com/profile/user/add/', {
        user: user.id,
        address:address,
        phone:phone,
        phone1:phone1,
      });

      setLoading(false);
      // Handle successful registration, navigate to login screen
      showMessage({
        message: "ADDRESS ADDED",
        description: " Address Added Successfully",
        type: "success",
        style:styles.message
      });
      navigation.navigate('Cart');
    } catch (error) {
      // Handle registration error
      showMessage({
        message: "ADDRESS ADDS ERROR",
        description: "An Error Occured While Adding Address",
        type: "danger",
        style:styles.message
      });
      setLoading(false);
      console.log(error)
      console.log(user.id,address,phone,phone1)

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
          <Text style={styles.text1}>Add Address</Text>
          <Text style={styles.text2}>Add your delivery address</Text>

          <TextInputWithIcons style={styles.textinput} placeholder={"Address"} leftIcon={"location"} value={address} onChangeText={setAddress}/>
          <TextInputWithIcons style={styles.textinput} placeholder={"Phone Number"} leftIcon={"phone-portrait"} value={phone} onChangeText={setPhone}/>
          <TextInputWithIcons style={styles.textinput} placeholder={"Phone Number2(Optional)"} leftIcon={"phone-portrait"} value={phone1} onChangeText={setPhone1}/>
          

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
  