import React from "react";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
      <span className="font-medium text-gray-800 hover:text-gray-500">
        {initials}
      </span>
  );
}

export default Avatar;
