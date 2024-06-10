import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderCard from '../Components/OrderCard'
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for making API calls
import { showMessage } from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons';

export default function OrderScreen({ navigation }) {
  const responseData = useSelector(state => state.responseData);
  const { user } = responseData;
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async (id) => {
    try {
      // Make the PATCH request to the API
      const response = await axios.patch(`https://foodride.viziddecors.com/delivered/${id}/`, {
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
    if (!user) return; // Return if user data doesn't exist

    const fetchData = () => {
      setLoading(true);
      // Fetch restaurant data from the API
      axios.get(`https://foodride.viziddecors.com/vieworder/${user.id}/`)
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

    // Reload data every 15 seconds
    const intervalId = setInterval(fetchData, 15000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user]); // useEffect will run only when user changes

  if (!user) {
    return (
      <View style={styles.notlog}>
        <View style={{backgroundColor:"#FF7518",height:40}}></View>
        <View style={styles.emptyCartContainer}>
          <Ionicons name="log-in" size={100} color="gray" />
          <Text style={styles.emptyCartText}>Login To View Your Orders</Text>
        </View>
        <CustomButton title={"Login"} style={styles.but} onPress={() => {
        navigation.navigate("Login");
      }} />
      </View>
    );
  }

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
                    source={{ uri: `https://foodride.viziddecors.com${details.image}` }}
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
                    source={{ uri: `https://foodride.viziddecors.com${details.image}` }}
                    price={details.price * order.quantity}
                    description={order.quantity}
                    title={"Order Received"}   
                  />
                );
              }
            })}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notLoggedInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'center',
    marginTop: 50
  },
  orders: {
    alignSelf: "center",
    fontSize: 32,
    paddingTop: 15,
    color: "#512213",
    marginBottom: 20
  },
  b1: {
    height: "100%",
  },
  but: {
    marginHorizontal: 20,
    height: 50,
  },
  message: {
    marginTop: 64,
    marginHorizontal: 10,
    borderRadius: 10
  },
  notlog:{
    alignContent:"center",
    justifyContent:"center",
    flex:1
  },
  not:{
    fontSize:32,
    color:"grey",
    alignSelf:"center",
    marginBottom:20
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 24,
    marginTop: 20,
    color: 'gray',
  },
  but:{
    marginBottom:10,
    height:50,
    marginHorizontal:20
  }
});
