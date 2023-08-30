// import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import Wrapper from "@/components/ui/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import CheckoutItem from "@/components/cart/CheckoutItem";
import LabelInput from "@/components/ui/LabelInput";
import useInput from "@/hooks/use-input";
import { isEmail, isNotEmpty, noValidate } from "@/hooks/use-validate";
import Button from "@/components/ui/Button/Button";
import { useState, useRef, useEffect, useCallback } from "react";
import { CreateOrderApi, VerifyOrderApi } from "@/utils/service";
import useRazorpay from "react-razorpay";
import { SetCart } from "@/store/thunks/cartThunk";

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
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const router = useRouter();
  const axios = { post: function post() {} };
  function createVerify(data) {
    return axios.post(`http://localhost:5000/api/verify`, data);
  }

  function getPaymentDetails(data) {
    return axios.post(`http://localhost:5000/api/payDetails`, data);
  }
  const shippingAddressEmailInputRef = useRef(null);
  const shippingAddressFirstNameInputRef = useRef(null);
  const shippingAddressLastNameInputRef = useRef(null);
  const shippingAddressApartmentSuiteUnitInputRef = useRef(null);
  const shippingAddressStreetAddressInputRef = useRef(null);
  const shippingAddressPincodeInputRef = useRef(null);
  const shippingAddressReceiverMobileInputRef = useRef(null);
  const shippingAddressAlternativeMobileInputRef = useRef(null);
  const shippingAddressStateInputRef = useRef(null);
  const shippingAddressCountryInputRef = useRef(null);
  const shippingAddressCityInputRef = useRef(null);
  const billingAddressFirstNameInputRef = useRef(null);
  const billingAddressLastNameInputRef = useRef(null);
  const billingAddressApartmentSuiteUnitInputRef = useRef(null);
  const billingAddressStreetAddressInputRef = useRef(null);
  const billingAddressPincodeInputRef = useRef(null);
  const billingAddressReceiverMobileInputRef = useRef(null);
  const billingAddressAlternativeMobileInputRef = useRef(null);
  const billingAddressStateInputRef = useRef(null);
  const billingAddressCountryInputRef = useRef(null);
  const billingAddressCityInputRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalItems = useSelector((state) => state.cart.totalItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const {
    value: enteredShippingAddressEmail,
    isValid: enteredShippingAddressEmailIsValid,
    hasError: shippingAddressEmailInputHasError,
    valueChangeHandler: shippingAddressEmailChangedHandler,
    inputBlurHandler: shippingAddressEmailBlurHandler,
    reset: resetShippingAddressEmailInput,
  } = useInput(isEmail);
  const {
    value: enteredShippingAddressFirstName,
    isValid: enteredShippingAddressFirstNameIsValid,
    hasError: shippingAddressFirstNameInputHasError,
    valueChangeHandler: shippingAddressFirstNameChangedHandler,
    inputBlurHandler: shippingAddressFirstNameBlurHandler,
    reset: resetShippingAddressFirstNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressLastName,
    isValid: enteredShippingAddressLastNameIsValid,
    hasError: shippingAddressLastNameInputHasError,
    valueChangeHandler: shippingAddressLastNameChangedHandler,
    inputBlurHandler: shippingAddressLastNameBlurHandler,
    reset: resetShippingAddressLastNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressApartmentSuiteUnit,
    isValid: enteredShippingAddressApartmentSuiteUnitIsValid,
    hasError: shippingAddressApartmentSuiteUnitInputHasError,
    valueChangeHandler: shippingAddressApartmentSuiteUnitChangedHandler,
    inputBlurHandler: shippingAddressApartmentSuiteUnitBlurHandler,
    reset: resetShippingAddressApartmentSuiteUnitInput,
  } = useInput(noValidate);
  const {
    value: enteredShippingAddressStreetAddress,
    isValid: enteredShippingAddressStreetAddressIsValid,
    hasError: shippingAddressStreetAddressInputHasError,
    valueChangeHandler: shippingAddressStreetAddressChangedHandler,
    inputBlurHandler: shippingAddressStreetAddressBlurHandler,
    reset: resetShippingAddressStreetAddressInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressPincode,
    isValid: enteredShippingAddressPincodeIsValid,
    hasError: shippingAddressPincodeInputHasError,
    valueChangeHandler: shippingAddressPincodeChangedHandler,
    inputBlurHandler: shippingAddressPincodeBlurHandler,
    reset: resetShippingAddressPincodeInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressCity,
    isValid: enteredShippingAddressCityIsValid,
    hasError: shippingAddressCityInputHasError,
    valueChangeHandler: shippingAddressCityChangedHandler,
    inputBlurHandler: shippingAddressCityBlurHandler,
    reset: resetShippingAddressCityInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressState,
    isValid: enteredShippingAddressStateIsValid,
    hasError: shippingAddressStateInputHasError,
    valueChangeHandler: shippingAddressStateChangedHandler,
    inputBlurHandler: shippingAddressStateBlurHandler,
    reset: resetShippingAddressStateInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressCountry,
    isValid: enteredShippingAddressCountryIsValid,
    hasError: shippingAddressCountryInputHasError,
    valueChangeHandler: shippingAddressCountryChangedHandler,
    inputBlurHandler: shippingAddressCountryBlurHandler,
    reset: resetShippingAddressCountryInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressReceiverMobile,
    isValid: enteredShippingAddressReceiverMobileIsValid,
    hasError: shippingAddressReceiverMobileInputHasError,
    valueChangeHandler: shippingAddressReceiverMobileChangedHandler,
    inputBlurHandler: shippingAddressReceiverMobileBlurHandler,
    reset: resetShippingAddressReceiverMobileInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredShippingAddressAlternativeMobile,
    isValid: enteredShippingAddressAlternativeMobileIsValid,
    hasError: shippingAddressAlternativeMobileInputHasError,
    valueChangeHandler: shippingAddressAlternativeMobileChangedHandler,
    inputBlurHandler: shippingAddressAlternativeMobileBlurHandler,
    reset: resetShippingAddressAlternativeMobileInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressFirstName,
    isValid: enteredBillingAddressFirstNameIsValid,
    hasError: billingAddressFirstNameInputHasError,
    valueChangeHandler: billingAddressFirstNameChangedHandler,
    inputBlurHandler: billingAddressFirstNameBlurHandler,
    reset: resetBillingAddressFirstNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressLastName,
    isValid: enteredBillingAddressLastNameIsValid,
    hasError: billingAddressLastNameInputHasError,
    valueChangeHandler: billingAddressLastNameChangedHandler,
    inputBlurHandler: billingAddressLastNameBlurHandler,
    reset: resetBillingAddressLastNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressApartmentSuiteUnit,
    isValid: enteredBillingAddressApartmentSuiteUnitIsValid,
    hasError: billingAddressApartmentSuiteUnitInputHasError,
    valueChangeHandler: billingAddressApartmentSuiteUnitChangedHandler,
    inputBlurHandler: billingAddressApartmentSuiteUnitBlurHandler,
    reset: resetBillingAddressApartmentSuiteUnitInput,
  } = useInput(noValidate);
  const {
    value: enteredBillingAddressStreetAddress,
    isValid: enteredBillingAddressStreetAddressIsValid,
    hasError: billingAddressStreetAddressInputHasError,
    valueChangeHandler: billingAddressStreetAddressChangedHandler,
    inputBlurHandler: billingAddressStreetAddressBlurHandler,
    reset: resetBillingAddressStreetAddressInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressPincode,
    isValid: enteredBillingAddressPincodeIsValid,
    hasError: billingAddressPincodeInputHasError,
    valueChangeHandler: billingAddressPincodeChangedHandler,
    inputBlurHandler: billingAddressPincodeBlurHandler,
    reset: resetBillingAddressPincodeInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressCity,
    isValid: enteredBillingAddressCityIsValid,
    hasError: billingAddressCityInputHasError,
    valueChangeHandler: billingAddressCityChangedHandler,
    inputBlurHandler: billingAddressCityBlurHandler,
    reset: resetBillingAddressCityInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressState,
    isValid: enteredBillingAddressStateIsValid,
    hasError: billingAddressStateInputHasError,
    valueChangeHandler: billingAddressStateChangedHandler,
    inputBlurHandler: billingAddressStateBlurHandler,
    reset: resetBillingAddressStateInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressCountry,
    isValid: enteredBillingAddressCountryIsValid,
    hasError: billingAddressCountryInputHasError,
    valueChangeHandler: billingAddressCountryChangedHandler,
    inputBlurHandler: billingAddressCountryBlurHandler,
    reset: resetBillingAddressCountryInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressReceiverMobile,
    isValid: enteredBillingAddressReceiverMobileIsValid,
    hasError: billingAddressReceiverMobileInputHasError,
    valueChangeHandler: billingAddressReceiverMobileChangedHandler,
    inputBlurHandler: billingAddressReceiverMobileBlurHandler,
    reset: resetBillingAddressReceiverMobileInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredBillingAddressAlternativeMobile,
    isValid: enteredBillingAddressAlternativeMobileIsValid,
    hasError: billingAddressAlternativeMobileInputHasError,
    valueChangeHandler: billingAddressAlternativeMobileChangedHandler,
    inputBlurHandler: billingAddressAlternativeMobileBlurHandler,
    reset: resetBillingAddressAlternativeMobileInput,
  } = useInput(isNotEmpty);

  const sameAsBillingHandler = () => {
    resetBillingAddressFirstNameInput();
    resetBillingAddressLastNameInput();
    resetBillingAddressApartmentSuiteUnitInput();
    resetBillingAddressStreetAddressInput();
    resetBillingAddressPincodeInput();
    resetBillingAddressCityInput();
    resetBillingAddressStateInput();
    resetBillingAddressCountryInput();
    resetBillingAddressReceiverMobileInput();
    resetBillingAddressAlternativeMobileInput();
    setSameAsBilling(!sameAsBilling);
  };

  useEffect(() => {
    setFormIsValid(
      enteredShippingAddressEmailIsValid &&
        enteredShippingAddressFirstNameIsValid &&
        enteredShippingAddressLastNameIsValid &&
        enteredShippingAddressPincodeIsValid &&
        enteredShippingAddressStreetAddressIsValid &&
        enteredShippingAddressStateIsValid &&
        enteredShippingAddressCityIsValid &&
        enteredShippingAddressCountryIsValid &&
        enteredShippingAddressReceiverMobileIsValid &&
        enteredShippingAddressAlternativeMobileIsValid &&
        (!sameAsBilling ||
          (enteredBillingAddressFirstNameIsValid &&
            enteredBillingAddressLastNameIsValid &&
            enteredBillingAddressPincodeIsValid &&
            enteredBillingAddressStreetAddressIsValid &&
            enteredBillingAddressStateIsValid &&
            enteredBillingAddressCityIsValid &&
            enteredBillingAddressCountryIsValid &&
            enteredBillingAddressReceiverMobileIsValid &&
            enteredBillingAddressAlternativeMobileIsValid))
    );
  }, [
    enteredShippingAddressEmailIsValid,
    enteredShippingAddressFirstNameIsValid,
    enteredShippingAddressLastNameIsValid,
    enteredShippingAddressPincodeIsValid,
    enteredShippingAddressStreetAddressIsValid,
    enteredShippingAddressStateIsValid,
    enteredShippingAddressCityIsValid,
    enteredShippingAddressCountryIsValid,
    enteredShippingAddressReceiverMobileIsValid,
    enteredShippingAddressAlternativeMobileIsValid,
    enteredBillingAddressFirstNameIsValid,
    enteredBillingAddressLastNameIsValid,
    enteredBillingAddressPincodeIsValid,
    enteredBillingAddressStreetAddressIsValid,
    enteredBillingAddressStateIsValid,
    enteredBillingAddressCityIsValid,
    enteredBillingAddressCountryIsValid,
    enteredBillingAddressReceiverMobileIsValid,
    enteredBillingAddressAlternativeMobileIsValid,
    sameAsBilling,
  ]);

  const blurInputsHandler = useCallback(() => {
    shippingAddressEmailBlurHandler();
    shippingAddressFirstNameBlurHandler();
    shippingAddressLastNameBlurHandler();
    shippingAddressPincodeBlurHandler();
    shippingAddressStreetAddressBlurHandler();
    shippingAddressStateBlurHandler();
    shippingAddressCityBlurHandler();
    shippingAddressCountryBlurHandler();
    shippingAddressReceiverMobileBlurHandler();
    shippingAddressAlternativeMobileBlurHandler();
    billingAddressFirstNameBlurHandler();
    billingAddressLastNameBlurHandler();
    billingAddressPincodeBlurHandler();
    billingAddressStreetAddressBlurHandler();
    billingAddressStateBlurHandler();
    billingAddressCityBlurHandler();
    billingAddressCountryBlurHandler();
    billingAddressReceiverMobileBlurHandler();
    billingAddressAlternativeMobileBlurHandler();
  }, [
    shippingAddressEmailBlurHandler,
    shippingAddressFirstNameBlurHandler,
    shippingAddressLastNameBlurHandler,
    shippingAddressPincodeBlurHandler,
    shippingAddressStreetAddressBlurHandler,
    shippingAddressStateBlurHandler,
    shippingAddressCityBlurHandler,
    shippingAddressCountryBlurHandler,
    shippingAddressReceiverMobileBlurHandler,
    shippingAddressAlternativeMobileBlurHandler,
    billingAddressFirstNameBlurHandler,
    billingAddressLastNameBlurHandler,
    billingAddressPincodeBlurHandler,
    billingAddressStreetAddressBlurHandler,
    billingAddressStateBlurHandler,
    billingAddressCityBlurHandler,
    billingAddressCountryBlurHandler,
    billingAddressReceiverMobileBlurHandler,
    billingAddressAlternativeMobileBlurHandler,
  ]);

  const displayRazorpay = useCallback(
    (result) => {
      try {
        const options = {
          key: "rzp_test_QwRkxxPsNKaaaQ", // Enter the Key ID generated from the Dashboard
          amount: result.amount,
          currency: result.currency,
          name: "Soumya Corp.",
          description: "Test Transaction",
          image: { logo: "" },
          order_id: result.id,
          handler: async (response) => {
            const formData = new FormData();
            formData.set("razorpayPaymentId", response.razorpay_payment_id);
            formData.set("razorpayOrderId", response.razorpay_order_id);
            formData.set("razorpaySignature", response.razorpay_signature);
            const req = await VerifyOrderApi(formData);
            const data = await req.json();
            if (data.ok == false) {
              return false;
            }
            dispatch(SetCart());
            
            router.push(
              `/order/${data.orderDetails.order_id}/${CryptoJS.SHA256(data.orderDetails.order_id.toString())}`
            );
          },
          prefill: {
            name: userDetails.fname + " " + userDetails.lname,
            email: userDetails.email,
            contact: "",
          },
          notes: {
            address: "Neosoft",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [userDetails, router, dispatch]
  );

  const formCheckoutHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();
      setIsLoading(true);
      if (!formIsValid) {
        setErrorMessage(
          "Cannot find an account that matches the provided credentials."
        );
        blurInputsHandler();
        setIsLoading(false);
        return false;
      }

      const formData = new FormData();
      formData.set("shipping_address_email", enteredShippingAddressEmail);
      formData.set("shipping_address_fname", enteredShippingAddressFirstName);
      formData.set("shipping_address_lname", enteredShippingAddressLastName);
      formData.set(
        "shipping_address_receiver_mobile",
        enteredShippingAddressReceiverMobile
      );
      formData.set(
        "shipping_address_alternative_mobile",
        enteredShippingAddressAlternativeMobile
      );
      formData.set(
        "shipping_address_apartment_suite_unit",
        enteredShippingAddressApartmentSuiteUnit
      );
      formData.set(
        "shipping_address_street_address",
        enteredShippingAddressStreetAddress
      );
      formData.set("shipping_address_city", enteredShippingAddressCity);
      formData.set("shipping_address_state", enteredShippingAddressState);
      formData.set("shipping_address_pincode", enteredShippingAddressPincode);
      formData.set("shipping_address_country", enteredShippingAddressCountry);
      formData.set("billing_address_fname", enteredBillingAddressFirstName);
      formData.set("billing_address_lname", enteredBillingAddressLastName);
      formData.set(
        "billing_address_receiver_mobile",
        enteredBillingAddressReceiverMobile
      );
      formData.set(
        "billing_address_alternative_mobile",
        enteredBillingAddressAlternativeMobile
      );
      formData.set(
        "billing_address_apartment_suite_unit",
        enteredBillingAddressApartmentSuiteUnit
      );
      formData.set(
        "billing_address_street_address",
        enteredBillingAddressStreetAddress
      );
      formData.set("billing_address_city", enteredBillingAddressCity);
      formData.set("billing_address_state", enteredBillingAddressState);
      formData.set("billing_address_pincode", enteredBillingAddressPincode);
      formData.set("billing_address_country", enteredBillingAddressCountry);
      formData.set("same-as-billing", sameAsBilling ? 1 : 0);

      try {
        const req = await CreateOrderApi(formData);
        const data = await req.json();
        if (data.ok === false) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage(data.message);
          displayRazorpay(data.order);
        }
      } catch (error) {
        alert(error.message);
      }
    },
    [
      formIsValid,
      blurInputsHandler,
      enteredShippingAddressEmail,
      enteredShippingAddressFirstName,
      enteredShippingAddressLastName,
      enteredShippingAddressReceiverMobile,
      enteredShippingAddressAlternativeMobile,
      enteredShippingAddressApartmentSuiteUnit,
      enteredShippingAddressStreetAddress,
      enteredShippingAddressCity,
      enteredShippingAddressState,
      enteredShippingAddressPincode,
      enteredShippingAddressCountry,
      enteredBillingAddressFirstName,
      enteredBillingAddressLastName,
      enteredBillingAddressReceiverMobile,
      enteredBillingAddressAlternativeMobile,
      enteredBillingAddressApartmentSuiteUnit,
      enteredBillingAddressStreetAddress,
      enteredBillingAddressCity,
      enteredBillingAddressState,
      enteredBillingAddressPincode,
      enteredBillingAddressCountry,
      displayRazorpay,
      sameAsBilling,
    ]
  );
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
                    id="shipping_address_email"
                    name="shipping_address_email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    label={"Email address"}
                    required={true}
                    onChange={shippingAddressEmailChangedHandler}
                    onBlur={shippingAddressEmailBlurHandler}
                    value={enteredShippingAddressEmail}
                    inputHasError={shippingAddressEmailInputHasError}
                    errorMessage={"Email is required."}
                    innerRef={shippingAddressEmailInputRef}
                  />
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address_fname"
                      name="shipping_address_fname"
                      type="text"
                      placeholder="Enter first name."
                      onChange={shippingAddressFirstNameChangedHandler}
                      onBlur={shippingAddressFirstNameBlurHandler}
                      value={enteredShippingAddressFirstName}
                      inputHasError={shippingAddressFirstNameInputHasError}
                      autoComplete="first-name"
                      label={"First name"}
                      required={true}
                      errorMessage={"First name is required."}
                      innerRef={shippingAddressFirstNameInputRef}
                    />
                    <LabelInput
                      id="shipping_address_lname"
                      name="shipping_address_lname"
                      type="text"
                      placeholder="Enter last name."
                      onChange={shippingAddressLastNameChangedHandler}
                      onBlur={shippingAddressLastNameBlurHandler}
                      value={enteredShippingAddressLastName}
                      inputHasError={shippingAddressLastNameInputHasError}
                      autoComplete="last-name"
                      label={"Last name"}
                      required={true}
                      errorMessage={"Last name is required."}
                      innerRef={shippingAddressLastNameInputRef}
                    />
                  </div>
                  <LabelInput
                    id="shipping_address_apartment_suite_unit"
                    name="shipping_address_apartment_suite_unit"
                    type="text"
                    placeholder=" "
                    onChange={shippingAddressApartmentSuiteUnitChangedHandler}
                    onBlur={shippingAddressApartmentSuiteUnitBlurHandler}
                    value={enteredShippingAddressApartmentSuiteUnit}
                    inputHasError={
                      shippingAddressApartmentSuiteUnitInputHasError
                    }
                    autoComplete="address-line2"
                    label={"Apartments, suite, etc."}
                    innerRef={shippingAddressApartmentSuiteUnitInputRef}
                  />
                  <LabelInput
                    id="shipping_address_street_address"
                    name="shipping_address_street_address"
                    type="text"
                    placeholder="Enter address."
                    onChange={shippingAddressStreetAddressChangedHandler}
                    onBlur={shippingAddressStreetAddressBlurHandler}
                    value={enteredShippingAddressStreetAddress}
                    inputHasError={shippingAddressStreetAddressInputHasError}
                    autoComplete="address-line1"
                    label={"Street address"}
                    required={true}
                    errorMessage={"Street address is required."}
                    innerRef={shippingAddressStreetAddressInputRef}
                  />

                  <div className="grid grid-cols-[122px_1fr] gap-x-2">
                    <LabelInput
                      id="shipping_address_pincode"
                      name="shipping_address_pincode"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressPincodeChangedHandler}
                      onBlur={shippingAddressPincodeBlurHandler}
                      value={enteredShippingAddressPincode}
                      inputHasError={shippingAddressPincodeInputHasError}
                      autoComplete="pincode"
                      label={"Pincode"}
                      required={true}
                      pattern="[0-9]*" // Only allow numbers (digits 0-9)
                      errorMessage={"Pincode is required."}
                      innerRef={shippingAddressPincodeInputRef}
                    />
                    <LabelInput
                      id="shipping_address_city"
                      name="shipping_address_city"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressCityChangedHandler}
                      onBlur={shippingAddressCityBlurHandler}
                      value={enteredShippingAddressCity}
                      inputHasError={
                        shippingAddressCityInputHasError ||
                        shippingAddressPincodeInputHasError
                      }
                      autoComplete="address-city"
                      label={"City"}
                      // readOnly={true}
                      required={true}
                      errorMessage={"City is required."}
                      innerRef={shippingAddressCityInputRef}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address_state"
                      name="shipping_address_state"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressStateChangedHandler}
                      onBlur={shippingAddressStateBlurHandler}
                      value={enteredShippingAddressState}
                      inputHasError={
                        shippingAddressStateInputHasError ||
                        shippingAddressPincodeInputHasError
                      }
                      autoComplete="address-state"
                      label={"State"}
                      // readOnly={true}
                      required={true}
                      errorMessage={"State is required."}
                      innerRef={shippingAddressStateInputRef}
                    />
                    <LabelInput
                      id="shipping_address_country"
                      name="shipping_address_country"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressCountryChangedHandler}
                      onBlur={shippingAddressCountryBlurHandler}
                      value={enteredShippingAddressCountry}
                      inputHasError={
                        shippingAddressCountryInputHasError ||
                        shippingAddressPincodeInputHasError
                      }
                      autoComplete="address-country"
                      label={"Country"}
                      // readOnly={true}
                      required={true}
                      errorMessage={"Country is required."}
                      innerRef={shippingAddressCountryInputRef}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <LabelInput
                      id="shipping_address_receiver_mobile"
                      name="shipping_address_receiver_mobile"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressReceiverMobileChangedHandler}
                      onBlur={shippingAddressReceiverMobileBlurHandler}
                      value={enteredShippingAddressReceiverMobile}
                      inputHasError={shippingAddressReceiverMobileInputHasError}
                      autoComplete="tel"
                      label={"Receiver Mobile"}
                      required={true}
                      pattern="[0-9]*" // Only allow numbers (digits 0-9)
                      maxLength={10} // Optionally, you can set a maximum length for the input
                      errorMessage={"Receiver mobile is required."}
                      innerRef={shippingAddressReceiverMobileInputRef}
                    />
                    <LabelInput
                      id="shipping_address_alternative_mobile"
                      name="shipping_address_alternative_mobile"
                      type="text"
                      placeholder=" "
                      onChange={shippingAddressAlternativeMobileChangedHandler}
                      onBlur={shippingAddressAlternativeMobileBlurHandler}
                      value={enteredShippingAddressAlternativeMobile}
                      inputHasError={
                        shippingAddressAlternativeMobileInputHasError
                      }
                      autoComplete="tel"
                      label={"Alternative Mobile"}
                      required={true}
                      pattern="[0-9]*" // Only allow numbers (digits 0-9)
                      maxLength={10} // Optionally, you can set a maximum length for the input
                      errorMessage={"Alternative mobile is required."}
                      innerRef={shippingAddressAlternativeMobileInputRef}
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
                      <div className="grid grid-cols-2 gap-x-2">
                        <LabelInput
                          id="billing_address_fname"
                          name="billing_address_fname"
                          type="text"
                          placeholder="Enter first name."
                          onChange={billingAddressFirstNameChangedHandler}
                          onBlur={billingAddressFirstNameBlurHandler}
                          value={enteredBillingAddressFirstName}
                          inputHasError={billingAddressFirstNameInputHasError}
                          autoComplete="first-name"
                          label={"First name"}
                          required={true}
                          errorMessage={"First name is required."}
                          innerRef={billingAddressFirstNameInputRef}
                        />
                        <LabelInput
                          id="billing_address_lname"
                          name="billing_address_lname"
                          type="text"
                          placeholder="Enter last name."
                          onChange={billingAddressLastNameChangedHandler}
                          onBlur={billingAddressLastNameBlurHandler}
                          value={enteredBillingAddressLastName}
                          inputHasError={billingAddressLastNameInputHasError}
                          autoComplete="last-name"
                          label={"Last name"}
                          required={true}
                          errorMessage={"Last name is required."}
                          innerRef={billingAddressLastNameInputRef}
                        />
                      </div>
                      <LabelInput
                        id="billing_address_apartment_suite_unit"
                        name="billing_address_apartment_suite_unit"
                        type="text"
                        placeholder=" "
                        onChange={
                          billingAddressApartmentSuiteUnitChangedHandler
                        }
                        onBlur={billingAddressApartmentSuiteUnitBlurHandler}
                        value={enteredBillingAddressApartmentSuiteUnit}
                        inputHasError={
                          billingAddressApartmentSuiteUnitInputHasError
                        }
                        autoComplete="address-line2"
                        label={"Apartments, suite, etc."}
                        errorMessage={"Apartments, suite, etc. is required."}
                        innerRef={billingAddressApartmentSuiteUnitInputRef}
                      />
                      <LabelInput
                        id="billing_address_street_address"
                        name="billing_address_street_address"
                        type="text"
                        placeholder="Enter address."
                        onChange={billingAddressStreetAddressChangedHandler}
                        onBlur={billingAddressStreetAddressBlurHandler}
                        value={enteredBillingAddressStreetAddress}
                        inputHasError={billingAddressStreetAddressInputHasError}
                        autoComplete="address-line1"
                        label={"Street Address"}
                        required={true}
                        errorMessage={"Street address is required."}
                        innerRef={billingAddressStreetAddressInputRef}
                      />

                      <div className="grid grid-cols-[122px_1fr] gap-x-2">
                        <LabelInput
                          id="billing_address_pincode"
                          name="billing_address_pincode"
                          type="text"
                          placeholder=" "
                          onChange={billingAddressPincodeChangedHandler}
                          onBlur={billingAddressPincodeBlurHandler}
                          value={enteredBillingAddressPincode}
                          inputHasError={billingAddressPincodeInputHasError}
                          autoComplete="pincode"
                          label={"Pincode"}
                          pattern="[0-9]*" // Only allow numbers (digits 0-9)
                          required={true}
                          errorMessage={"Pincode is required."}
                          innerRef={billingAddressPincodeInputRef}
                        />
                        <LabelInput
                          id="billing_address_city"
                          name="billing_address_city"
                          type="text"
                          placeholder=" "
                          onChange={billingAddressCityChangedHandler}
                          onBlur={billingAddressCityBlurHandler}
                          value={enteredBillingAddressCity}
                          inputHasError={
                            billingAddressCityInputHasError ||
                            billingAddressPincodeInputHasError
                          }
                          autoComplete="address-city"
                          label={"City"}
                          // readOnly={true}
                          required={true}
                          errorMessage={"City is required."}
                          innerRef={billingAddressCityInputRef}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-x-2">
                        <LabelInput
                          id="billing_address_state"
                          name="billing_address_state"
                          type="text"
                          placeholder=" "
                          onChange={billingAddressStateChangedHandler}
                          onBlur={billingAddressStateBlurHandler}
                          value={enteredBillingAddressState}
                          inputHasError={
                            billingAddressStateInputHasError ||
                            billingAddressPincodeInputHasError
                          }
                          autoComplete="address-state"
                          label={"State"}
                          // readOnly={true}
                          required={true}
                          errorMessage={"State is required."}
                          innerRef={billingAddressStateInputRef}
                        />
                        <LabelInput
                          id="billing_address_country"
                          name="billing_address_country"
                          type="text"
                          placeholder=" "
                          onChange={billingAddressCountryChangedHandler}
                          onBlur={billingAddressCountryBlurHandler}
                          value={enteredBillingAddressCountry}
                          inputHasError={
                            billingAddressCountryInputHasError ||
                            billingAddressPincodeInputHasError
                          }
                          autoComplete="address-country"
                          label={"Country"}
                          // readOnly={true}
                          required={true}
                          errorMessage={"Country is required."}
                          innerRef={billingAddressCountryInputRef}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-x-2">
                        <LabelInput
                          id="billing_address_receiver_mobile"
                          name="billing_address_receiver_mobile"
                          type="text"
                          placeholder=" "
                          onChange={billingAddressReceiverMobileChangedHandler}
                          onBlur={billingAddressReceiverMobileBlurHandler}
                          value={enteredBillingAddressReceiverMobile}
                          inputHasError={
                            billingAddressReceiverMobileInputHasError
                          }
                          autoComplete="tel"
                          label={"Receiver Mobile"}
                          required={true}
                          pattern="[0-9]*" // Only allow numbers (digits 0-9)
                          maxLength={10} // Optionally, you can set a maximum length for the input
                          errorMessage={"Receiver mobile is required."}
                          innerRef={billingAddressReceiverMobileInputRef}
                        />
                        <LabelInput
                          id="billing_address_alternative_mobile"
                          name="billing_address_alternative_mobile"
                          type="text"
                          placeholder=" "
                          onChange={
                            billingAddressAlternativeMobileChangedHandler
                          }
                          onBlur={billingAddressAlternativeMobileBlurHandler}
                          value={enteredBillingAddressAlternativeMobile}
                          inputHasError={
                            billingAddressAlternativeMobileInputHasError
                          }
                          autoComplete="tel"
                          label={"Alternative Mobile"}
                          required={true}
                          pattern="[0-9]*" // Only allow numbers (digits 0-9)
                          maxLength={10} // Optionally, you can set a maximum length for the input
                          errorMessage={"Alternative mobile is required."}
                          innerRef={billingAddressAlternativeMobileInputRef}
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
              <div className="p-5 my-5 bg-gray-50 rounded-none">
                <div className="  text-[28px] font-semibold ">
                  Order summary
                </div>
                {cartItems.map((item) => (
                  <CheckoutItem key={item.product_id} data={item} />
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
                  <Button
                    variant="slim"
                    className="h-[54px]"
                    onClick={formCheckoutHandler}
                    // isLoading={isLoading}
                  >
                    CHECKOUT
                  </Button>
                </div>
                {/* BUTTON END */}
              </div>

              <div className="p-5 my-5 bg-gray-50 rounded-none">
                <div className="w-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-base-semi font-medium ">
                      Coupon Discount
                    </h3>
                  </div>
                  <div className="text-small-regular">
                    <form className="w-full">
                      <div className="grid grid-cols-[1fr_80px] gap-x-2 ">
                        <LabelInput
                          id="shipping_address.phone"
                          name="shipping_address.phone"
                          type="text"
                          placeholder=" "
                          onChange={null}
                          onBlur={null}
                          value={""}
                          autoComplete="tel"
                          inputHasError={null}
                          label={"Code"}
                          className={"bg-white"}
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
                        autoComplete="country"
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
