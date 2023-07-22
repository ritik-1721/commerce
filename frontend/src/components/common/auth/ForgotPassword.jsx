import { BrandLogoIcon } from '@/components/icons';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useInput from '@/hooks/use-input';
import { isEmail } from '@/hooks/use-validate';
import { useState,useEffect, useCallback } from 'react';

const ForgotPassword = ({ onClose, onAuthViewChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setFormIsValid(enteredEmailIsValid);
  }, [enteredEmailIsValid]);

  const formSubmissionHandler = useCallback(
    (event) => {
      event.preventDefault();

      setIsLoading(true);

      if (!formIsValid) {
        setErrorMessage(
          'Cannot find an account that matches the provided credentials.'
        );
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      setErrorMessage('');
      console.log('Submitted.');
      console.log(enteredEmail);
      resetEmailInput();
    },
    [formIsValid, enteredEmail, resetEmailInput]
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
          <div className="text-red-700 border border-red-700 p-3">
            {errorMessage}
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
        <div className="pt-2 w-full flex flex-col">
          <Button variant="slim" type="submit" isLoading={isLoading}>
            Recover Password
          </Button>
        </div>

        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Do you have an account?</span> {' '}
          <a
            className="text-slate-900 font-bold hover:underline cursor-pointer"
            onClick={() => onAuthViewChange('LOGIN_VIEW')}
          >
            Log In
          </a>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
