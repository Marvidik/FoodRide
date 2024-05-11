import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import CustomButton from '../Components/CustomButton'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import  { Paystack, paystackProps }  from 'react-native-paystack-webview';
import { useCart } from '../Data/CartContext';



export default function AddressScreen({ navigation ,route}) {

  const{ total } = route.params;
  const { cartItems,removeFromCart,clearCart } = useCart();
  const [address, setAddress] = useState([]);
  const [referal,setReferal] =useState([]);
  const [loading, setLoading] = useState(false);
  const [paystackVisible, setPaystackVisible] = useState(false); // State to control Paystack visibility

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;

  const paystackWebViewRef = useRef(paystackProps.paystackWebViewRef)

  const [maintotal ,setMaintotal]=useState();

  const [profileid,setProfileid]= useState();

  

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://savvy.pythonanywhere.com/profile/${user.id}/`)
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setAddress(response.data.profile); // Update to response.data.restaurants
        setLoading(false);
        console.log("kk")
      })
      .catch(error => {
        setAddress([]);
        setLoading(false);
        
      });
  });

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    try {
      axios.get(`https://savvy.pythonanywhere.com/referal/${user.id}`)
        .then(response => {
          // If the request is successful, set the referal state with the fetched data
          setReferal(response.data.referals);
          setLoading(false);
        })
        .catch(error => {
          // Handle any errors
          console.error("Error fetching referal data:", error);
          setReferal([]);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
  

  const calculateDeliveryFee = () => {
    const deliveryFee = 860;
    const discountPercentage = 0.1; // 10% discount
    const restaurantIds = new Set(); // Initialize a Set to store unique restaurant IDs
  
    cartItems.forEach((item, index) => {
      if (!isNaN(item.restaurant)) { // Check if item.restaurant is a number
        restaurantIds.add(item.restaurant); // Add the restaurant ID to the Set
      }
    });
  
    const numberOfRestaurants = restaurantIds.size; // Get the count of unique restaurant IDs
    const fee = (numberOfRestaurants - 1) * 430;
  
    console.log("Number of Restaurants:", numberOfRestaurants); // Print the number of unique restaurants
  
    try {
      // Check if the user has a point
      if (referal[0].point > 0) {
        // Apply discount
        const discountedFee = deliveryFee - (deliveryFee * discountPercentage);
        setMaintotal(discountedFee + total + fee);
        console.log("Discounted Delivery Fee:", discountedFee);
      } else {
        console.log("Delivery Fee:", deliveryFee);
        setMaintotal(total + deliveryFee + fee);
      }
    } catch (error) {
      console.error("Error calculating delivery fee:", error);
      // Handle the case where there is no point
      console.log("Delivery Fee:", deliveryFee);
      setMaintotal(total + deliveryFee + fee);
    }
  };
  

const paymentSuccess = async () => {
  try {
    console.log(cartItems)
    const orderPromises = cartItems.map(async (cartItem) => {
      const response = await axios.post('https://savvy.pythonanywhere.com/addorder/', {
        user: user.id, // Assuming user is part of the cartItem object
        profile: profileid, // Assuming profile is part of the cartItem object
        real_food: cartItem.id, // Assuming real_food is part of the cartItem object
        delivered: false,
        quantity: cartItem.quantity
      });
      console.log("Order added successfully:", response.data);
      clearCart();
            // Re-navigate the user to the Confirm Screen
      navigation.navigate("ConfirmScreen");
      return response.data;
    });

    const orders = await Promise.all(orderPromises);
    console.log("All orders added successfully:", orders);
    return orders;
  } catch (error) {
    console.error("Error adding orders:", error);
    showMessage({
      message: "Error Making Orders",
      type: "danger",
      style:styles.message
    });
  }
};

  
  

  const deleteProfile = async (profileId) => {
    try {
      const response = await fetch(`https://savvy.pythonanywhere.com/profiles/${profileId}/`, {
        method: 'DELETE', 
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
  
      showMessage({
        message: "ADDRESS DELETED",
        description: " Address Deleted Successfully",
        type: "success",
        style:styles.message
      });
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  };



  return (
    <View style={styles.container}>
      {paystackVisible && ( // Conditional rendering for Paystack component
        <Paystack  
          paystackKey="pk_live_a63261768652861c38842863f81d121298c68147"
          amount={maintotal}
          billingEmail="contact.foodride@gmail.com"
          billingName='FoodRide'
          currency='NGN'
          activityIndicatorColor="orange"
          onCancel={(e) => {
            // handle response here
          }}
          onSuccess={(res) => {
            paymentSuccess();
          }}
          autoStart={true}
          ref={paystackWebViewRef}
        />
      )}
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <Text style={styles.text}>Delivery Address</Text>
          {
            address.map((add, index) => {
              return (
                <View style={styles.bin}>
                  <TouchableOpacity 
                    style={styles.address} 
                    key={index} 
                    onPress={() => {
                      setProfileid(add.id)
                      calculateDeliveryFee();
                      if (paystackWebViewRef.current) {
                        paystackWebViewRef.current.startTransaction(); // Start Paystack transaction if ref is defined
                      } else {
                        console.error("paystackWebViewRef is not initialized");
                      }
                      setPaystackVisible(true); // Set paystackVisible to true upon clicking address
                    }}
                  >
                    <View style={styles.iconcont}>
                      <Ionicons name={"location"} size={24} style={styles.icon} color={"#FF7518"} />
                    </View>
                    <View style={styles.textcont}>
                      <Text style={styles.text2}>Delivery Address</Text>
                      <Text style={styles.text3}>{add.address}</Text>
                      <Text style={styles.text3}>{add.phone}</Text>
                      <Text style={styles.text4}>Click to proceed to payment</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.iconcont2}  onPress={() => deleteProfile(add.id)}>
                       <Ionicons name={"trash"} size={24} style={styles.icon} color={"#FF7518"} />
                  </TouchableOpacity>
                </View>    
              );
            })
          }
        </View>
      </ScrollView>
      <Text style={styles.fee}>Delivery Fee:  ₦860</Text>
      <Text style={styles.fee2}>we add an additional 430 for any additioal restaurant ordered from</Text>
      <CustomButton title={"Add New Address"} style={styles.but} onPress={() => {
        navigation.navigate("Addresschange");
      }} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  text: {
    alignSelf: "center",
    fontSize: 28,
    color: "grey",
  },
  address: {
    height: 150,
    backgroundColor: "#EDEADE",
    marginHorizontal: 5,
    marginTop: 40,
    borderRadius: 10,
    elevation: 20,
    flexDirection: "row",
    width:"80%"
  },
  box: {
    minHeight: "90%" // Use minHeight instead of height for flexibility
  },
  but: {
    height: 50,
    marginHorizontal: 20
  },
  icon: {
    alignSelf: "center"
  },
  icon2: {
    alignSelf: "center",
  },
  iconcont: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 50,
    elevation: 5
  },
  iconcont2: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 50,
    elevation: 5,
    alignSelf:"center"
  },
  text2: {
    fontSize: 18,
    fontWeight: "700"
  },
  text3: {
    fontSize: 18,
    color: "grey"
  },
  text4: {
    fontSize: 18,
    color: "#512213",
    paddingTop: 30
  },
  textcont: {
    paddingTop: 30,
    paddingLeft: 10
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100 // Add padding to the bottom to ensure space for the button
  },
  bin:{
    flexDirection:"row"
  },
  message:{
    marginTop:64,
    marginHorizontal:10,
    borderRadius:10
  },
  fee:{
    paddingLeft:20,
    paddingBottom:10,
    fontSize:30,
    color:"grey"
  },
  fee2:{
    paddingLeft:20,
    paddingBottom:10,
    fontSize:20,
    color:"grey"
  }
})
