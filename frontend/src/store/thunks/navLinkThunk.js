import { navLinkActions } from "@/store/slice/navLinkSlice";
import { fetchCategoryHierarchy } from "@/utils/service";

export const fetchLinks = () => {
  return async (dispatch) => {
    try {
      dispatch(navLinkActions.setLoading());
      const response = await fetchCategoryHierarchy(0);
      const data = await response.json();
      if (data.ok === false) {
        dispatch(navLinkActions.setError());
        console.error("Failed to fetch links:", data.message);
      } else {
        dispatch(navLinkActions.setLinks(data.allRecord));
      }
    } catch (error) {
      dispatch(navLinkActions.setError());
      console.error("Failed to fetch links:", error);
    }
  };
};
