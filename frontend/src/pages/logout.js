import { logoutUser } from "@/store/thunks/authThunk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LogOut() {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  const router = useRouter();
  useEffect(() => {  router.push(`/`); });
}
