import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  const combinedClasses = clsx(inputs);
  return twMerge(combinedClasses);
}
