import { View, Text,StyleSheet,Image,ScrollView,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import JunksCard from '../Components/JunksCard';
import FoodCard from '../Components/FoodCard';
import axios from 'axios'; // Import axios for making API calls
import { CartProvider, useCart } from '../Data/CartContext';
import { showMessage, hideMessage } from "react-native-flash-message";




export default function FoodScreen({ route }) {

  const { restaurant } = route.params;

  // Access restaurant properties
  const { name, location, openingHours,logo,id } = restaurant;
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [junks, setJunks] = useState([]);


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
    console.log(food);
  };
  

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://savvy.pythonanywhere.com/restaurant/junk/${id}/`)
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setJunks(response.data.Junks);
        setLoading(false);
        console.log(response.data.Junks);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
        // Set restaurants state to an empty array in case of error
        setJunks([]);
        setLoading(false);
      });
  }, [id]); // Add foods as a dependency
  
  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://savvy.pythonanywhere.com/restaurant/food/${id}/`)
      .then(response => {
        // If the request is successful, set the restaurants state with the fetched data
        setFoods(response.data.Foods);
        setLoading(false);
        console.log(response.data.Foods);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
        // Set restaurants state to an empty array in case of error
        setFoods([]);
        setLoading(false);
      });
  }, [id]); // Add id as a dependency
  

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <View style={styles.ibox}>
        <View style={styles.box1}>
          <Image style={styles.image} source={{uri: `https://savvy.pythonanywhere.com${logo}`}}/>
        </View>
        <View style={styles.names}>
          <Text style={styles.text1}>{name}</Text>
          <Text style={styles.text2}>Open {restaurant.opening_hour} -{restaurant.closing_hour}</Text>
        </View>
      </View>
      <View style={styles.names2}>
        <Text style={styles.text3}>{location}</Text>
        <Text style={styles.text3}>Delivery Fee: 860 Naira</Text>
      </View>
  
      {loading ? (
        <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView1}>
          {/* ScrollView for Assortment */}
          <ScrollView horizontal contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator={false}>
            {foods.map((food, index) => (
              <View key={index}>
                {food.category === "Assortment" && (
                  <JunksCard
                    name={food.name}
                    source={{ uri: `https://savvy.pythonanywhere.com${food.image}` }}
                    category={food.category}
                    price={food.price}
                    availability={food.availability === "Available"}
                    onAddToCart={() => handleAddToCart(food)}
                  />
                )}
              </View>
            ))}
          </ScrollView>
          
          {/* ScrollView for Foods */}
          <ScrollView horizontal={false} contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator={false}>
            {foods.map((food, index) => (
              <View key={index}>
                {food.category === "Foods" && (
                  <FoodCard
                    name={food.name}
                    image={{ uri: `https://savvy.pythonanywhere.com${food.image}` }}
                    rating={food.rating}
                    category={food.category}
                    availability={food.availability === "Available"}
                    price={food.price}
                    onAddToCart={() => handleAddToCart(food)}
                  />
                )}
              </View>
            ))}
          </ScrollView>
          
          {/* Render a message if no foods available */}
          {foods.length === 0 && (
            <View style={styles.noDataContainer}>
              <Ionicons name="information-circle-outline" size={150} color="#FF7518" style={styles.info} />
              <Text style={styles.textinfo}>No Foods available</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  )
}




const styles = StyleSheet.create({
    container:{
        flex:1
    },
    box1:{
        marginLeft:20,
        backgroundColor:'#FFFFFF',
        elevation:10,
        marginTop:10,
        borderRadius:10,
        width:120,
    },
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    },
    names:{
        paddingLeft:20,
        paddingTop:15
    },
    text1:{
        fontSize:28,
        fontWeight:"700",
        color:"#512213"
    },
    text2:{
        color:"#FF7518",
        fontSize:20
    },
    text3:{
        color:"grey",
        fontSize:18
    },
    text4:{
        color:"black",
        fontSize:18,
        paddingLeft:5
    },
    text5:{
        color:"grey",
        fontSize:18,
        paddingLeft:10
    },
    text6:{
        paddingLeft:20,
        paddingTop:20,
        fontSize:24,
        color:"#512213"
    },
    ibox:{
        flexDirection:"row",
        marginTop:30
    },
    names2:{
        paddingLeft:20,
        paddingTop:20
    },
    rating:{
        paddingTop:10,
        paddingLeft:20,
        flexDirection:"row",
        alignItems:"center"
    },
    scrollView: {
        padding: 10,
        
      },
      info:{
        alignSelf:"center"
      },
      noDataContainer:{
        alignContent:"center",
        justifyContent:"center"
      },
      textinfo:{
        alignSelf:"center",
        fontSize:22,
        color:"gray"
      },
      info1:{
        alignSelf:"center",
        paddingLeft:110
      },
      textinfo1:{
        alignSelf:"center",
        fontSize:22,
        color:"gray",
        paddingLeft:110
      },
      message:{
        marginTop:64,
        marginHorizontal:10,
        borderRadius:10
      }
})