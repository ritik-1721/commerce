import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: [],
  isLoading: false,
  isError: false,
};

const navLinkSlice = createSlice({
  name: "navLink",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    setLinks: (state, action) => {
      state.isLoading = false;
      state.links = action.payload;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.links = [];
    },
  },
});

export const navLinkActions = {
  setLoading: navLinkSlice.actions.setLoading,
  setLinks: navLinkSlice.actions.setLinks,
  setError: navLinkSlice.actions.setError,
};

export default navLinkSlice.reducer;
