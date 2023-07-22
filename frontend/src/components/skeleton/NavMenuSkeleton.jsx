import React from "react";

export default function NavMenuSkeleton({ itemCount }) {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div key={index} className="w-16 h-7 bg-gray-200 animate-pulse mx-2"></div>
  ));

  return <>{skeletonItems}</>;
}
