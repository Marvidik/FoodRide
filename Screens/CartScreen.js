// CartScreen.js
import React, { useState } from 'react';
import { View, Text, Button,StyleSheet, ScrollView } from 'react-native';
import CartItem from '../Components/CartItem';
import CustomButton from '../Components/CustomButton';


const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 20.00, image: require("../assets/menu (1).jpg"), quantity: 1 },
    { id: 2, name: 'Item 2', price: 25.00, image: require("../assets/menu (2).jpg"), quantity: 1 },
    { id: 3, name: 'Item 2', price: 25.00, image: require("../assets/menu (3).jpg"), quantity: 1 },
    { id: 4, name: 'Item 2', price: 25.00, image: require("../assets/burgs (3).jpg"), quantity: 1 },
   
  ]);

  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity++;
    setCartItems(newCartItems);
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      setCartItems(newCartItems);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.b1}>
        <Text style={styles.cart}>Cart</Text>
        <ScrollView style={styles.ScrollView}>
          {cartItems.map((item, index) => (
            <CartItem  key={item.id} item={item} onIncrement={() => handleIncrement(index)} onDecrement={() => handleDecrement(index)} />
          ))}
        </ScrollView>
        
      </View>
      
      <CustomButton style={styles.but} title={"Checkout  $50"}/>
    </View>
  );
};

export default CartScreen;



const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:50
    },
    cart:{
      fontSize:32,
      alignSelf:"center"
    },

    b1:{
      height:"90%"
    },
    but:{
      marginHorizontal:20,
      height:50,
    },
    ScrollView:{
      
    }
})