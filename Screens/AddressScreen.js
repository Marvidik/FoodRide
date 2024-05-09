import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import CustomButton from '../Components/CustomButton'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import  { Paystack, paystackProps }  from 'react-native-paystack-webview';

export default function AddressScreen({ navigation ,route}) {

  const { total } = route.params;

  

  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;

  const paystackWebViewRef = useRef(paystackProps.paystackWebViewRef)

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://savvy.pythonanywhere.com/profile/${user.id}/`)
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setAddress(response.data.profile); // Update to response.data.restaurants
        setLoading(false);
      })
      .catch(error => {
        setAddress([]);
        setLoading(false);
      });
  });


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
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <Text style={styles.text}>Delivery Address</Text>
          {
            address.map((add, index) => {
              return (
                <View style={styles.bin}>
                  <TouchableOpacity style={styles.address} key={index} onPress={()=>paystackWebViewRef.current.startTransaction()}>
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
                <Paystack  
                    paystackKey="pk_test_1b10833e646b4e6f6257d04ceb40bda6384c765d"
                    amount={total}
                    billingEmail="savvybittechnology@gmail.com"
                    billingName='FoodRide'
                    currency='NGN'
                    activityIndicatorColor="green"
                    onCancel={(e) => {
                      // handle response here
                    }}
                    onSuccess={(res) => {
                      // handle response here
                    }}
                    autoStart={true}
                    ref={paystackWebViewRef}
                  />
                <TouchableOpacity style={styles.iconcont2}  onPress={() => deleteProfile(add.id)}>
                     <Ionicons name={"trash"} size={24} style={styles.icon} color={"#FF7518"} />
                </TouchableOpacity>
                </View>    
                
              );
            })
          }
        </View>
      </ScrollView>
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
    borderRadius: 40,
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
  }
})
