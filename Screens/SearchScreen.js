import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import JunksCard from '../Components/JunksCard'; // Assuming you have JunksCard component imported correctly
import { CartProvider, useCart } from '../Data/CartContext';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#666"
          onChangeText={handleInputChange}
          value={searchQuery}
        />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 40,
    alignSelf: 'center',
    color: 'grey',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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
