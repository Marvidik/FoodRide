import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from '../Components/CustomButton'
import { Ionicons } from '@expo/vector-icons';

export default function AddressScreen({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.text}>Address</Text>
        <TouchableOpacity style={styles.address}>
            <View style={styles.iconcont}>
               <Ionicons name={"home"} size={24} style={styles.icon} color={"#FF7518"} />
            </View>
            <View style={styles.textcont}>
                <Text style={styles.text2}>Delivery Address</Text>
                <Text style={styles.text3}>24b ogbonna street aba, Abia State</Text>
                <Text style={styles.text4}>Click to proceed to payment</Text>
            </View>
            
        </TouchableOpacity>
        </View>

      
      <CustomButton title={"Change Address"} style={styles.but}  onPress={() => {
                    
    navigation.navigate("Addresschange");
    }}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        paddingTop:44,
        backgroundColor:"white",
        flex:1

    },
    text:{
        alignSelf:"center",
        fontSize:28,
        color:"grey",

    },
    address:{
        height:150,
        backgroundColor:"#EDEADE",
        marginHorizontal:20,
        marginTop:40,
        borderRadius:40,
        elevation:20,
        flexDirection:"row"
    },
    box:{
        height:"90%"
    },
    but:{
        height:50,
        marginHorizontal:20
    },
    icon:{
        alignSelf:"center"
    },
    iconcont:{
        height:50,
        width:50,
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:25,
        marginLeft:20,
        marginTop:50,
        elevation:5
    },
    text2:{
        fontSize:18,
        fontWeight:"700"
    },
    text3:{
        fontSize:18,
        color:"grey"
    },
    text4:{
        fontSize:18,
        color:"#512213",
        paddingTop:30
    },
    textcont:{
        paddingTop:30,
        paddingLeft:10
    }
})