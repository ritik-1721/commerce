import { categoryFiltersActions } from "@/store/slice/categoryFiltersSlice";
import { fetchCategoryHierarchy , fetchCategoryAttributeValuesApi } from "@/utils/service";

export const fetchCategoryAttributeValues = (id) => {
  return async (dispatch) => {
    try {
      dispatch(categoryFiltersActions.setCategoryAttrValsLoading());
      const response = await fetchCategoryAttributeValuesApi(id);
      const data = await response.json();
      if (data.ok === false) {
        dispatch(categoryFiltersActions.setCategoryAttrValsError());
      } else {
        dispatch(categoryFiltersActions.setCategoryAttrValsLists(data.allRecord));
      }
    } catch (error) {
      dispatch(categoryFiltersActions.setCategoryAttrValsError());
      console.error("Failed to fetch links:", error);
    }
  };
};

export const fetchSubCategorys = (id) => {
  return async (dispatch) => {
    try {
      dispatch(categoryFiltersActions.setSubCategoryLoading());
      const response = await fetchCategoryHierarchy(id);
      const data = await response.json();
      if (data.ok === false) {
        dispatch(categoryFiltersActions.setSubCategoryError());
      } else {
        dispatch(categoryFiltersActions.setSubCategoryLists(data.allRecord));
      }
    } catch (error) {
      dispatch(categoryFiltersActions.setSubCategoryError());
      console.error("Failed to fetch links:", error);
    }
  };
};
