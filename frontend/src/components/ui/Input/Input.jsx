import React from 'react';

const formControl = `bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border  border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200`;

const formControlInvalid = `bg-primary py-2 px-6 w-full appearance-none transition duration-150 ease-in-out pr-10 border border-red-700 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-red-200`;

const Input = (props) => {
  return (
    <>
      <label>
        <input
          className={props.inputHasError ? formControlInvalid : formControl}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
        />
      </label>
    </>
  );
};

export default Input;
