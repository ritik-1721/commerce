import { API_URL } from "@/utils/constants";

// ! AUTH API ENDPOINTS                          -----------------------------------------------------------------------------------------------
export const REGISTER_USER_API = `${API_URL}api/auth/register`;
export const LOGIN_USER_API = `${API_URL}api/auth/login`;
export const VERIFY_TOKEN_API = `${API_URL}api/auth/verify-token`;

// * USER API ENDPOINTS -----------------------------------------------------------------------------------------------
export const UPDATE_USER_API = `${API_URL}api/user/`; // => id /-token
export const CHANGE_PASSWORD_API = `${API_URL}api/user/change-pwd`;

// ? PINCODE API ENDPINTS
export const PINCODE_DEATILS_API = `${API_URL}api/pincode/by-pincode`; // => POST pincode

// NOTE WISHLIST API ENDPOINTS -----------------------------------------------------------------------------------------------
export const GET_WISHLIST_API = `${API_URL}api/wishlist/all`; // => /-token
export const ADD_TO_WISHLIST_API = `${API_URL}api/wishlist/`; // => id /-token
export const REMOVE_FROM_WISHLIST_API = `${API_URL}api/wishlist/`; // => id /-token

// ? CART API ENDPOINTS ------------------------------------------------------------------------------------------------
export const CART_GET_ALL_API = `${API_URL}api/cart/all`; // => /-token
export const CART_REMOVE_ITEM_API = `${API_URL}api/cart/remove/`; // => :id /-token
export const CART_DELETE_ITEM_API = `${API_URL}api/cart/delete/`; // => :id /-token
export const CART_ADD_ITEM_API = `${API_URL}api/cart/add/`; // => :id /-token

// ! ORDER API ENDPOINTS ------------------------------------------------------------------------------------------------
export const CREATE_ORDER_API = `${API_URL}api/order/create`; // => /-token
export const VERIFY_ORDER_API = `${API_URL}api/order/verify`; // => /-token
export const GET_ORDER_API = `${API_URL}api/order/`; // => /-token :id order
export const GET_ORDER_LIST_API = `${API_URL}api/order/list/`; // => /-token :id userid 

// * CATEGORY API ENDPOINTS ------------------------------------------------------------------------------------------------
export const CATEGORY_ATTRIBUTE_VALUES_API = `${API_URL}api/category/category-attribute-values/`; // :id category

// NOTE ENDPOINTS ------------------------------------------------------------------------------------------------
export const CATEGORY_HIERARCHY_API = `${API_URL}api/category/hierarchy/`;
export const CATEGOTY_DETALIS_BY_SLUG_API = `${API_URL}api/category/`; // => slug
export const PRODUCTS_BY_CATEGOTY_SLUG_API = `${API_URL}api/product/c/`; // => slug
export const PRODUCT_BY_CATEGOTY_SLUG_API = `${API_URL}api/category/p/`; // => slug
export const PRODUCT_DETALIS_BY_SLUG_API = `${API_URL}api/product/`; // => slug
