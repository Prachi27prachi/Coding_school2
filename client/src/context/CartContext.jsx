import { createContext, useState } from 'react';

// Create a CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count when an item is added
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("course")) || [];
    setCartCount(cartItems.length);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
