import { authActions } from "@/store/slice/authSlice";
import { setAuthenticationData, clearAuthenticationData } from "@/utils/auth";
import { SetWishlist } from "@/store/thunks/wishlistThunk";
// import { SetCart } from "@/store/thunks/cartThunk";
import { SetCart } from "../thunks/cartThunk";



export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      setAuthenticationData(data.token, data.result);
      await dispatch(authActions.logIn(data.result));
      await dispatch(SetWishlist());
      await dispatch(SetCart());
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    clearAuthenticationData();
    await dispatch(authActions.logOut());
  };
};
