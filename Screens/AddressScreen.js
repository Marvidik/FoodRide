import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomButton from '../Components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { useCart } from '../Data/CartContext';

export default function AddressScreen({ navigation, route }) {
  const { total } = route.params;
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState([]);
  const [referal, setReferal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paystackVisible, setPaystackVisible] = useState(false); // State to control Paystack visibility
  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;
  const paystackWebViewRef = useRef(paystackProps.paystackWebViewRef);
  const [maintotal, setMaintotal] = useState();
  const [profileid, setProfileid] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios.get(`https://savvy.pythonanywhere.com/profile/${user.id}/`)
        .then(response => {
          const fetchedAddresses = response.data.profile;
          setAddress(fetchedAddresses);
          setLoading(false);
          if (fetchedAddresses.length > 0) {
            const firstAddressId = fetchedAddresses[0].id;
            setSelectedAddressId(firstAddressId);
            setProfileid(firstAddressId);
            calculateDeliveryFee();
          }
        })
        .catch(error => {
          setAddress([]);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios.get(`https://savvy.pythonanywhere.com/referal/${user.id}`)
        .then(response => {
          setReferal(response.data.referals);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching referal data:", error);
          setReferal([]);
          setLoading(false);
        });
    }
  }, [user]);

  const calculateDeliveryFee = () => {
    if (!user) return;
    const deliveryFee = 860;
    const discountPercentage = 0.1; // 10% discount
    const restaurantIds = new Set(); // Initialize a Set to store unique restaurant IDs

    cartItems.forEach((item) => {
      if (!isNaN(item.restaurant)) {
        restaurantIds.add(item.restaurant); // Add the restaurant ID to the Set
      }
    });

    const numberOfRestaurants = restaurantIds.size; // Get the count of unique restaurant IDs
    const fee = (numberOfRestaurants - 1) * 430;

    try {
      if (referal[0].point > 0) {
        const discountedFee = deliveryFee - (deliveryFee * discountPercentage);
        setMaintotal(discountedFee + total + fee);
      } else {
        setMaintotal(total + deliveryFee + fee);
      }
    } catch (error) {
      setMaintotal(total + deliveryFee + fee);
    }
  };

  const paymentSuccess = async () => {
    if (!user) return;
    try {
      const orderPromises = cartItems.map(async (cartItem) => {
        const response = await axios.post('https://savvy.pythonanywhere.com/addorder/', {
          user: user.id,
          profile: profileid,
          real_food: cartItem.id,
          delivered: false,
          quantity: cartItem.quantity,
        });
        clearCart();
        navigation.navigate("ConfirmScreen");
        return response.data;
      });

      const orders = await Promise.all(orderPromises);
      return orders;
    } catch (error) {
      showMessage({
        message: "Error Making Orders",
        type: "danger",
        style: styles.message,
      });
    }
  };

  const deleteProfile = async (profileId) => {
    if (!user) return;
    try {
      const response = await fetch(`https://savvy.pythonanywhere.com/profiles/${profileId}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      showMessage({
        message: "ADDRESS DELETED",
        description: "Address Deleted Successfully",
        type: "success",
        style: styles.message,
      });
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.notlog}>
        <View style={styles.emptyCartContainer}>
          <Ionicons name="log-in" size={100} color="gray" />
          <Text style={styles.emptyCartText}>Login To complete your Order</Text>
        </View>
        <CustomButton title={"Login"} style={styles.but} onPress={() => {
          navigation.navigate("Login");
        }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#FF7518", height: 80, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => { navigation.navigate("Cart") }}>
          <Ionicons name="arrow-back" size={30} color="white" style={{ paddingTop: 20, paddingLeft: 10 }} />
        </TouchableOpacity>
        <Text style={styles.text}>Delivery Address</Text>
      </View>
      {paystackVisible && (
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

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          {address.map((add, index) => (
            <View style={styles.bin} key={index}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setSelectedAddressId(add.id);
                  setProfileid(add.id);
                  calculateDeliveryFee();
                }}
              >
                <View style={selectedAddressId === add.id ? styles.radioButtonSelected : styles.radioButtonUnselected} />
              </TouchableOpacity>
              <View
                style={styles.address}
                
              >
                <View style={styles.iconcont}>
                  <Ionicons name={"location"} size={24} style={styles.icon} color={"#FF7518"} />
                </View>
                <View style={styles.textcont}>
                  <Text style={styles.text2}>Delivery Address</Text>
                  <Text style={styles.text3}>{add.address}</Text>
                  <Text style={styles.text4}>{add.phone}</Text>
                  {/* <Text style={styles.text4}>Click to proceed to payment</Text> */}
                </View>
              </View>
              <TouchableOpacity style={styles.iconcont2} onPress={() => deleteProfile(add.id)}>
                <Ionicons name={"trash"} size={24} style={styles.icon} color={"#FF7518"} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <CustomButton title={"Proceed to Payment"} style={styles.but} onPress={() => {
                  console.log(profileid);
                  if (paystackWebViewRef.current) {
                    paystackWebViewRef.current.startTransaction();
                  } else {
                    console.error("paystackWebViewRef is not initialized");
                  }
                  setPaystackVisible(true); }} />

      <TouchableOpacity onPress={() => {  navigation.navigate("Addresschange"); }}>
      <Text style={{color:"#FF7518",alignSelf:"center",paddingBottom:20,paddingTop:10}}>Add New Address</Text>
      </TouchableOpacity>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    alignSelf: "center",
    fontSize: 28,
    color: "white",
    paddingLeft:80,
    paddingTop: 20,
  },
  address: {
    height: 150,
    backgroundColor: "#EDEADE",
    marginTop: 40,
    borderRadius: 10,
    elevation: 20,
    flexDirection: "row",
    width: "70%",
  },
  box: {
    minHeight: "90%", // Use minHeight instead of height for flexibility
  },
  but: {
    height: 50,
    marginHorizontal: 20,
  },
  icon: {
    alignSelf: "center",
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
    elevation: 5,
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
    alignSelf: "center",
  },
  text2: {
    fontSize: 18,
    fontWeight: "700",
  },
  text3: {
    fontSize: 18,
    color: "grey",
  },
  text4: {
    fontSize: 18,
    color: "#512213",
    paddingTop: 15,
  },
  textcont: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, // Add padding to the bottom to ensure space for the button
  },
  bin: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    marginTop: 64,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  notlog: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  not: {
    fontSize: 32,
    color: "grey",
    alignSelf: "center",
    marginBottom: 20,
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
  but: {
    height: 50,
    marginHorizontal: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF7518',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FF7518',
  },
  radioButtonUnselected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
