import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: { list: [], isLoading: false, isError: false },
};

const categoryFiltersSlice = createSlice({
  name: "categoryFilters",
  initialState,
  reducers: {
    setSubCategoryLoading: (state) => {
      state.subCategories.isLoading = true;
      state.subCategories.isError = false;
      state.subCategories.list = [];
    },
    setSubCategoryLists: (state, action) => {
      state.subCategories.isLoading = false;
      state.subCategories.list = action.payload;
    },
    setSubCategoryError: (state) => {
      state.subCategories.isLoading = false;
      state.subCategories.isError = true;
      state.subCategories.list = [];
    },
  },
});

export const categoryFiltersActions = categoryFiltersSlice.actions;

export default categoryFiltersSlice.reducer;
