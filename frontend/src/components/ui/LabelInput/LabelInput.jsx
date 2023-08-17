import React from "react";

const formControl = `peer m-0 block h-[54px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-slate-400 focus:border-slate-900 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-slate-200`;

const formControlInvalid = `peer m-0 block h-[54px]  border-solid bg-transparent bg-clip-padding text-base font-normal leading-tight placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] bg-primary py-2 px-6 w-full appearance-none transition slate-900 duration-150 ease-in-out pr-10 border border-rose-500 focus:border-red-700 text-slate-700 focus:outline-none focus:shadow-outline-normal focus:ring-2 focus:ring-red-200`;

const lableClass = `pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`;
const lableInvalidClass = `pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-rose-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`;

const LabelInput = (props) => {
  const {
    id,
    name,
    inputHasError,
    errorMessage,
    className,
    type,
    placeholder,
    onChange,
    onBlur,
    value,
    readOnly,
    label,
    required,
    innerRef,
    ...other
  } = props;
  return (
    <>
      <div>
        <div className="text-base-regular relative z-0 w-full">
          <input
            id={id}
            name={name}
            className={`${inputHasError ? formControlInvalid : formControl}  ${
              className ? className : ""
            } `}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            readOnly={readOnly}
            disabled={readOnly}
            ref={innerRef}
            {...other}
          />
          <label
            htmlFor={id}
            className={inputHasError ? lableInvalidClass : lableClass}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
        {inputHasError && errorMessage && (
          <div className="pt-1 pl-2 text-rose-500 text-xs">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default LabelInput;
