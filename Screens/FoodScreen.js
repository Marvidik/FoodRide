import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 



export default function FoodScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.ibox}>
            <View style={styles.box1}>
                <Image style={styles.image} source={require("../assets/kilimanjaro.png")}/>
            </View>
            <View style={styles.names}>
                <Text style={styles.text1}>kilimanjaro</Text>
                <Text style={styles.text2}>Open</Text>
            </View>
        </View>
        <View style={styles.names2}>
            <Text style={styles.text3}>21 china road futo</Text>
            <Text style={styles.text3}>$800 for delivery</Text>
        </View>
        <View style={styles.rating}>
            <Ionicons name={"star-sharp"} size={28} style={styles.icon} color={"#FF7518"} />
            <Text style={styles.text4}>5.0</Text>
            <Text style={styles.text5}>100+  ratings</Text>
        </View>
      
    </View>
  )
}




const styles = StyleSheet.create({
    container:{
        paddingTop:44
    },
    box1:{
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        elevation:10,
        marginTop:10,
        borderRadius:10,
        width:120,
    },
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    },
    names:{
        paddingLeft:20,
        paddingTop:15
    },
    text1:{
        fontSize:28,
        fontWeight:"700"
    },
    text2:{
        color:"#FF7518",
        fontSize:20
    },
    text3:{
        color:"grey",
        fontSize:18
    },
    text4:{
        color:"black",
        fontSize:18,
        paddingLeft:5
    },
    text5:{
        color:"grey",
        fontSize:18,
        paddingLeft:10
    },
    ibox:{
        flexDirection:"row",
        marginTop:30
    },
    names2:{
        paddingLeft:20,
        paddingTop:20
    },
    rating:{
        paddingTop:10,
        paddingLeft:20,
        flexDirection:"row",
        alignItems:"center"
    }
})