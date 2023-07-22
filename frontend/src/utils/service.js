import { fetchDelete, fetchGet, fetchPost } from "@/utils/fetchUtils";
import * as apiEndpoints from "@/utils/apiEndpoints";

const requireAuthorization = true;

//AUTH SERVICES ------------------------------------------------------------------------------------------------------
export const registerUser = fetchPost.bind(null, apiEndpoints.REGISTER_USER_API);
export const loginUser = fetchPost.bind(null, apiEndpoints.LOGIN_USER_API);
export const verifyTokenRequest = fetchPost.bind(null, apiEndpoints.VERIFY_TOKEN_API, {}, requireAuthorization);

//WISHLIST SERVICES --------------------------------------------------------------------------------------------------
export const getWishlistApi = fetchGet.bind(null, apiEndpoints.GET_WISHLIST_API, requireAuthorization );
export const removeFromWishlistApi = async (product_id) => {
  return await fetchDelete( `${apiEndpoints.REMOVE_FROM_WISHLIST_API}${product_id}`, {}, requireAuthorization );
};
export const addToWishlistApi = async (product_id) => {
  return await fetchPost( `${apiEndpoints.ADD_TO_WISHLIST_API}${product_id}`, {}, requireAuthorization );
};

//CART SERVICES --------------------------------------------------------------------------------------------------
export const getCartApi = fetchGet.bind(null, apiEndpoints.CART_GET_ALL_API, requireAuthorization );
export const removeFromCartApi = async (productId) => {
  return await fetchGet( `${apiEndpoints.CART_REMOVE_ITEM_API}${productId}`, requireAuthorization );
};
export const deleteFromCartApi = async (productId) => {
  return await fetchGet( `${apiEndpoints.CART_DELETE_ITEM_API}${productId}`, requireAuthorization );
};
export const addToCartApi = async (productId) => {
  return await fetchGet( `${apiEndpoints.CART_ADD_ITEM_API}${productId}`, requireAuthorization );
};

//SERVICES --------------------------------------------------------------------------------------------------
export const fetchCategoryHierarchy = async (id) => {
  return await fetchGet(`${apiEndpoints.CATEGORY_HIERARCHY_API}${id}`);
};
export const getCategoryDetailsBySlugApi = async (slug) => {
  return await fetchGet(`${apiEndpoints.CATEGOTY_DETALIS_BY_SLUG_API}${slug}`);
};
export const getProductsByCategorySlugApi = async (slug) => {
  return await fetchGet(`${apiEndpoints.PRODUCTS_BY_CATEGOTY_SLUG_API}${slug}`);
};









export const getProductDetailsBySlugApi = async (slug) => {
  return await fetchGet(`${apiEndpoints.PRODUCT_DETALIS_BY_SLUG_API}${slug}`);
};

// export const getProductByCategorySlugApi = fetchGet.bind(null, apiEndpoints.PRODUCT_BY_CATEGOTY_SLUG_API);
