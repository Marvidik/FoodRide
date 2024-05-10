import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton'; // Assuming you have a CustomButton component

const JunksCard = ({ name, source, rating, category, availability, price, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={ source } style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.availability}>Availability: {availability}</Text>
        <Text style={styles.price}>Price: {price} Naira</Text>
        <CustomButton title="Add to Cart" onPress={onAddToCart} style={styles.but} icon={"cart"}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    flex:1,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'flex-start', // Added to prevent stretching
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#512213"
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 3,
  },
  availability: {
    fontSize: 12,
    marginBottom: 3,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  but: {
    marginTop: 5,
  },
});

export default JunksCard;
