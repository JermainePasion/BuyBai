
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getCart = async () => {
  const res = await axios.get(`${API_BASE_URL}/cart`);
  return res.data;
};

export const addToCart = async (product) => {
  const res = await axios.put(`${API_BASE_URL}/cart/add`, { payload: product });
  return res.data;
};

export const checkoutCart = async () => {
  const res = await axios.post(`${API_BASE_URL}/cart/checkout`);
  return res.data;
};
