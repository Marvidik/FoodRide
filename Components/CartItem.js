// CartItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const CartItem = ({ item, onIncrement, onDecrement,remove }) => {
  const imageUrl = `https://foodride.viziddecors.com${item.image}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton title={"X"} icon={"trash"} onPress={remove}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
    paddingHorizontal:10,
    
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#512213"
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color:"green"
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    height:40,
    width:40,
    justifyContent:"center",
    alignItems:"center"
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#000',
    
    
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default CartItem;
