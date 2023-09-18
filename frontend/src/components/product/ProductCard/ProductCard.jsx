import { BagIcon, HeartIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToWishlist,
  RemoveFromWishlist,
} from "@/store/thunks/wishlistThunk";
import { useEffect, useState, useCallback, memo } from "react";
import { authModalActions } from "@/store/slice/authModalSlice";
import Image from "next/image";
import { AddToCart } from "@/store/thunks/cartThunk";
import { getSocketWorker } from "@/utils/socketUtility";

const ProductCard = (props) => {
  const worker = getSocketWorker();
  const userId = useSelector((state) => state.auth.userDetails?.user_id);
  const {
    product_slug,
    img_link,
    sub_title,
    title,
    msp,
    mrp,
    product_id,
    bagBtn,
    trashBtn,
    heartBtn,
    wishlist_id,
  } = props;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  useEffect(() => {
    setLike(Boolean(wishlist_id));
  }, [wishlist_id]);

  const sendRefreshWishlist = useCallback(() => {
    if (!userId) {
      return false;
    }
    worker.postMessage({ type: "send-refresh-wishlist", data: userId });
  }, [worker, userId]);

  const sendRefreshCart = useCallback(() => {
    if (!userId) {
      return false;
    }
    worker.postMessage({ type: "send-refresh-cart", data: userId });
  }, [worker, userId]);

  const removeFromWishlistHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      dispatch(RemoveFromWishlist(product_id));
      setLike(false);
      sendRefreshWishlist();
    },
    [dispatch, product_id, sendRefreshWishlist]
  );

  const addToCartHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(AddToCart(product_id));
      sendRefreshCart();
    },
    [dispatch, isAuthenticated, product_id, sendRefreshCart]
  );

  const addToWishlistHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }

      if (like === false) {
        dispatch(AddToWishlist(product_id));
        setLike(true);
      } else {
        dispatch(RemoveFromWishlist(product_id));
        setLike(false);
      }
      sendRefreshWishlist();
    },
    [dispatch, isAuthenticated, like, product_id, sendRefreshWishlist]
  );

  return (
    <Link href={`${BASE_URL}product/${product_slug}`}>
      <div className="rounded-none w-80 sm:w-80 md:w-60 bg-white shadow-md duration-500 hover:scale-102 hover:shadow-xl">
        <Image
          width={500}
          height={500}
          src={img_link}
          alt="Product"
          className="h-50 w-80 sm:w-80 md:w-60 object-cover rounded-none"
        />
        <div className="px-4 py-3 w-80 sm:w-80 md:w-60">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {sub_title}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {title}
          </p>
          <div className="flex items-center">
            <p className="text-sm font-semibold text-black cursor-auto my-3">
              ₹ {msp}
            </p>
            {msp < mrp && (
              <del>
                <p className="text-xs text-gray-600 cursor-auto ml-2">
                  ₹ {mrp}
                </p>
              </del>
            )}
            <div className="flex md:order-2 ml-auto">
              {bagBtn && (
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className=" inline-flex items-center p-2 text-sm  text-gray-800 rounded-full hover:text-gray-500 focus:outline-none "
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                  onClick={addToCartHandler}
                >
                  <BagIcon />
                </button>
              )}

              {heartBtn && (
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className={`inline-flex items-center p-2 text-sm text-gray-800 rounded-full hover:text-gray-500 focus:outline-none `}
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                  onClick={addToWishlistHandler}
                >
                  <HeartIcon fill={`${like ? "#f75637" : "white"}`} />
                </button>
              )}

              {trashBtn && (
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-800 rounded-full hover:text-gray-500 focus:outline-none"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                  onClick={removeFromWishlistHandler}
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
