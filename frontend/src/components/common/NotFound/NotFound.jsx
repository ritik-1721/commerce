import { CatFlowerPotIcon } from "@/components/icons";
import SideSection from "./SideSection";
const NotFound = (props) => {
  const viewType = props?.view || "NOT_FOUND_VIEW";

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          {viewType === "NOT_FOUND_VIEW" ? (
            <SideSection
              head="Not Found"
              pone="The requested page doesn't exist or you don't have access to it."
              ptwo="But dont worry, you can find plenty of other things on our homepage."
              loginbtn={false}
              homebtn={true}
              shoppingbtn={false}
            />
          ) : viewType === "WISHLIST_LOGOUT_VIEW" ? (
            <SideSection
              head="PLEASE LOG IN"
              pone="Login to view items in your wishlist."
              ptwo=""
              loginbtn={true}
              homebtn={false}
              shoppingbtn={false}
            />
          ) : viewType === "WISHLIST_EMPTY_VIEW" ? (
            <SideSection
              head="YOUR WISHLIST IS EMPTY."
              pone=""
              ptwo="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
              loginbtn={false}
              shoppingbtn={true}
              homebtn={false}
            />
          ) : viewType === "CART_EMPTY_VIEW" ? (
            <SideSection
              head="YOUR CART IS EMPTY."
              pone=""
              ptwo="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
              loginbtn={false}
              shoppingbtn={true}
              homebtn={false}
            />
          ) : viewType === "NO_PRODUCT_FOUND_VIEW" ? (
            <SideSection
              head="No Products Found."
              pone=""
              ptwo=""
              loginbtn={false}
              shoppingbtn={false}
              homebtn={false}
            />
          ) : null}
        </div>
        <div className="max-w-lg">
          <CatFlowerPotIcon />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
