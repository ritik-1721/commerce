import ProtectedRoute from "@/middleware/ProtectedRoute";
import Button from "@/components/ui/Button";
import useInput from "@/hooks/use-input";
import { isPassword } from "@/hooks/use-validate";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { changePasswordApi, updateUserApi } from "@/utils/service";
import { useSelector } from "react-redux";
import LabelInput from "@/components/ui/LabelInput";
import ProfileSidebarMenu from "@/components/common/ProfileSidebarMenu";

export default function ChangePasswordPage() {
  const userDetails = useSelector((state) => state.auth.userDetails);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredOldPassword,
    isValid: enteredOldPasswordIsValid,
    hasError: oldPasswordInputHasError,
    valueChangeHandler: oldPasswordChangedHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPasswordInput,
  } = useInput(isPassword);

  const checkNewPassword = (password) => {
    return password && password !== enteredOldPassword;
  };

  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangedHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPasswordInput,
  } = useInput(checkNewPassword);

  const checkReTypeNewPassword = (password) => {
    return password && password === enteredNewPassword;
  };
  const {
    value: enteredReTypeNewPassword,
    isValid: enteredReTypeNewPasswordIsValid,
    hasError: reTypeNewPasswordInputHasError,
    valueChangeHandler: reTypeNewPasswordChangedHandler,
    inputBlurHandler: reTypeNewPasswordBlurHandler,
    reset: resetReTypeNewPasswordInput,
  } = useInput(checkReTypeNewPassword);

  useEffect(() => {
    setFormIsValid(
      enteredOldPasswordIsValid &&
        enteredNewPasswordIsValid &&
        enteredReTypeNewPasswordIsValid
    );
  }, [
    enteredOldPasswordIsValid,
    enteredNewPasswordIsValid,
    enteredReTypeNewPasswordIsValid,
  ]);

  const formSubmissionHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();
      setErrorMessage("");
      const userId = userDetails?.user_id;
      setIsLoading(true);

      if (!formIsValid) {
        setErrorMessage(
          "A old password, new password and re-type old password  are required to edit."
        );
        setIsLoading(false);
        oldPasswordBlurHandler();
        newPasswordBlurHandler();
        reTypeNewPasswordBlurHandler();
        return false;
      }
      if (!userId || Number(userId) <= 0) {
        setErrorMessage("Your session has expired. Please log in again.");
        setIsLoading(false);
        return false;
      }
     const formData = new FormData();
      formData.set("oldPassword", enteredOldPassword);
      formData.set("newPassword", enteredNewPassword);
      formData.set("ReTypeNewPassword", enteredReTypeNewPassword);
      formData.set("userId", userId);

      try {
        const req = await changePasswordApi(formData);
        const data = await req.json();
        if (data.ok === false) {
          setErrorMessage(data.message);
        } else {
          toast.success(data.message);
          setErrorMessage("");
          resetNewPasswordInput();
          resetOldPasswordInput();
          resetReTypeNewPasswordInput();
        }
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Something went wrong.");
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [
      resetNewPasswordInput,
      resetOldPasswordInput,
      resetReTypeNewPasswordInput,
      userDetails,
      enteredOldPassword,
      enteredNewPassword,
      enteredReTypeNewPassword,
      formIsValid,
      oldPasswordBlurHandler,
      newPasswordBlurHandler,
      reTypeNewPasswordBlurHandler,
    ]
  );

  return (
    <ProtectedRoute>
      {/* <!-- component --> */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ProfileSidebarMenu activeLink={"/change-password"} />
        </div>
        <div className="lg:col-span-3 px-3  md:px-28">
          <div className="flex-[3] ">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <h2>Change Password</h2>
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
                      placeholder="Old Password"
                      onChange={oldPasswordChangedHandler}
                      onBlur={oldPasswordBlurHandler}
                      value={enteredOldPassword}
                      inputHasError={oldPasswordInputHasError}
                      autoComplete="address-line2"
                      label={"Old Password"}
                      required={true}
                      errorMessage={"old password address is required."}
                    />
                    <LabelInput
                      id="shipping_address_ReTypeNewPassword"
                      name="shipping_address_ReTypeNewPassword"
                      type="text"
                      placeholder="New Password"
                      label={"New Password"}
                      required={true}
                      onChange={newPasswordChangedHandler}
                      onBlur={newPasswordBlurHandler}
                      value={enteredNewPassword}
                      inputHasError={newPasswordInputHasError}
                      errorMessage={"new password address is required."}
                    />
                    <LabelInput
                      id="shipping_address_street_address"
                      name="shipping_address_street_address"
                      type="text"
                      placeholder="Re-type New Password"
                      onChange={reTypeNewPasswordChangedHandler}
                      onBlur={reTypeNewPasswordBlurHandler}
                      value={enteredReTypeNewPassword}
                      inputHasError={reTypeNewPasswordInputHasError}
                      autoComplete="address-line1"
                      label={"Re-type New Password"}
                      required={true}
                      errorMessage={"re-type new password address is required."}
                    />

                    <Button className="h-[54px]" isLoading={isLoading}>
                      SUBMIT
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
