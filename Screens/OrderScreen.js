import { View, Text,StyleSheet, ScrollView,ActivityIndicator } from 'react-native'
import React, { useState,useEffect, useRef } from 'react'
import OrderCard from '../Components/OrderCard'
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';
import FoodCard from '../Components/FoodCard';
import AdsCard from '../Components/AdsCard';
import axios from 'axios'; // Import axios for making API calls
import { showMessage, hideMessage } from "react-native-flash-message";

export default function OrderScreen({Navigation}) {
  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;
  const [orders,setOrders]= useState([]); 
  const [loading, setLoading] = useState(false);
  const [confirmed,setConfirmed] =useState(false);
  const [butloading,setButloading]=useState(false);


  
  const handleButtonClick = async (id) => {
    try {
      // Make the PATCH request to the API
      const response = await axios.patch(`https://savvy.pythonanywhere.com/delivered/${id}/`, {
        // Add any data you want to send in the request body
        // For example:
        // key: value
      });

      showMessage({
        message: "Order Confirmed",
        type: "success",
        style: styles.message,
      });
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error making PATCH request:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://savvy.pythonanywhere.com/vieworder/${user.id}/`)
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setOrders(response.data.Orders); // Update to response.data.restaurants
        console.log(orders)
        setLoading(false);
         
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
        // Set restaurants state to an empty array in case of error    
        setOrders([]);
        setLoading(false);
      });
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.b1}>
      <Text style={styles.orders}>Orders</Text>
      
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
      
      {orders.map((order, index) => {
        if (!order.delivered) {
          const details = order.food_details ? order.food_details : order.junk_details;
          return (
            <OrderCard
              key={index}
              name={details.name}
              source={{ uri: `https://savvy.pythonanywhere.com${details.image}` }}
              price={details.price * order.quantity}
              description={order.quantity}
              onPress={() => handleButtonClick(order.id)}
              title={"confirm order"}
            />
          );
        } else {
          const details = order.food_details ? order.food_details : order.junk_details;
          return (
            <OrderCard
              key={index}
              name={details.name}
              source={{ uri: `https://savvy.pythonanywhere.com${details.image}` }}
              price={details.price * order.quantity}
              description={order.quantity}
              title={"Order Received"}   
            />
          );
        }
      })}
      </ScrollView>)}
      </View>
      
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
      marginBottom:20
    },
    b1:{
      height:"90%",
      
    },
    but:{
      marginHorizontal:20,
      height:50,
    },
    message:{
      marginTop:64,
      marginHorizontal:10,
      borderRadius:10
    }
})