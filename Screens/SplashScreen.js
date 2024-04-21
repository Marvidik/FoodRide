import { View, Text,Image ,StyleSheet} from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style={styles.box}>
      <Image style={styles.image} source={require('../assets/logo.jpeg')}/>
    </View>
  )
}


const styles = StyleSheet.create({
    image:{
        height:350,
        width:400,
        
    },
    box:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      
    }
})