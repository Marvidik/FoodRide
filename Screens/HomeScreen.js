import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import IconComponent from '../Components/IconComponent';
import TextInputWithIcons from '../Components/TextInputWithIcons';
import CustomButton from '../Components/CustomButton';
import RestaurantCard from '../Components/RestaurantCard';
import { useSelector } from 'react-redux';
import FoodCard from '../Components/FoodCard';
import AdsCard from '../Components/AdsCard';
import axios from 'axios'; // Import axios for making API calls
import { Linking } from 'react-native';
import JunksCard from '../Components/JunksCard'; // Assuming you have JunksCard component imported correctly
import { CartProvider, useCart } from '../Data/CartContext';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons';

const openWhatsAppChat = () => {
  Linking.openURL('whatsapp://send?phone=09152358248');
};



export default function HomeScreen({navigation}) {

  // Search ifos
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [empty, setEmpty] =useState("")

  const { addToCart } = useCart();

  const handleAddToCart = (food) => {
    // Set quantity to 1 before adding to cart
    const foodWithQuantity = { ...food, quantity: 1 };
    addToCart(foodWithQuantity);
    showMessage({
      message: "Added To Cart",
      type: "success",
      style: styles.message,
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        search();
      }
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const search = async () => {
    try {
      const response = await fetch(`https://savvy.pythonanywhere.com/search/${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
      console.log(data); // Log the response
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
  };
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#666"
          onChangeText={handleInputChange}
          value={searchQuery}
        />
      </View>
      
      { searchQuery==="" ? (
     <View style={{flex:1}}>
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
     </View>):(

     <ScrollView contentContainerStyle={styles.scrollContainer}>
        {searchResults ? (
          searchResults.restaurants && searchResults.restaurants.length > 0 ? (
            searchResults.restaurants.map((restaurant, index) => (
              <View key={index}>
                <Text style={styles.restaurantName}>{restaurant.restaurant}</Text>
                {restaurant.foods.map((food, foodIndex) => (
                  foodIndex % 2 === 0 && (
                    <View key={foodIndex} style={styles.cardRow}>
                      <JunksCard
                        name={food.name}
                        source={{ uri: `https://savvy.pythonanywhere.com${food.image}` }}
                        category={food.category}
                        price={food.price}
                        availability={food.availability}
                        onAddToCart={() => handleAddToCart(food)}
                      />
                      {restaurant.foods[foodIndex + 1] && (
                        <JunksCard
                          name={restaurant.foods[foodIndex + 1].name}
                          source={{ uri: `https://savvy.pythonanywhere.com${restaurant.foods[foodIndex + 1].image}` }}
                          category={restaurant.foods[foodIndex + 1].category}
                          price={restaurant.foods[foodIndex + 1].price}
                          availability={restaurant.foods[foodIndex + 1].availability}
                          onAddToCart={() => handleAddToCart(restaurant.foods[foodIndex + 1])}
                        />
                      )}
                    </View>
                  )
                ))}
              </View>
            ))
          ) : (
            searchResults.foods && searchResults.foods.length > 0 ? (
              <View style={styles.cardRow}>
                {searchResults.foods.map((food, index) => (
                  <JunksCard
                    key={index}
                    name={food.name}
                    source={{ uri: `https://savvy.pythonanywhere.com${food.image}` }}
                    category={food.category}
                    price={food.price}
                    availability={food.availability}
                    onAddToCart={() => handleAddToCart(food)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyCartContainer}>
                <Ionicons name="search-outline" size={100} color="gray" />
                <Text style={styles.emptyCartText}>No Search Information</Text>
              </View>
            )
          )
        ) : null}
      </ScrollView>
     
     
     )}
      
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  message:{
    marginTop:64,
    marginHorizontal:10,
    borderRadius:10
  }
});
