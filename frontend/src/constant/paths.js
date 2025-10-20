    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

    export const GET_ALL_PRODUCTS = `${BASE_URL}/products`;
    export const GET_CART = `${BASE_URL}/cart`;
    export const ADD_TO_CART = `${BASE_URL}/cart/add`;
    export const CHECKOUT_CART = `${BASE_URL}/cart/checkout`;
    export const VALIDATE_VOUCHER = `${BASE_URL}/voucher/validate`;