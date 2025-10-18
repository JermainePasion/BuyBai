import { useState, useEffect } from "react";
import {
  addToCart as apiAddToCart,
  checkoutCart as apiCheckoutCart,
  getAllProducts,
  getCart,
  validateVoucher,
} from "../api/cart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🛒 Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await getCart();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // 📦 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ➕ Add to cart
  const addToCart = async (product) => {
    try {
      setLoading(true);
      const updated = await apiAddToCart(product);
      setCartItems(updated);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💳 Checkout
  const completeTransaction = async () => {
    try {
      const result = await apiCheckoutCart();
      setCartItems([]); // clear cart after checkout
      return result;
    } catch (err) {
      console.error("Error checking out:", err);
    }
  };

  // ✅ Validate voucher
  const validateDiscount = async (code) => {
    try {
      const result = await validateVoucher(code);
      setVoucher(result);
      return result;
    } catch (err) {
      console.error("Error validating voucher:", err);
    }
  };

  return {
    cartItems,
    products,
    voucher,
    loading,
    addToCart,
    completeTransaction,
    validateDiscount,
  };
};
