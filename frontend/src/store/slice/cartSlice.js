import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      const { items, totalItems, totalAmount } = action.payload;
      state.items = items;
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    addItemToCart(state, action) {
      const { product_id, product_msp } = action.payload;
      const itemInd = state.items.findIndex(
        (item) => item.product_id === product_id
      );
      if (itemInd === -1) {
        state.items.push(action.payload);
        state.totalItems += 1;
      } else {
        state.items[itemInd].quantity += 1;
      }
      state.totalAmount += Math.round(product_msp * 100) / 100;
    },
    removeItemFromCart(state, action) {
      const { product_id, product_msp } = action.payload;
      const itemInd = state.items.findIndex(
        (item) => item.product_id === product_id
      );
      if (itemInd >= 0) {
        if (state.items[itemInd].quantity === 1) {
          state.items = state.items.filter(
            (item) => item.product_id !== product_id
          );
          state.totalItems -= 1;
        } else {
          state.items[itemInd].quantity -= 1;
        }
        state.totalAmount -= Math.round(product_msp * 100) / 100;
      }
    },
    deteleItemFromCart(state, action) {
      const { product_id, product_msp } = action.payload;
      const itemInd = state.items.findIndex(
        (item) => item.product_id === product_id
      );
      if (itemInd >= 0) {
        state.totalItems -= 1;
        state.totalAmount -=
          (Math.round(product_msp * 100) / 100) * state.items[itemInd].quantity;
        state.items = state.items.filter(
          (item) => item.product_id !== product_id
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
