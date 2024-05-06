import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if the item is already in the cart with a different category
    const itemWithDifferentCategoryExists = cartItems.some((cartItem) => cartItem.id === item.id && cartItem.category === item.category);
  
    // If the item is not already in the cart with a different category, add it
    if (!itemWithDifferentCategoryExists) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
