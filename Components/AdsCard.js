import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

export default function AdsCard({source}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        borderRadius:20,
        marginTop:90,
        alignContent:"center",
        justifyContent:"center",
        width:"80%",
        elevation:5,
        backgroundColor:"black"
        
    },
    image:{
        resizeMode: 'contain',
        width:370,
        height:250
    }
})