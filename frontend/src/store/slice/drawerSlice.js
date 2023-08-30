import { createSlice } from "@reduxjs/toolkit";

const initialDrawerState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState: initialDrawerState,
  reducers: {
    toggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const drawerAction = drawerSlice.actions;
export default drawerSlice.reducer;