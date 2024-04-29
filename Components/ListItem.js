import { View, TextInput, StyleSheet,Text,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Icons library
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default function ListItem({icon,info,onPress}) {
  return (
    <TouchableOpacity style={styles.profile} onPress={onPress}>
      <View style={styles.iconLeft}>
        <FontAwesome name={icon} size={24} color="#FF7518" />
      </View>
      <Text style={styles.text}>{info}</Text>
      <View style={styles.iconRight}>
        <FontAwesome name="arrow-right" size={24} color="#FF7518" />
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginTop:50
    },
    iconLeft: {
      width: 40,
      height: 40,
      borderRadius: 20,
      
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconRight: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      flex: 1,
      paddingHorizontal: 20,
    },
  });
  