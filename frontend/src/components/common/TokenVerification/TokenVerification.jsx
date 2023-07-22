import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
// import { loginUser, logoutUser } from "@/store/thunks/authThunk";
import { loginUser, logoutUser } from "../../../store/thunks/authThunk";
import { verifyTokenRequest } from "@/utils/service";
import { retrieveAuthToken } from "@/utils/auth";

const TokenVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const validateTokenFromAPI = useCallback(async () => {
    try {
      const tokenFromCookies = retrieveAuthToken();
      let expirationDate = null;
      if (tokenFromCookies) {
        const req = await verifyTokenRequest();
        const data = await req.json();

        if (data.ok === false) {
          dispatch(logoutUser());
        } else {
          const now = new Date();
          const exp = new Date(data.tokenData.exp);
          const duration = now.getTime() - exp.getTime();

          if (duration < 0) {
            dispatch(logoutUser());
          } else {
            expirationDate = duration;
            console.log(expirationDate);
            // setLogoutTimer(expirationDate);
            dispatch(
              loginUser({ result: data.tokenData, token: tokenFromCookies })
            );
          }
        }
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      dispatch(logoutUser());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    validateTokenFromAPI();
  }, [validateTokenFromAPI]);

  const setLogoutTimer = useCallback(
    (expirationDate) => {
      const currentTime = Date.now();
      const timeRemaining = new Date(expirationDate).getTime() - currentTime;

      const logoutTimer = setTimeout(() => {
        dispatch(logoutUser());
      }, timeRemaining);

      return () => {
        clearTimeout(logoutTimer);
      };
    },
    [dispatch]
  );

  return <div>{isLoading && <LoadingSpinner />}</div>;
};

export default TokenVerification;
