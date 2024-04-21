import { View, Text,Image ,StyleSheet} from 'react-native'
import React from 'react'
import CustomButton from '../Components/CustomButton';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logosmall.jpeg')}/>
      <Text style={styles.text3}>Password Changed Successfully </Text>
      <Text style={styles.text2}>Log In and Enjoy your Food</Text>

      <CustomButton style={styles.but} title={"Done"} />
    </View>
  )
}


const styles = StyleSheet.create({
    image:{
        height:150,
        width:200,
        alignSelf:"center"
        
    },
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      
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
    but: {
        marginTop:20,
        height: 50,
        marginBottom: 50,
        width:200
      },
})