// src/context/CartContext.jsx
import { createContext, useContext } from "react";
import { useCart } from "../hooks/useCart";

// Create context
const CartContext = createContext();

// Context provider
export const CartProvider = ({ children }) => {
  const cart = useCart(); // Use your custom hook here

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// ✅ Export alias so `useCart` can be imported directly
export { useCartContext as useCart };
    