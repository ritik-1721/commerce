import ProtectedRoute from "@/middleware/ProtectedRoute";
import Button from "@/components/ui/Button";
import useInput from "@/hooks/use-input";
import { isEmail, isNotEmpty } from "@/hooks/use-validate";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUserApi } from "@/utils/service";
import { useRouter } from "next/router";
import { authActions } from "@/store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LabelInput from "@/components/ui/LabelInput";
import ProfileSidebarMenu from "@/components/common/ProfileSidebarMenu";

export default function EditPage() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  useEffect(() => {
    firstNameChangedHandler({ target: { value: userDetails?.fname } });
    lastNameChangedHandler({ target: { value: userDetails?.lname } });
    emailChangedHandler({ target: { value: userDetails?.email } });
  }, [
    userDetails,
    firstNameChangedHandler,
    lastNameChangedHandler,
    emailChangedHandler,
  ]);

  useEffect(() => {
    setFormIsValid(
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid
    );
  }, [enteredFirstNameIsValid, enteredLastNameIsValid, enteredEmailIsValid]);

  const formSubmissionHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();
      setErrorMessage("");
      const userId = userDetails?.user_id;
      setIsLoading(true);
     
      if (!formIsValid) {
        setErrorMessage(
          "A first name, last name and email  are required to edit."
        );
        setIsLoading(false);
        firstNameBlurHandler();
        lastNameBlurHandler();
        emailBlurHandler();
        return false;
      }
      if ( !userId || Number(userId) <= 0 ) {
        setErrorMessage("Your session has expired. Please log in again.");
        setIsLoading(false);
        return false;
      }
      const formData = new FormData();
      formData.set("fname", enteredFirstName);
      formData.set("lname", enteredLastName);
      formData.set("email", enteredEmail);

      try {
        const req = await updateUserApi(userId, formData);
        const data = await req.json();
        if (data.ok === false) {
          setErrorMessage(data.message);
        } else {
          toast.success(data.message);
          setErrorMessage("");
          dispatch(
            authActions.logIn({
              ...userDetails,
              fname: enteredFirstName,
              lname: enteredLastName,
              email: enteredEmail,
            })
          );
        }
      } catch (error) {
        setErrorMessage("Something went wrong.");
      }
      setIsLoading(false);
    },
    [
      dispatch,
      userDetails,
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      formIsValid,
      firstNameBlurHandler,
      lastNameBlurHandler,
      emailBlurHandler,
    ]
  );

  return (
    <ProtectedRoute>
      {/* <!-- component --> */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ProfileSidebarMenu activeLink={"/edit"} />
        </div>
        <div className="lg:col-span-3 px-3  md:px-28">
          <div className="flex-[3] ">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <h2>Edit Details</h2>
              </div>
              <div className="px-8 pb-8">
                {" "}
                <form onSubmit={formSubmissionHandler}>
                  <div className="grid grid-cols-1 gap-y-2">
                    {errorMessage && (
                      <div
                        className="text-red-700 border border-red-700 p-3"
                        dangerouslySetInnerHTML={{
                          __html: errorMessage,
                        }}
                      ></div>
                    )}

                    <LabelInput
                      id="shipping_address_apartment_suite_unit"
                      name="shipping_address_apartment_suite_unit"
                      type="text"
                      placeholder="First Name"
                      onChange={firstNameChangedHandler}
                      onBlur={firstNameBlurHandler}
                      value={enteredFirstName}
                      inputHasError={firstNameInputHasError}
                      autoComplete="address-line2"
                      label={"First Name"}
                      errorMessage={"Street first name is required."}
                      // innerRef={shippingAddressApartmentSuiteUnitInputRef}
                    />
                    <LabelInput
                      id="shipping_address_email"
                      name="shipping_address_email"
                      type="text"
                      placeholder="Last Name"
                      // autoComplete="lname"
                      label={"Last Name"}
                      required={true}
                      onChange={lastNameChangedHandler}
                      onBlur={lastNameBlurHandler}
                      value={enteredLastName}
                      errorMessage={"Street last name is required."}
                      inputHasError={lastNameInputHasError}
                      // innerRef={shippingAddressEmailInputRef}
                    />
                    <LabelInput
                      id="shipping_address_street_address"
                      name="shipping_address_street_address"
                      type="email"
                      placeholder="Email."
                      onChange={emailChangedHandler}
                      onBlur={emailBlurHandler}
                      value={enteredEmail}
                      inputHasError={emailInputHasError}
                      autoComplete="address-line1"
                      label={"Email"}
                      required={true}
                      errorMessage={"Street email is required."}
                      // innerRef={shippingAddressStreetAddressInputRef}
                    />

                    <Button className="h-[54px]" isLoading={isLoading}>
                      SAVE DETAILS
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ProtectedRoute>
  );
}
