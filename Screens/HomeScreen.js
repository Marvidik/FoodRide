import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import IconComponent from '../Components/IconComponent';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import RestaurantCard from '../Components/RestaurantCard';
import { useSelector } from 'react-redux';
import FoodCard from '../Components/FoodCard';
import AdsCard from '../Components/AdsCard';
import axios from 'axios'; // Import axios for making API calls
import { Linking } from 'react-native';

const openWhatsAppChat = () => {
  Linking.openURL('whatsapp://send?phone=09152358248');
};



export default function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(true); // Initialize modalVisible state as true

  const responseData = useSelector(state => state.responseData);
  const { token, user } = responseData;
  const [restaurants, setRestaurants] = useState([]);
  const [ads,setAds]= useState([]);

  const [restID,setREstID]= useState(); 
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();
  const adsCount = ads.length;
  let currentIndex = 0;
  const scrollIntervalDelay = 3000; // 3 seconds

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true); // Assuming you have `setLoading` somewhere
        const response = await axios.get('https://savvy.pythonanywhere.com/ads');
        setAds(response.data.ads);
        setLoading(false); // Assuming you have `setLoading` somewhere
      } catch (error) {
        console.error('Error fetching ads:', error);
        setAds([]);
        setLoading(false); // Assuming you have `setLoading` somewhere
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const scrollAds = () => {
      if (!scrollViewRef.current || ads.length === 0) return; // Handle potential errors

      const nextIndex = (currentIndex + 1) % ads.length;
      const offsetX = nextIndex * 430;

      // Check if we are at the last ad
      if (nextIndex === 0) {
        scrollViewRef.current.scrollTo({ x: offsetX, y: 0, animated: true })
        
      } else {
        scrollViewRef.current.scrollTo({ x: 440, y: 0, animated: true })
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true }) 
      }
    };

    const scrollInterval = setInterval(scrollAds, scrollIntervalDelay);

    return () => clearInterval(scrollInterval);
  }, [ads.length, currentIndex, scrollIntervalDelay]);
  

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get('https://savvy.pythonanywhere.com/restaurants/')
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setRestaurants(response.data.restaurants); // Update to response.data.restaurants
        setLoading(false);
      })
      .catch(error => {
        // Set restaurants state to an empty array in case of error
        setRestaurants([]);
        setLoading(false);
      });
  }, []);
 
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <View style={styles.box2}>
      <Image source={require("../assets/haha.png")} style={styles.image1}/>
        <View style={styles.textbox}>
          <Text style={styles.text1}>FoodRide</Text>
          <Text style={styles.text2}>contact.foodride@gmail.com</Text>
        </View>
        

        


      </View>
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) : (
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent1} horizontal pagingEnabled
      showsHorizontalScrollIndicator={false}>    
      {
        ads.map((ad,index)=>{
          return(
            <AdsCard source={{uri: `https://savvy.pythonanywhere.com${ad.image}` }}/>
          );
        })
      }
        
        
      </ScrollView>)}  
      <Text style={styles.text3}>Available Restaurants</Text>
      {loading ? (
            <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
          ) : (
      <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false} showsVerticalScrollIndicator={false}>
      {restaurants.map((restaurant, index) => {
        // Render two RestaurantCard components per restview
        if (index % 2 === 0) {
          return (
            <View key={index} style={styles.restview}>
              <RestaurantCard
                imageSource={{ uri: `https://savvy.pythonanywhere.com${restaurant.logo}` }}
                name={restaurant.name}
                location={restaurant.location}
                openingHours={`${restaurant.opening_hour} - ${restaurant.closing_hour}`}
                onPress={() => {
                  // Pass restaurant data to the "Food" screen
                  navigation.navigate("Food", { restaurant });
                }}
              />
              {restaurants[index + 1] && ( // Check if there's another restaurant for the second card
                <RestaurantCard 
                  imageSource={{ uri: `https://savvy.pythonanywhere.com${restaurants[index + 1].logo}` }}
                  name={restaurants[index + 1].name}
                  location={restaurants[index + 1].location}
                  openingHours={`${restaurants[index + 1].opening_hour} - ${restaurants[index + 1].closing_hour}`}
                  onPress={() => {
                    // Pass restaurant data to the "Food" screen
                    navigation.navigate("Food", { restaurant: restaurants[index + 1] });
                  }}
                />
              )}
            </View>
          );
        }
        return null; // Skip rendering when index is odd
      })}
    </ScrollView>)}
    {/* WhatsApp chat button */}
    <TouchableOpacity onPress={openWhatsAppChat} style={styles.whatsappButton} >
      <Image source={require("../assets/whats.jpeg")} style={styles.image}/>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background color
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"90%"
  },
  adImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: "#FF7518",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom:10,
    width:80,
    alignItems:"center"
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  box2: {
    paddingLeft: 20,
    paddingTop: 35,
    flexDirection: "row"
  },
  textbox: {
    alignSelf: "center"
  },
  text1: {
    fontSize: 18,
    color: "grey"
  },
  text2: {
    fontSize: 18,
    color: "black",
    fontWeight: "600"
  },
  text3: {
    fontSize: 20,
    color: "grey",
    fontWeight: "700",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textinput: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 25
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    margingTop: 10
  },
  rest: {
    marginHorizontal: 30
  },
  restview:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  search:{ 
    marginLeft:"90%",
    marginTop:35
  },
  spinner:{
    alignSelf:"center",
    flex:1
  },
  image:{
    height:48,
    width:48,
    borderRadius:20,
  },
  image1:{
    height:58,
    width:58,
    borderRadius:20,
    marginRight:10
  },
  whatsappButton: {
    position: 'absolute',
    bottom: '5%', // Adjust as needed
    right: '5%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});
