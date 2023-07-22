// import WishList from "@/components/wishlist/WishList";
import CartItem from "@/components/cart/CartItem";
import Wrapper from "@/components/ui/Wrapper";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button/Button";
import CheckoutItem from "@/components/cart/CheckoutItem";

export default function Page() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalItems = useSelector((state) => state.cart.totalItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <>
      <NextSeo
        title="Cart"
        description="Next SEO packages simplifies the SEO management in Next Apps with less configurations"
        canonical="www.example.com/next-seo-blog"
        openGraph={{
          type: "article",
          article: {
            publishedTime: "2022-06-21T23:04:13Z",
            modifiedTime: "2022-01-21T18:04:43Z",
            authors: [
              "https://www.example.com/authors/@firstnameA-lastnameA",
              "https://www.example.com/authors/@firstnameB-lastnameB",
            ],
            tags: ["Tag A", "Tag B", "Tag C"],
          },
          url: "www.example.com/next-seo-blog",
          images: {
            url: "https://www.test.ie/images/cover.jpg",
            width: 850,
            height: 650,
            alt: "Photo of text",
          },
          site_name: "Next Blog",
        }}
      />
      <div className="w-full md:py-20">
        <Wrapper>
          {cartTotalItems > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Shopping Cart
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS START */}
                <div className="flex-[2]">
                  <div className="text-lg font-bold">Cart Items</div>
                  {cartItems.map((item) => (
                    <>
                      <CartItem key={item.product_id} data={item} />
                      {/* <CheckoutItem key={item.product_id} data={item} /> */}
                    </>
                  ))}
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}

                <div className="flex-[1]">
                  <div className="text-lg font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-none">
                    <div class="mb-2 flex items-center justify-between ">
                      <p>Subtotal</p>
                      <p class="text-right">
                        &#8377;{cartTotalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div class="mb-2 flex items-center justify-between">
                      <p>Taxes</p>
                      <p class="text-right">&#8377;0.00</p>
                    </div>
                    <div class="mb-5 flex items-center justify-between border-b border-gray-200 pb-2">
                      <p>Shipping</p>
                      <p class="text-right">Calculated at checkout</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-medium text-black">
                        Total
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        &#8377;{cartTotalAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm md:text-md py-5 border-t mt-5">
                      The subtotal reflects the total price of your order,
                      including duties and taxes, before any applicable
                      discounts. It does not include delivery costs and
                      international transaction fees.
                    </div>
                  </div>

                  {/* BUTTON START */}
                  <div className="pt-2 w-full  flex-col">
                    <Button variant="slim">GO TO CHECKOUT</Button>
                  </div>
                  {/* BUTTON END */}
                </div>

                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          )}
        </Wrapper>
      </div>
    </>
  );
}
