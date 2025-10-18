export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const GET_ALL_PRODUCTS = `${BASE_URL}/api/products`;
export const GET_PRODUCT_BY_ID = (id) => `${BASE_URL}/api/products/${id}`;

export const GET_CART = `${BASE_URL}/api/cart`;
export const ADD_TO_CART = `${BASE_URL}/api/cart/add`;
export const CHECKOUT_CART = `${BASE_URL}/api/cart/checkout`;

export const VALIDATE_VOUCHER = `${BASE_URL}/api/voucher/validate`;