
import { createContext, useContext, useState, useEffect } from "react";
import { addToCart as apiAddToCart, checkoutCart, getCart } from "../api/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const updatedCart = await apiAddToCart(product);
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const completeTransaction = async () => {
    try {
      await checkoutCart();
      setCartItems([]); // clear frontend cart
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, completeTransaction }}>
      {children}
    </CartContext.Provider>
  );
};
