import {
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "@/utils/service";
import { wishlistActions } from "../slice/wishlistSlice";
import toast from "react-hot-toast";
import { ProductToaster } from "@/components/ui/Toaster";

export const SetWishlist = () => {
  return async (dispatch) => {
    try {
      const req = await getWishlistApi();
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        await dispatch(wishlistActions.setWishlist(data.wishlist));
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const AddToWishlist = (product_id) => {
  return async (dispatch) => {
    try {
      const req = await addToWishlistApi(product_id);
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        // toast.success(data.message);
        toast.custom(
          (t) => (
            <ProductToaster
              dismissHandler={() => toast.dismiss(t.id)}
              t={t}
              img_link={data.productDetails.img_link}
              product_title={data.productDetails.product_title}
              message={data.message}
            />
          ),
          {
            duration: 1500,
          }
        );

        await dispatch(wishlistActions.addToWishlist(data.productDetails));
        console.log("work");
        // await dispatch(SetWishlist());
      } else {
        if (data.productDetails) {
          toast.custom(
            (t) => (
              <ProductToaster
                dismissHandler={() => toast.dismiss(t.id)}
                t={t}
                img_link={data.productDetails.img_link}
                product_title={data.productDetails.product_title}
                message={data.message}
              />
            ),
            {
              duration: 1500,
            }
          );
          // await dispatch(SetWishlist());
        }
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const RemoveFromWishlist = (product_id) => {
  return async (dispatch) => {
    try {
      const req = await removeFromWishlistApi(product_id);
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        // toast.error(data.message, {
        //   duration: 1500,
        // });
        toast.custom(
          (t) => (
            <ProductToaster
              dismissHandler={() => toast.dismiss(t.id)}
              t={t}
              img_link={data.productDetails.img_link}
              product_title={data.productDetails.product_title}
              message={data.message}
            />
          ),
          {
            duration: 1500,
          }
        );
        await dispatch(wishlistActions.removeFromWishlist(product_id));
        // await dispatch(SetWishlist());
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};
