
import axios from "axios";
import {
  GET_CART,
  ADD_TO_CART,
  CHECKOUT_CART,
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
