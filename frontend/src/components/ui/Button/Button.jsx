import React from "react";
import LoadingDots from "../LoadingDots";

const Button = (props) => {
  const { type, isLoading, className, onClick } = props;

  let buttonClass = `text-white bg-gray-900 w-full border border-slate-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-none text-sm font-semibold px-5 py-2.5 mr-2 mb-2`;

  if (isLoading) {
    buttonClass = `text-gray-400 bg-white w-full border border-ring-gray-400 hover:bg-white ring-2 ring-gray-300 rounded-none text-sm font-semibold px-5 py-2.5 mr-2 mb-2 text-accent-4 border-accent-2 bg-accent-1 cursor-not-allowed`;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} ${className ? className : ""}`}
      type={type}
      disabled={isLoading}
    >
      {props.children}
      {isLoading && <LoadingDots />}
    </button>
  );
};

export default Button;
