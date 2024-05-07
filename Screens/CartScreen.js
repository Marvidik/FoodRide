import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../Components/CartItem';
import CustomButton from '../Components/CustomButton';
import { useCart } from '../Data/CartContext';



const CartScreen = ({navigation}) => {
  const { cartItems } = useCart();
  const [total, setTotal] = useState(0);

  

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    // Optionally, show a message indicating item removed from cart
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
      <Text style={styles.cart}>Cart</Text>
      {cartItems.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {cartItems.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={() => handleIncrement(index)}
              onDecrement={() => handleDecrement(index)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color="gray" />
          <Text style={styles.emptyCartText}>Cart is empty</Text>
        </View>
      )}
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
    paddingTop: 50,
  },
  cart: {
    fontSize: 32,
    alignSelf: 'center',
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
});
