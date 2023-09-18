import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../modal/AuthModal";
import NavBar from "./nav/NavBar";
import SideBar from "./nav/SideBar";
import { getSocketWorker } from "@/utils/socketUtility";
import { SetCart } from "@/store/thunks/cartThunk";
import { SetWishlist } from "@/store/thunks/wishlistThunk";

export default function Header() {
  const worker = getSocketWorker();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userDetails?.user_id);
  const fname = useSelector((state) => state.auth.userDetails?.fname);

  useEffect(() => {
    console.log("work");
    // Listen for incoming messages from the worker
    worker.addEventListener("message", (e) => {
      const { type, data } = e.data;
      console.log("type", type, "data", data);
      if (type === "refresh-cart") {
        dispatch(SetCart());
      } else if (type === "refresh-user") {
        // dispatch(SetCart());
      } else if (type === "refresh-wishlist") {
        dispatch(SetWishlist());
      }
    });
  }, [worker, dispatch]);

  const connectUserRoom = useCallback(() => {
    if (!userId) {
      return false;
    }
    // Send a message to the Web Worker/
    worker.postMessage({
      type: "new-user",
      data: { room: userId, name: fname },
    });
  }, [worker, userId, fname]);

  useEffect(() => {
    connectUserRoom();
  }, [userId, connectUserRoom]);

  return (
    <header>
      {/* <button onClick={connectUserRoom}>JOIN</button> */}
      <AuthModal />
      <NavBar />
      <SideBar />
    </header>
  );
}
