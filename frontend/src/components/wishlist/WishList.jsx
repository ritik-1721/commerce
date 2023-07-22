import ProductCard from "@/components/product/ProductCard";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
// import NotFound from "@/components/common/NotFound/NotFound";
import ErrorMessage from "@/components/error/ErrorMessage";
import ErrorBoundary from "@/components/error/ErrorBoundary";

const renderWishList = (isAuthenticated, wishlistItems, wishlistTotalItem) => {
  if (isAuthenticated === false) {
    return `<NotFound view="WISHLIST_LOGOUT_VIEW" />`;
  } else if (Boolean(wishlistTotalItem)) {
    return (
      <WishListSection
        productList={wishlistItems}
        TotalItem={wishlistTotalItem}
      />
    );
  } else {
    return `<NotFound view="WISHLIST_EMPTY_VIEW" />`;
  }
};

function WishListSection(props) {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-full px-1 sm:px-2 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            My Wishlist <small>{props?.TotalItem} items</small>
          </h1>
        </div>
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5  ">
            {props?.productList.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  product_id={item.product_id}
                  product_slug={item.product_slug}
                  img_link={item.img_link}
                  sub_title={item.product_sub_title}
                  title={item.product_title}
                  msp={item.product_msp}
                  mrp={item.product_mrp}
                  wishlist_id={item.wishlist_id}
                  bagBtn={true}
                  trashBtn={true}
                  heartBtn={false}
                />
              );
            })}
          </section>
        </section>
      </main>
    </div>
  );
}

export default function WishList() {
  try {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const wishlistTotalItem = useSelector(
      (state) => state.wishlist.wishlistTotalItem
    );
    return (
      <Fragment>
        {renderWishList(isAuthenticated, wishlistItems, wishlistTotalItem)}
      </Fragment>
    );
  } catch (error) {
    return (
      <ErrorBoundary>
        <ErrorMessage error={error} />
      </ErrorBoundary>
    );
  }
}
