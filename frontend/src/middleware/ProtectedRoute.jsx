// components/ProtectedRoute.js
import { retrieveAuthToken } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = retrieveAuthToken();
    if (!token) {
      router.replace("/logout");
    } else {
      setLoading(false); // Move setLoading(false) inside the useEffect
    }
  }, [router]); // Empty dependency array ensures this effect runs only once on mount

  return loading ? <LoadingSpinner /> : children;
};

export default ProtectedRoute;
