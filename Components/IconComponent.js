import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Icons library

export default function IconComponent(
    {icon,color,style}
) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={28} style={styles.icon} color={color} />
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        height:40,
        width:40,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center"
    }
})