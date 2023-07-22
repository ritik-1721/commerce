import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeView: "LOGIN_VIEW",
  open: false,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setActiveView(state, action) {
        state.open = true;
        state.activeView=  action.payload;
    },
    closeModal(state) {
      state.activeView= "LOGIN_VIEW";
      state.open = false;
    },
  },
});

export const authModalActions = {
  setActiveView: authModalSlice.actions.setActiveView,
  closeModal: authModalSlice.actions.closeModal,
};

export default authModalSlice.reducer;
