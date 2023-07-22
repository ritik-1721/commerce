import { categoryFiltersActions } from "@/store/slice/categoryFiltersSlice";
import { fetchCategoryHierarchy } from "@/utils/service";

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
