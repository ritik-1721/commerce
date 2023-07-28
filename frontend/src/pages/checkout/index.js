// import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import Wrapper from "@/components/ui/Wrapper";
import { useSelector } from "react-redux";
import CheckoutItem from "@/components/cart/CheckoutItem";
import LabelInput from "@/components/ui/LabelInput";

import Button from "@/components/ui/Button/Button";
import { useState } from "react";

function SameAsBillingCheckbox({ sameAsBilling, onClick }) {
  return (
    <div className="mt-6">
      <button
        className="text-base-regular flex items-center gap-x-2"
        role="checkbox"
        type="button"
        aria-checked="true"
        onClick={onClick}
      >
        <div
          role="checkbox"
          aria-checked="true"
          className="flex h-5 w-5 items-center justify-center border border-gray-900"
        >
          {!sameAsBilling && "✓"}
        </div>
        <span>Same as billing address</span>
      </button>
    </div>
  );
}
export default function Page() {
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalItems = useSelector((state) => state.cart.totalItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const sameAsBillingHandler = () => {
    setSameAsBilling(!sameAsBilling);
  };
  return (
    <>
      <Wrapper>
        {/* HEADING AND PARAGRAPH START */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Checkout
          </div>
        </div>
        {/* HEADING AND PARAGRAPH END */}

        {/* CART CONTENT START */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS START */}
          <div className="flex-[3]">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                  1
                </div>
                <h2>Shipping address</h2>
              </div>
              <div className="px-8 pb-8">
                {/* <ShippingAddressForm /> */}
                <div className="grid grid-cols-1 gap-y-2">
                  <LabelInput
                    id="shipping_address.email"
                    name="shipping_address.email"
                    type="email"
                    placeholder="Email"
                    onChange={null}
                    onBlur={null}
                    value={""}
                    inputHasError={false}
                    label={"Email address"}
                    required={true}
                  />
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address.first_name"
                      name="shipping_address.first_name"
                      type="text"
                      placeholder="Enter first name."
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="first-name"
                      inputHasError={null}
                      label={"First name"}
                    />
                    <LabelInput
                      id="shipping_address.last_name"
                      name="shipping_address.last_name"
                      type="text"
                      placeholder="Enter last name."
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="last-name"
                      inputHasError={null}
                      label={"Last name"}
                    />
                  </div>
                  <LabelInput
                    id="shipping_address.address_2"
                    name="shipping_address.address_2"
                    type="text"
                    placeholder=" "
                    onChange={null}
                    onBlur={null}
                    value={""}
                    autocomplete="address-line2"
                    inputHasError={null}
                    label={"Apartments, suite, etc."}
                  />
                  <LabelInput
                    id="shipping_address.address_1"
                    name="shipping_address.address_1"
                    type="text"
                    placeholder="Enter address."
                    onChange={null}
                    onBlur={null}
                    value={""}
                    autocomplete="address-line1"
                    inputHasError={null}
                    label={"Address"}
                  />

                  <div className="grid grid-cols-[122px_1fr] gap-x-2">
                    <LabelInput
                      id="shipping_address.postal_code"
                      name="shipping_address.postal_code"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="postal-code"
                      inputHasError={null}
                      label={"Postal code"}
                    />

                    <LabelInput
                      id="shipping_address.city"
                      name="shipping_address.city"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="address-level2"
                      inputHasError={null}
                      label={"City"}
                      readOnly={true}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address.city"
                      name="shipping_address.city"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="address-level2"
                      inputHasError={null}
                      label={"State"}
                      readOnly={true}
                    />
                    <LabelInput
                      id="shipping_address.province"
                      name="shipping_address.province"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="address-level1"
                      inputHasError={null}
                      label={"Country"}
                      readOnly={true}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address.phone"
                      name="shipping_address.phone"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="tel"
                      inputHasError={null}
                      label={"Phone"}
                    />
                    <LabelInput
                      id="shipping_address.phone"
                      name="shipping_address.phone"
                      type="text"
                      placeholder=" "
                      onChange={null}
                      onBlur={null}
                      value={""}
                      autocomplete="tel"
                      inputHasError={null}
                      label={"Phone"}
                    />
                  </div>
                </div>
                {/* <ShippingAddressForm /> */}

                <SameAsBillingCheckbox
                  sameAsBilling={sameAsBilling}
                  onClick={sameAsBillingHandler}
                />
              </div>

              {sameAsBilling && (
                <>
                  <div className="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8 text-[28px] font-semibold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                      2
                    </div>
                    <h2>Billing address</h2>
                  </div>
                  <div className="px-8 pb-8">
                    {/* <BillingAddressForm /> */}
                    <div className="grid grid-cols-1 gap-y-2">
                      <LabelInput
                        id="shipping_address.email"
                        name="shipping_address.email"
                        type="email"
                        placeholder="Email"
                        onChange={null}
                        onBlur={null}
                        value={""}
                        inputHasError={null}
                        label={"Email address"}
                      />
                      <div className="grid grid-cols-2 gap-x-2">
                        <LabelInput
                          id="shipping_address.first_name"
                          name="shipping_address.first_name"
                          type="text"
                          placeholder="Enter first name."
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="first-name"
                          inputHasError={null}
                          label={"First name"}
                        />
                        <LabelInput
                          id="shipping_address.last_name"
                          name="shipping_address.last_name"
                          type="text"
                          placeholder="Enter last name."
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="last-name"
                          inputHasError={null}
                          label={"Last name"}
                        />
                      </div>
                      <LabelInput
                        id="shipping_address.address_2"
                        name="shipping_address.address_2"
                        type="text"
                        placeholder=" "
                        onChange={null}
                        onBlur={null}
                        value={""}
                        autocomplete="address-line2"
                        inputHasError={null}
                        label={"Apartments, suite, etc."}
                      />
                      <LabelInput
                        id="shipping_address.address_1"
                        name="shipping_address.address_1"
                        type="text"
                        placeholder="Enter address."
                        onChange={null}
                        onBlur={null}
                        value={""}
                        autocomplete="address-line1"
                        inputHasError={null}
                        label={"Address"}
                      />

                      <div className="grid grid-cols-[122px_1fr] gap-x-2">
                        <LabelInput
                          id="shipping_address.postal_code"
                          name="shipping_address.postal_code"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="postal-code"
                          inputHasError={null}
                          label={"Postal code"}
                        />

                        <LabelInput
                          id="shipping_address.city"
                          name="shipping_address.city"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="address-level2"
                          inputHasError={null}
                          label={"City"}
                        />
                      </div>

                      <LabelInput
                        id="shipping_address.province"
                        name="shipping_address.province"
                        type="text"
                        placeholder=" "
                        onChange={null}
                        onBlur={null}
                        value={""}
                        autocomplete="address-level1"
                        inputHasError={null}
                        label={"Country"}
                      />
                      <div className="grid grid-cols-2 gap-x-2">
                        <LabelInput
                          id="shipping_address.phone"
                          name="shipping_address.phone"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="tel"
                          inputHasError={null}
                          label={"Phone"}
                        />
                        <LabelInput
                          id="shipping_address.phone"
                          name="shipping_address.phone"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="tel"
                          inputHasError={null}
                          label={"Phone"}
                        />
                      </div>
                    </div>
                    {/* <BillingAddressForm /> */}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex-[2]">
            <div className="">
              <div className="p-5 my-5 bg-black/[0.05] rounded-none">
                <div className="  text-[28px] font-semibold ">
                  Order summary
                </div>
                {cartItems.map((item) => (
                  <>
                    <CheckoutItem key={item.product_id} data={item} />
                  </>
                ))}
                <div className="mb-2 flex items-center justify-between pt-2 ">
                  <p>Subtotal</p>
                  <p className="text-right">
                    &#8377;{cartTotalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <p>Taxes</p>
                  <p className="text-right">&#8377;0.00</p>
                </div>
                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-2">
                  <p>Shipping</p>
                  <p className="text-right">&#8377;0.00</p>
                </div>
                <div className="mb-5 flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Total
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    &#8377;{cartTotalAmount.toFixed(2)}
                  </div>
                </div>
                {/* BUTTON START */}
                <div className="pt-2 w-full  flex-col">
                  <Button variant="slim" className="h-[54px]">
                    CHECKOUT
                  </Button>
                </div>
                {/* BUTTON END */}
              </div>

              <div className="p-5 my-5 bg-black/[0.05] rounded-none">
                <div class="w-full flex flex-col">
                  <div class="mb-4">
                    <h3 class="text-base-semi font-medium ">Discount</h3>
                  </div>
                  <div class="text-small-regular">
                    <form class="w-full">
                      <div class="grid grid-cols-[1fr_80px] gap-x-2">
                        <LabelInput
                          id="shipping_address.phone"
                          name="shipping_address.phone"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autocomplete="tel"
                          inputHasError={null}
                          label={"Code"}
                        />
                        <div>
                          <Button variant="slim" className="h-[54px]">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CART CONTENT START */}
      </Wrapper>
    </>
  );
}

{
  /* <div>
                    <div className="text-base-regular relative flex items-center border border-gray-200">
                      <select
                        name="shipping_address.country_code"
                        autocomplete="country"
                        className="flex-1 appearance-none border-none bg-transparent px-4 py-2.5 outline-none transition-colors duration-150 focus:border-gray-700"
                      >
                        <option value="">Country</option>
                        <option value="se">Sweden</option>
                        <option value="gb">United Kingdom</option>
                        <option value="de">Germany</option>
                        <option value="dk">Denmark</option>
                        <option value="fr">France</option>
                        <option value="es">Spain</option>
                        <option value="it">Italy</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div> */
}
