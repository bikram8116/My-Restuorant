import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menu, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === menu.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === menu.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...menu, quantity }];
    });
  };

  const removeFromCart = (menu) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== menu.name)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
