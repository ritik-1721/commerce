import React, { useState } from "react";
import clsx from "clsx";
// const LabelInput = ({
//   inputHasError,
//   type,
//   placeholder,
//   name,
//   label,
//   required,
//   ...props
// }) => {
//   return (
//     <div>
//       <div className="relative z-0 w-full text-base-regular">
//         <input
//           type={type}
//           name={name}
//           placeholder={""}
//           className={
//             "pt-4 pb-1 block w-full px-4 mt-0 bg-transparent border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200" +
//               inputHasError && "border-rose-500 focus:border-rose-500"
//           }
//           {...props}
//         />
//         <label
//           htmlFor={name}
//           className={
//             "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500" +
//             inputHasError && "!text-rose-500"
//           }
//         >
//           {label}
//           {required && <span className="text-rose-500">*</span>}
//         </label>
//       </div>
//       {inputHasError && (
//         <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
//           <span>{inputHasError}</span>
//         </div>
//       )}
//     </div>
//   );
// };

const LabelInput = ({
  label,
  errors,
  touched,
  name,
  type,
  required,
  props,
}) => {
  const hasError = errors;
  const [inputType, setInputType] = useState(type);
  return (
    <div>
      {" "}
      <div className="relative z-0 w-full text-base-regular" data-te-input-wrapper-init>
        <input
          type={inputType}
          name={name}
          placeholder=" "
          className={clsx(
            "pt-4 pb-1 block w-full px-4 mt-0 bg-transparent border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200",
            {
              "border-rose-500 focus:border-rose-500": hasError,
            }
          )}
          {...props}
        />
        <label
          for="exampleFormControlInputText"
          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {label}
        </label>
        {/* <label
          htmlFor={name}
          className={clsx(
            "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500",
            {
              "!text-rose-500": hasError,
            }
          )}
        >
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label> */}
      </div>
    </div>
  );
};
export default LabelInput;

// import { ErrorMessage } from "@hookform/error-message"
// import Eye from "@modules/common/icons/eye"
// import EyeOff from "@modules/common/icons/eye-off"
// import clsx from "clsx"
// import React, { useEffect, useImperativeHandle, useState } from "react"
// import { get } from "react-hook-form"

// type InputProps = Omit<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   "placeholder"
// > & {
//   label: string
//   errors?: Record<string, unknown>
//   touched?: Record<string, unknown>
//   name: string
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ type, name, label, errors, touched, required, ...props }, ref) => {
//     const inputRef = React.useRef<HTMLInputElement>(null)
//     const [showPassword, setShowPassword] = useState(false)
//     const [inputType, setInputType] = useState(type)

//     useEffect(() => {
//       if (type === "password" && showPassword) {
//         setInputType("text")
//       }

//       if (type === "password" && !showPassword) {
//         setInputType("password")
//       }
//     }, [type, showPassword])

//     useImperativeHandle(ref, () => inputRef.current!)

//     const hasError = get(errors, name) && get(touched, name)

//     return (
//       <div>
//         <div className="relative z-0 w-full text-base-regular">
//           <input
//             type={inputType}
//             name={name}
//             placeholder=" "
//             className={clsx(
//               "pt-4 pb-1 block w-full px-4 mt-0 bg-transparent border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200",
//               {
//                 "border-rose-500 focus:border-rose-500": hasError,
//               }
//             )}
//             {...props}
//             ref={inputRef}
//           />
//           <label
//             htmlFor={name}
//             onClick={() => inputRef.current?.focus()}
//             className={clsx(
//               "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500",
//               {
//                 "!text-rose-500": hasError,
//               }
//             )}
//           >
//             {label}
//             {required && <span className="text-rose-500">*</span>}
//           </label>
//           {type === "password" && (
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="text-gray-400 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
//             >
//               {showPassword ? <Eye /> : <EyeOff />}
//             </button>
//           )}
//         </div>
//         {hasError && (
//           <ErrorMessage
//             errors={errors}
//             name={name}
//             render={({ message }) => {
//               return (
//                 <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
//                   <span>{message}</span>
//                 </div>
//               )
//             }}
//           />
//         )}
//       </div>
//     )
//   }
// )

// Input.displayName = "Input"

// export default Input

//   const [showPassword, setShowPassword] = useState(false);
//   const [inputType, setInputType] = useState(props.type);
//   useEffect(() => {
//     if (type === "password" && showPassword) {
//       setInputType("text");
//     }
//     if (type === "password" && !showPassword) {
//       setInputType("password");
//     }
//   }, [type, showPassword]);
//   return (
//     <div>
//       <div className="relative z-0 w-full text-base-regular">
//         <input
//           type={inputType}
//           name={name}
//           placeholder=" "
//           className={
//             "pt-4 pb-1 block w-full px-4 mt-0 bg-transparent border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200" +
//               hasError && "border-rose-500 focus:border-rose-500"
//           }
//           {...props}
//           // ref={inputRef}
//         />
//         <label
//           htmlFor={name}
//           // onClick={() => inputRef.current?.focus()}
//           className={
//             "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500" +
//               hasError && "!text-rose-500"
//           }
//         >
//           {label}
//           {required && <span className="text-rose-500">*</span>}
//         </label>
//         {/* {type === "password" && (
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="text-gray-400 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
//           >
//             {showPassword ? <Eye /> : <EyeOff />}
//           </button>
//         )} */}
//       </div>
//       {props.inputHasError && ( <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular"> <span>{props.inputHasError}</span> </div> ) }
//     </div>
//   );
