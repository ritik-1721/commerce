import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export const clearAuthenticationData = () => {
  deleteCookie("token");
  deleteCookie("userDetails");
};

export const setAuthenticationData = (token, userDetails) => {
  setCookie("token", token);
  setCookie("userDetails", JSON.stringify(userDetails));
};

export function retrieveAuthToken() {
  const cookies = getCookies();
  return !cookies.token ? null : cookies.token;
}
