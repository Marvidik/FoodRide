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
    const fetchData = () => {
      setLoading(true);
      // Fetch restaurant data from the API
      axios.get(`https://savvy.pythonanywhere.com/vieworder/${user.id}/`)
        .then(response => {
          // If the request is successful, set the orders state with the fetched data
          setOrders(response.data.Orders);
          setLoading(false);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error fetching data:', error);
          // Set orders state to an empty array in case of error    
          setOrders([]);
          setLoading(false);
        });
    };

    // Initial data fetch
    fetchData();

    // Reload data every 5 seconds
    const intervalId = setInterval(fetchData, 15000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); 

  

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
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
      height:"100%",
      
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