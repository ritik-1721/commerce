import React, { memo, useCallback } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Headroom from "react-headroom";
import { BASE_URL } from "@/utils/constants";
import {
  BrandLogoIcon,
  MenuIcon,
  BagIcon,
  HeartIcon,
  SearchIcon,
  PersonIcon,
} from "@/components/icons";
import NavMenu from "./NavMenu";

import { authModalActions } from "@/store/slice/authModalSlice";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ErrorBoundary from "@/components/error/ErrorBoundaryOld";
import { useDispatch, useSelector } from "react-redux";
import { drawerAction } from "@/store/slice/drawerSlice";

const tooltipBtnClass =
  "inline-flex items-center p-2 text-sm text-gray-800 rounded-full hover:text-gray-500 focus:outline-none hover:scale-105";
const badgesClass =
  "absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black border-2 border-black rounded-full -right-0 -bottom-0";

const LogoLink = memo(function LogoLink() {
  return (
    <Link href={`${BASE_URL}`} className="flex items-center">
      <BrandLogoIcon />
    </Link>
  );
});
LogoLink.displayName = "LogoLink";

const SearchButton = memo(function SearchButton() {
  return (
    <button
      data-collapse-toggle="navbar-sticky"
      type="button"
      className={tooltipBtnClass}
      aria-controls="navbar-sticky"
      aria-expanded="false"
    >
      <SearchIcon />
    </button>
  );
});
SearchButton.displayName = "SearchButton";

const CartButton = memo(function CartButton({ cartTotalItems }) {
  return (
    <Link href={`${BASE_URL}cart`}>
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className={cn(tooltipBtnClass, "relative")}
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <BagIcon />

        {cartTotalItems > 0 && (
          <div className={badgesClass}> {cartTotalItems} </div>
        )}
      </button>
    </Link>
  );
});
CartButton.displayName = "CartButton";

const WishlistButton = memo(function WishlistButton({ wishlistTotalItem }) {
  return (
    <Link href={`${BASE_URL}wishlist`}>
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className={cn(tooltipBtnClass, "relative")}
        // className={tooltipBtnClass}
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <HeartIcon />
        {wishlistTotalItem > 0 && (
          <div className={badgesClass}> {wishlistTotalItem} </div>
        )}
      </button>
    </Link>
  );
});
WishlistButton.displayName = "WishlistButton";

const LoginButton = memo(function LoginButton({ onClick }) {
  return (
    <button
      data-collapse-toggle="navbar-sticky"
      type="button"
      className={tooltipBtnClass}
      aria-controls="navbar-sticky"
      aria-expanded="false"
      onClick={onClick}
    >
      <PersonIcon />
    </button>
  );
});
LoginButton.displayName = "LoginButton";

const MobileMenuButton = memo(function MobileMenuButton() {
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    dispatch(drawerAction.toggleDrawer());
  };

  return (
    <button
      data-collapse-toggle="navbar-sticky"
      type="button"
      onClick={toggleDrawer}
      className={cn(tooltipBtnClass, "md:hidden")}
      aria-controls="navbar-sticky"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <MenuIcon />
    </button>
  );
});
MobileMenuButton.displayName = "MobileMenuButton";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const wishlistTotalItem = useSelector(
    (state) => state.wishlist.wishlistTotalItem
  );
  const cartTotalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const handleLoginButtonClick = useCallback(() => {
    dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
  }, [dispatch]);

  return (
    <Headroom
      style={{
        webkitTransition: "all .5s ease-in-out",
        mozTransition: "all .5s ease-in-out",
        oTransition: "all .5s ease-in-out",
        transition: "all .5s ease-in-out",
      }}
    >
      <nav className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <LogoLink />

          <div className="flex md:order-2">
            <SearchButton />
            <CartButton cartTotalItems={cartTotalItems} />
            <WishlistButton wishlistTotalItem={wishlistTotalItem} />

            {isAuthenticated ? (
              <ProfileDropdownMenu />
            ) : (
              <LoginButton onClick={handleLoginButtonClick} />
            )}

            <MobileMenuButton />
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ErrorBoundary>
              <NavMenu />
            </ErrorBoundary>
          </div>
        </div>
      </nav>
    </Headroom>
  );
};

export default NavBar;
