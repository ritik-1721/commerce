import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { loginUser, logoutUser } from "@/store/thunks/authThunk";
import { verifyTokenRequest } from "@/utils/service";
import { retrieveAuthToken } from "@/utils/auth";
import { useRouter } from "next/router";

const TokenVerification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const setLogoutTimer = useCallback(
    (timeRemaining) => {
      const logoutTimer = setTimeout(() => {
        dispatch(logoutUser());
        router.push("/");
      }, timeRemaining);

      return () => {
        clearTimeout(logoutTimer);
      };
    },
    [dispatch, router]
  );

  const validateTokenFromAPI = useCallback(async () => {
    try {
      const tokenFromCookies = retrieveAuthToken();
      let expirationDate = null;
      if (tokenFromCookies) {
        const req = await verifyTokenRequest();
        const data = await req.json();

        if (data.ok === false) {
          dispatch(logoutUser());
          router.push("/");
        } else {
          const now = Date.now(); // Use Date.now() to get the current time in milliseconds
          const exp = new Date(data.tokenData.exp * 1000); // Convert exp to milliseconds
          const timeRemaining = exp - now;

          if (timeRemaining <= 0) {
            dispatch(logoutUser());
            router.push("/");
          } else {
            expirationDate = exp;
            console.log(expirationDate);
            // Set the logout timer with timeRemaining
            setLogoutTimer(timeRemaining);
            dispatch(
              loginUser({ result: data.tokenData, token: tokenFromCookies })
            );
          }
        }
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      dispatch(logoutUser());
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router, setLogoutTimer]);

  useEffect(() => {
    validateTokenFromAPI();
  }, [validateTokenFromAPI]);

  return <div>{isLoading && <LoadingSpinner />}</div>;
};

export default TokenVerification;
