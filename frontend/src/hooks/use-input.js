import { useState, useCallback } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = useCallback((event) => {
    let inputValue = event.target.value;
    if (event.target.pattern) {
      if (event.target.pattern === "[0-9]*") {
        inputValue = inputValue.replace(/[^0-9]/g, "");
      }
    }
    if (event.target.maxLength) {
      if (event.target.maxLength > 0) {
        inputValue = inputValue.slice(0, event.target.maxLength);
      }
    }
    setEnteredValue(inputValue);
  }, []);

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue("");
    setIsTouched(false);
  }, []);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
