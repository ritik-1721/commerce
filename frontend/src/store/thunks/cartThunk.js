import {
  addToCartApi,
  deleteFromCartApi,
  getCartApi,
  removeFromCartApi,
} from "@/utils/service";
import { cartActions } from "../slice/cartSlice";
import toast from "react-hot-toast";
import { ProductToaster } from "@/components/ui/Toaster";

export const SetCart = () => {
  return async (dispatch) => {
    try {
      const req = await getCartApi();
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        await dispatch(cartActions.replaceCart(data.cart));
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const AddToCart = (product_id) => {
  return async (dispatch) => {
    try {
      const req = await addToCartApi(product_id);
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        await dispatch(cartActions.addItemToCart(data.productDetails));
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
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const RemoveFromCart = (product_id) => {
  return async (dispatch) => {
    try {
      const req = await removeFromCartApi(product_id);
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        await dispatch(cartActions.removeItemFromCart(data.productDetails));
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
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};

export const DeleteFromCart = (product_id) => {
  return async (dispatch) => {
    try {
      const req = await deleteFromCartApi(product_id);
      const data = await req.json();
      if (req.status === 401 || req.status === 403) {
      } else if (data.ok === true) {
        await dispatch(cartActions.deteleItemFromCart(data.productDetails));
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
      } else {
      }
    } catch (error) {
      console.log(`error >>> ${error}`);
    }
  };
};
