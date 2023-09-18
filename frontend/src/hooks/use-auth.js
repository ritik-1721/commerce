import { useRouter } from "next/router";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function useCheckAuthLoader() {
  const router = useRouter();

  const token = getAuthToken();

  if (!token) {
    return router.push("/index"); // return redirect("/auth");
  }
}

// export const verifyToken = (token) => {
//   // fetch to api to verify the token
//   console.log("api");
//   if (Math.floor((Math.random() * 10) % 3) > 0) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const removeToken = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("expiration");
// };

// export const setToken = (token) => {
//   localStorage.setItem("token", token);
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 72);
//   localStorage.setItem("expiration", expiration.toISOString());
// };

// export const getTokenDuration = () => {
//   const storedExpirationDate = localStorage.getItem("expiration");
//   const expirationDate = new Date(storedExpirationDate);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// };

// export const getAuthToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   const tokenDuration = getTokenDuration();
//   return tokenDuration < 0 ? "EXPIRED" : token;
// };
