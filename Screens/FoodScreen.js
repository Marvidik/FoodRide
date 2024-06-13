import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import JunksCard from '../Components/JunksCard';
import axios from 'axios'; // Import axios for making API calls
import { useCart } from '../Data/CartContext';
import { showMessage } from "react-native-flash-message";

export default function FoodScreen({ route, navigation }) {
  const { restaurant } = route.params;

  // Access restaurant properties
  const { name, location, openingHours, logo, id } = restaurant;
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      } else {
        setSearchResults([]); // Reset search results when query is cleared
      }
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const search = async () => {
    try {
      const response = await axios.get(`https://foodride.viziddecors.com/foodsearch/${id}/${searchQuery}`);
      const data = await response.data;
      setSearchResults(data.foods);
      console.log(searchResults); // Log the response
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch restaurant data from the API
    axios.get(`https://foodride.viziddecors.com/restaurant/food/${id}`)
      .then(response => {
        // If the request is successful, set the foods state with the fetched data
        setFoods(response.data.Foods);
        setLoading(false);
      })
      .catch(error => {
        // Set foods state to an empty array in case of error
        setFoods([]);
        setLoading(false);
      });
  }, [id]); // Add id as a dependency

  const renderList = (data) => (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <JunksCard
            name={item.name}
            source={{ uri: `https://foodride.viziddecors.com${item.image}` }}
            rating={item.rating}
            availability={item.availability}
            price={item.price}
            onAddToCart={() => handleAddToCart(item)}
          />
        </View>
      )}
      numColumns={2}
      ListEmptyComponent={
        <View style={styles.noDataContainer}>
          <Ionicons name="information-circle-outline" size={150} color="#FF7518" style={styles.info} />
          <Text style={styles.textinfo}>
            {searchQuery ? 'No Foods found' : 'No Foods available'}
          </Text>
        </View>
      }
      contentContainerStyle={styles.scrollView1}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#FF7518", height: 80, justifyContent: "center" }}>
        <TouchableOpacity onPress={() => { navigation.navigate("HomeEntry") }}>
          <Ionicons name="arrow-back" size={30} color="white" style={{ paddingTop: 20, paddingLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.ibox}>
        <View style={styles.box1}>
          <Image style={styles.image} source={{ uri: `https://foodride.viziddecors.com${logo}` }} />
        </View>
        <View style={styles.names}>
          <Text style={styles.text1}>{name}</Text>
          <Text style={styles.text3}>{location}</Text>
          <Text style={styles.text2}>Open {restaurant.opening_hour} - {restaurant.closing_hour}</Text>
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

      {loading ? (
        <ActivityIndicator style={styles.spinner} size="large" color="#FF7518" />
      ) : (
        searchQuery !== "" ? renderList(searchResults) : renderList(foods)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    borderRadius: 10,
    width: 120,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  names: {
    paddingLeft: 20,
    paddingTop: 15,
  },
  text0: {
    fontSize: 28,
    fontWeight: "700",
    color: "#512213",
    paddingLeft: 20
  },
  text1: {
    fontSize: 22,
    fontWeight: "700",
    color: "#512213"
  },
  text2: {
    color: "#FF7518",
    fontSize: 20
  },
  text3: {
    color: "grey",
    fontSize: 18
  },
  text4: {
    color: "black",
    fontSize: 18,
    paddingLeft: 5
  },
  text5: {
    color: "grey",
    fontSize: 18,
    paddingLeft: 10
  },
  text6: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 24,
    color: "#512213"
  },
  ibox: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20
  },
  names2: {
    paddingLeft: 20,
    paddingTop: 20
  },
  rating: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  scrollView1: {
    paddingTop: 10,
  },
  info: {
    alignSelf: "center"
  },
  noDataContainer: {
    alignContent: "center",
    justifyContent: "center"
  },
  textinfo: {
    alignSelf: "center",
    fontSize: 22,
    color: "gray"
  },
  info1: {
    alignSelf: "center",
    paddingLeft: 110
  },
  textinfo1: {
    alignSelf: "center",
    fontSize: 22,
    color: "gray",
    paddingLeft: 110
  },
  message: {
    marginTop: 64,
    marginHorizontal: 10,
    borderRadius: 10
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 10,
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
});
