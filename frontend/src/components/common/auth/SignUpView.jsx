import { BrandLogoIcon } from "@/components/icons";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { InfoIcon } from "@/components/icons";
import useInput from "@/hooks/use-input";
import { isEmail, isPassword, isNotEmpty } from "@/hooks/use-validate";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { registerUser } from "@/utils/service";

const SignUpView = ({ onClose, onAuthViewChange }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    setFormIsValid(
      enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid
    );
  }, [
    enteredFirstNameIsValid,
    enteredLastNameIsValid,
    enteredEmailIsValid,
    enteredPasswordIsValid,
  ]);

  const formSubmissionHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();

      setIsLoading(true);

      if (!formIsValid) {
        setErrorMessage(
          "A first name, last name, email and password are required to signup"
        );
        setIsLoading(false);
        firstNameBlurHandler();
        lastNameBlurHandler();
        emailBlurHandler();
        passwordBlurHandler();
        return false;
      }

      const formData = new FormData();
      formData.set("fname", enteredFirstName);
      formData.set("lname", enteredLastName);
      formData.set("email", enteredEmail);
      formData.set("password", enteredPassword);

      try {
        const req = await registerUser(formData);
        const data = await req.json();

        if (data.ok === false) {
          setErrorMessage(data.message);
        } else {
          toast.success(data.message);
          setErrorMessage("");
          resetFirstNameInput();
          resetLastNameInput();
          resetEmailInput();
          resetPasswordInput();
          onAuthViewChange("LOGIN_VIEW");
        }
      } catch (error) {
        setErrorMessage("Something went wrong.");
      }

      setIsLoading(false);
    },
    [
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      enteredPassword,
      formIsValid,
      firstNameBlurHandler,
      lastNameBlurHandler,
      emailBlurHandler,
      passwordBlurHandler,
      resetFirstNameInput,
      resetLastNameInput,
      resetEmailInput,
      resetPasswordInput,
      onAuthViewChange,
    ]
  );

  return (
    <form
      className="w-80 flex flex-col justify-between p-3"
      onSubmit={formSubmissionHandler}
    >
      <div className="flex justify-center pb-12 ">
        <BrandLogoIcon width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {errorMessage && (
          <div
            className="text-red-700 border border-red-700 p-3"
            dangerouslySetInnerHTML={{
              __html: errorMessage,
            }}
          ></div>
        )}
        <Input
          type="text"
          placeholder="First Name"
          onChange={firstNameChangedHandler}
          onBlur={firstNameBlurHandler}
          value={enteredFirstName}
          inputHasError={firstNameInputHasError}
          errorMessage="first name is required."
        />
        <Input
          type="text"
          placeholder="Last Name"
          onChange={lastNameChangedHandler}
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
          inputHasError={lastNameInputHasError}
          errorMessage="last name is required."
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          inputHasError={emailInputHasError}
          errorMessage="email is required."
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          inputHasError={passwordInputHasError}
          errorMessage="password is required."
        />

        <span className="text-accent-8">
          <span className="inline-block align-middle ">
            <InfoIcon width="15" height="15" />
          </span>{" "}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{" "}
          </span>
        </span>
        <div className="pt-2 w-full flex flex-col">
          <Button variant="slim" type="submit" isLoading={isLoading}>
            Sign Up
          </Button>
        </div>
        <span className="pt-1 text-center text-sm">
          <span className="text-accent-7">Do you have an account?</span>{" "}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => onAuthViewChange("LOGIN_VIEW")}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignUpView;

