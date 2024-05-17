import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../Components/CartItem';
import CustomButton from '../Components/CustomButton';
import { useCart } from '../Data/CartContext';
import { showMessage, hideMessage } from "react-native-flash-message";



const CartScreen = ({navigation}) => {
  const { cartItems,removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    // Optionally, show a message indicating item removed from cart
    showMessage({
      message: "Removed From Cart",
      type: "success",
      style: styles.message,
    });
  
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  };

  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity++;
    // Recalculate total price after incrementing
    calculateTotalPrice();
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      // Recalculate total price after decrementing
      calculateTotalPrice();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:"#FF7518",height:40}}></View>
      <Text style={styles.cart}>Cart</Text>
      {cartItems.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {cartItems.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={() => handleIncrement(index)}
              onDecrement={() => handleDecrement(index)}
              remove={()=>{handleRemoveFromCart(index)}}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color="gray" />
          <Text style={styles.emptyCartText}>Cart is empty</Text>
        </View>
      )}
      <Text style={styles.fee}>Delivery Fee:  ₦860</Text>
      <Text style={styles.fee2}>we add an additional ₦430 for any additioal restaurant ordered from</Text>
      <CustomButton title={`Checkout ${total.toFixed(2)} Naira`} style={styles.checkoutButton}  onPress={() => {
      navigation.navigate("Address", {total });
                  }}/>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cart: {
    fontSize: 32,
    alignSelf: 'center',
    paddingTop:15,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
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
  checkoutButton: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 20,
  },
  message:{
    marginTop:64,
    marginHorizontal:10,
    borderRadius:10
  },
  fee:{
    paddingLeft:20,
    paddingBottom:10,
    fontSize:30,
    color:"grey"
  },
  fee2:{
    paddingLeft:20,
    paddingBottom:10,
    fontSize:20,
    color:"grey"
  },
});
