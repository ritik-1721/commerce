import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.userDetails = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
