import { authActions } from "@/store/slice/authSlice";
import { setAuthenticationData, clearAuthenticationData } from "@/utils/auth";
import { SetWishlist } from "@/store/thunks/wishlistThunk";
import { SetCart } from "@/store/thunks/cartThunk";
import { cartActions } from "@/store/slice/cartSlice";
import { wishlistActions } from "../slice/wishlistSlice";

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
    await dispatch(cartActions.replaceCart({ items: [], totalItems: 0, totalAmount: 0 }));
    await dispatch(wishlistActions.setWishlist([]));
  };
};

