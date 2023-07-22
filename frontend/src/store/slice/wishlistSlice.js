import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  wishlistTotalItem: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlistItems = action.payload;
      state.wishlistTotalItem = action.payload.length;
    },
    addToWishlist(state, action) {
      const itemAlreadyExists = state.wishlistItems.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (itemAlreadyExists < 0) {
        state.wishlistItems = [...state.wishlistItems, action.payload];
        state.wishlistTotalItem = state.wishlistTotalItem + 1;
      }
    },
    removeFromWishlist(state, action) {
      if (state.wishlistItems.length > 0) {
        const updatedItems = state.wishlistItems.filter(
          (item) => item.product_id !== action.payload
        );
        state.wishlistItems = updatedItems;
        state.wishlistTotalItem = state.wishlistTotalItem - 1;
      }
    },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
