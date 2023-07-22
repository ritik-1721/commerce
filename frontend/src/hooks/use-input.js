import { useState, useCallback } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = useCallback((event) => {
    setEnteredValue(event.target.value);
  }, []);

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue('');
    setIsTouched(false);
  }, []);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
