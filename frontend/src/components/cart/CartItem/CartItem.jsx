import Image from "next/image";
import Quantity from "../../ui/Quantity/Quantity";
import { TrashIcon } from "../../icons";
import {
  AddToCart,
  RemoveFromCart,
  DeleteFromCart,
} from "@/store/thunks/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { authModalActions } from "@/store/slice/authModalSlice";
import { useCallback, memo } from "react";
import Link from "next/link";

const Option = ({ attributes }) => {
  return (
    <>
      {" "}
      {attributes && attributes.length > 0 && (
        <div className="flex items-center pb-1">
          {attributes.map((item, i) => (
            <div
              key={`${item.pa_id}-${item.attribute_name}`}
              className="text-sm font-semibold text-black/[0.5] inline-flex items-center justify-center"
            >
              {item.attribute_name}
              {item.attribute_name === "Color" ? (
                <span
                  className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: `${item.attribute_value}`,
                  }}
                ></span>
              ) : (
                <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                  {item.attribute_value_description}
                </span>
              )}

              {i < attributes.length - 1 ? <span>/</span> : ""}
              {i === attributes.length - 1 ? "" : <span className="mr-3" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const CartItem = ({ data }) => {
  const {
    quantity,
    product_title,
    product_sub_title,
    product_msp,
    product_mrp,
    product_id,
    attributes,
    product_slug,
    img_link,
    product_description,
  } = data;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const deleteHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(DeleteFromCart(product_id));
    },
    [dispatch, isAuthenticated, product_id]
  );
  const decreaseHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(RemoveFromCart(product_id));
    },
    [dispatch, isAuthenticated, product_id]
  );

  const increaseHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();
      if (isAuthenticated === false) {
        dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
        return false;
      }
      dispatch(AddToCart(product_id));
    },
    [dispatch, isAuthenticated, product_id]
  );
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Link href={`/product/${product_slug}`}>
          <Image
            src={`${img_link}?w=200&h=200`}
            alt={product_title}
            width={120}
            height={120}
          />
        </Link>
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <Link href={`/product/${product_slug}`}>
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
              {product_title}
            </div>
          </Link>
          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {/* {product_sub_title} */}
            <Option attributes={attributes} />
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{product_msp}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {/* {product_sub_title} */}

          <Option attributes={attributes} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <Quantity
              value={quantity}
              decrease={decreaseHandler}
              increase={increaseHandler}
            />
          </div>
          <button
            className="flex items-center gap-x-1 text-gray-500 hover:text-black"
            onClick={deleteHandler}
          >
            <TrashIcon className="cursor-pointer  text-[16px] md:text-[20px]" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItem);
