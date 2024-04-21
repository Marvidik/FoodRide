import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import OTPInput from '../Components/OTPInput'
import CustomButton from '../Components/CustomButton';

export default function OTPScreen() {
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../assets/logosmall.jpeg')}/>
     <Text style={styles.text1}>OTP Request</Text>
     <View style={styles.box1}>
     <Text style={styles.text2}>4 digit code sent to </Text>
     <Text style={styles.text3}>ebubeidika@gmail.com</Text>
     </View>
     
     <OTPInput digitCount={4} inputStyle={styles.customInput} />



     <CustomButton style={styles.but} title={"Verify"} />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        paddingTop:64
    },
    image:{
        height:150,
        width:200,
        alignSelf:"center"
        
    },
    text1: {
        fontSize: 28,
        color: "#FF7518",
        alignSelf:"center",
        paddingTop:20
      },
      text2: {
        fontSize: 18,
        color: "grey",
        marginBottom: 30,
      },
      box1:{
        flexDirection:"row",
        alignSelf:"center",
        

      },
      text3:{
        fontSize:18,
        color:"#FF7518",
        paddingLeft:5
        
      },
      but: {
        marginTop:70,
        height: 50,
        marginBottom: 50,
        width:370,
        marginHorizontal:20
      },
      customInput:{
        marginHorizontal:20
      }
})