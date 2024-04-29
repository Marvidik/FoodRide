import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import ListItem from '../Components/ListItem';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image style={styles.image} source={require("../assets/profile.jpeg")}/>
      <TouchableOpacity style={styles.change}>
            <Text style={styles.text}>Change Image</Text>
            <Ionicons name={"pencil"} size={20} style={styles.icon} color={"orange"}/>
      </TouchableOpacity>

      <ListItem info={"Current Orders"} icon={"cart-plus"}/>
      <ListItem info={"Change Payment Address"} icon={"credit-card"} />
      <ListItem info={"Change Delivery Address"} icon={"map-marker"}/>
      <ListItem info={"Logout"} icon={"sign-out"} />
        
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        paddingTop:44,
    },
    title:{
        fontSize:28,
        fontWeight:"700",
        alignSelf:"center",
        color:"grey",
        paddingTop:15
    },
    image:{
        height:150,
        width:150,
        borderRadius:75,
        alignSelf:"center",
        marginTop:30,
        
        
    },
    change:{
        flexDirection:"row",
        alignSelf:"center",
        paddingTop:5,

    },
    text:{
        color:"#FF7518",
        fontSize:20,
    },
   content:{
    height:50
   }
})