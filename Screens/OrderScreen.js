import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import OrderCard from '../Components/OrderCard'
import CustomButton from '../Components/CustomButton';

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.b1}>
      <Text style={styles.orders}>Orders</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <OrderCard name={"Burger"} source={require("../assets/burgs (1).jpg")} price={"50"} description={"Being Prepared"}/>
      <OrderCard name={"Burger"} source={require("../assets/burgs (2).jpg")} price={"50"} description={"En Route"}/>
      <OrderCard name={"Burger"} source={require("../assets/menu (2).jpg")} price={"50"} description={"Being Prepared"}/>
      
      

      </ScrollView>
      </View>
      <CustomButton style={styles.but} title={"Confirm All"}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      paddingTop:44,
      flex:1
    },
    orders:{
      alignSelf:"center",
      fontSize:32,
      paddingTop:15,
      color:"#512213",
    },
    b1:{
      height:"90%"
    },
    but:{
      marginHorizontal:20,
      height:50,
    },
})