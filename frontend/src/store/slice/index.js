import navLinkSlice from "./navLinkSlice";
import authModalSlice from "./authModalSlice";
import authSlice from "./authSlice";
import categoryFiltersSlice from "./categoryFiltersSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";
import drawerSlice from "./drawerSlice";

const rootReducer = {
  reducer: {
    auth: authSlice,
    authModal: authModalSlice,
    navLink: navLinkSlice,
    categoryFilters: categoryFiltersSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    drawer: drawerSlice
  },
};

export default rootReducer;
