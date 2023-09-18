import { BrandLogoIcon } from "@/components/icons";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import useInput from "@/hooks/use-input";
import { isEmail, isPassword } from "@/hooks/use-validate";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { loginUser } from "@/utils/service";
// import { loginUser as loginUserThunk } from "@/store/thunks/authThunk";
import { loginUser as loginUserThunk } from "../../../store/thunks/authThunk";
import { useDispatch } from "react-redux";
import { setAuthenticationData } from "@/utils/auth";

function makeQueryClient() {
  const fetchMap = new Map();
  return function queryClient(name, query) {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name);
  };
}

const queryClient = makeQueryClient();

const LoginView = ({ onClose, onAuthViewChange }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isPassword);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(enteredEmailIsValid && enteredPasswordIsValid);
  }, [enteredEmailIsValid, enteredPasswordIsValid]);

  const formSubmissionHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();

      setIsLoading(true);

      if (!formIsValid) {
        setErrorMessage(
          "Cannot find an account that matches the provided credentials."
        );
        setIsLoading(false);
        emailBlurHandler();
        passwordBlurHandler();
        return false;
      }

      const formData = new FormData();
      formData.set("email", enteredEmail);
      formData.set("password", enteredPassword);

      try {
        // const req = await queryClient("pokemon", () => loginApi(formData));
        const req = await loginUser(formData);
        if (req.ok === true) {
          const data = await req.json();

          if (data.ok === false) {
            setErrorMessage(data.message);
          } else {
            dispatch(loginUserThunk(data));
            setAuthenticationData(data.token, data.result);
            toast.success(data.message);
            setErrorMessage("");
            resetEmailInput();
            resetPasswordInput();
            onClose();
            router.reload()
          }
        } else {
          setErrorMessage("Something went wrong.");
        }
      } catch (error) {
        setErrorMessage("Something went wrong.");
      }

      setIsLoading(false);
    },
    [
      enteredEmail,
      dispatch,
      enteredPassword,
      formIsValid,
      emailBlurHandler,
      passwordBlurHandler,
      resetEmailInput,
      resetPasswordInput,
      onClose,
    ]
  );

  return (
    <form
      className="w-80 flex flex-col justify-between p-3"
      onSubmit={formSubmissionHandler}
    >
      <div className="flex justify-center pb-12">
        <BrandLogoIcon width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {errorMessage && (
          <div className="text-red-700 border border-red-700 p-3">
            {errorMessage}. Did you{" "}
            <a
              className="text-slate-900 inline font-bold hover:underline cursor-pointer"
              onClick={() => onAuthViewChange("FORGOT_VIEW")}
            >
              forgot your password?
            </a>
          </div>
        )}

        <Input
          type="email"
          placeholder="Email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          inputHasError={emailInputHasError}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          inputHasError={passwordInputHasError}
        />

        <Button variant="slim" type="submit" isLoading={isLoading}>
          Log In
        </Button>

        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Don&apos;t have an account?</span>{" "}
          <a
            className="text-slate-900 font-bold hover:underline cursor-pointer"
            onClick={() => onAuthViewChange("SIGNUP_VIEW")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
