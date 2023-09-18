import ProductSlider from "@/components/product/ProductSlider";
import { CheckIcon } from "@/components/icons";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";
import { BASE_URL } from "@/utils/constants";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToWishlist } from "@/store/thunks/wishlistThunk";
import { authModalActions } from "@/store/slice/authModalSlice";
import { AddToCart } from "@/store/thunks/cartThunk";
import { getSocketWorker } from "@/utils/socketUtility";
import parse from "html-react-parser";

const ProductDetails = (props) => {
  const worker = getSocketWorker();
  const userId = useSelector((state) => state.auth.userDetails?.user_id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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

  const addToCartHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(AddToCart(props.productDetails.product_id));
      sendRefreshCart();
    },
    [
      dispatch,
      isAuthenticated,
      props.productDetails.product_id,
      sendRefreshCart,
    ]
  );

  const addToWishlistHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(AddToWishlist(props.productDetails.product_id));
      sendRefreshWishlist();
    },
    [
      dispatch,
      isAuthenticated,
      props.productDetails.product_id,
      sendRefreshWishlist,
    ]
  );

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }
  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-7  mt-10  md:mx-20 lg:mx-24 mb-5 ">
        {/* hover:scale-105 hover:shadow-xl */}
        <div className="rounded-none  bg-white  duration-500  w-full h-auto lg:col-span-1 px-10 md:px-2 lg:px-2 ">
          <ProductSlider images={props.productDetails.images} />
        </div>
        <div className="rounded-none  bg-white duration-500 w-full h-auto lg:col-span-1 px-10 md:px-2 lg:px-2 ">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl ">
            {props.productDetails.product_title}
          </h2>
          <p className="mb-4 text-gray-500 ">
            {props.productDetails.product_sub_title}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ₹ {props.productDetails.product_msp}
            </p>
            {props.productDetails.product_msp <
              props.productDetails.product_mrp && (
              <del>
                <p className="text-md text-gray-600 cursor-auto ml-2">
                  ₹ {props.productDetails.product_mrp}
                </p>
              </del>
            )}
          </div>
          <div>
            {props.productDetails.similarProductsAttributes.length > 0 &&
              props.productDetails.similarProductsAttributes.map((i, index) => {
                return (
                  <div className="pb-4" key={index}>
                    <h2
                      className="uppercase 
                   font-medium text-sm tracking-wide"
                    >
                      {i.attribute_name}
                    </h2>

                    <div role="listbox" className="flex flex-row py-4">
                      {i.products.length > 0 &&
                        i.products.map((a, index) => {
                          //outline outline-black
                          if (i.attribute_value_type === "text") {
                            return (
                              <Link
                                key={index}
                                href={`${BASE_URL}product/${a.product_slug}`}
                              >
                                <button
                                  type="button"
                                  className={`border ${
                                    a.selectedProduct === 1
                                      ? `outline outline-black`
                                      : `outline outline-gray-300`
                                  } border-black outline-1 w-11 h-11 p-2.5 mr-2 text-center text-black hover:bg-gray-100 hover:outline-black font-semibold rounded-full text-sm items-center hover:scale-110 `}
                                >
                                  {a.attribute_value}
                                </button>
                              </Link>
                            );
                          } else if (i.attribute_value_type === "color") {
                            return (
                              <Link
                                key={index}
                                href={`${BASE_URL}product/${a.product_slug}`}
                              >
                                <button
                                  type="button"
                                  className={`border ${
                                    a.selectedProduct === 1 && a.attribute_value==="#000000" 
                                      ? `outline outline-black`
                                      : `outline outline-gray-300`
                                  } border-black outline-1 w-11 h-11 p-2.5 mr-2 text-center text-black hover:bg-gray-100 hover:outline-black font-semibold rounded-full text-sm items-center hover:scale-110
                        `}
                                  style={{
                                    backgroundColor: `${a.attribute_value}`,
                                  }}
                                >
                                  {a.selectedProduct === 1 && <CheckIcon color={`${a.attribute_value==="#000000"?"white":"black"}`} />}
                                  {a.selectedProduct === 0 && `  `}
                                </button>
                              </Link>
                            );
                          } else {
                          }
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
          <p className="pb-4 break-words w-full max-w-xl">
            {parse(props.productDetails.product_description)}
          </p>
          <div className="pt-2 w-full lg:px-11 flex flex-col">
            <Button variant="slim" onClick={addToCartHandler}>
              Add To Bag
            </Button>
          </div>
          <div className="pt-2 w-full lg:px-11 flex-col">
            <Button variant="slim" onClick={addToWishlistHandler}>
              Save To Wishlist
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetails;
