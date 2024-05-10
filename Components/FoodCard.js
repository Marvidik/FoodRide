import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton'; // Assuming you have a CustomButton component

const FoodCard = ({ name, image, rating, category, availability, price, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={image } style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.availability}>Availability: {availability ? 'Available' : 'Not Available'}</Text>
        <Text style={styles.price}>Price: {price} Naira</Text>
        <CustomButton title="Add to Cart" onPress={onAddToCart} style={styles.but} icon={"cart"}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    flex:1,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignSelf:"center"
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#512213"
  },
  rating: {
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  availability: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  but:{
    marginTop:20
  }
});

export default FoodCard;
