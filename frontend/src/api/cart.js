import axios from "axios";
import {
  GET_CART,
  ADD_TO_CART,
  CHECKOUT_CART,
  GET_ALL_PRODUCTS,
  VALIDATE_VOUCHER,
} from "../constant/paths";

export const getCart = async () => {
  const res = await axios.get(GET_CART);
  return res.data;
};

export const addToCart = async (product) => {
  const res = await axios.put(ADD_TO_CART, { payload: product });
  return res.data;
};

export const checkoutCart = async () => {
  const res = await axios.post(CHECKOUT_CART);
  return res.data;
};

// ✅ Remove from cart (new)
export const removeFromCart = async (id) => {
  const res = await axios.delete(`${GET_CART}/${id}`); 
  return res.data;
};

// ✅ Make sure these two are here — these are what your hook imports
export const getAllProducts = async () => {
  const res = await axios.get(GET_ALL_PRODUCTS);
  return res.data;
};

export const validateVoucher = async (voucher) => {
  const res = await axios.post(VALIDATE_VOUCHER, { code: voucher });
  return res.data;
};
