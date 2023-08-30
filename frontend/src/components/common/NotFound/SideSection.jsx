import React from "react";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";
import { authModalActions } from "@/store/slice/authModalSlice";

const btnClass =
  "text-white bg-gray-900 w-full border border-slate-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-none text-sm font-semibold px-5 py-2.5 mr-2 mb-2";

export default function SideSection(props) {
  const dispatch = useDispatch();

  const handleLoginClick = useCallback(() => {
    dispatch(authModalActions.setActiveView("LOGIN_VIEW"));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="text-5xl font-dark font-bold">{props?.head}</div>
      <p className="text-2xl md:text-2xl font-light leading-normal">
        {props?.pone}
      </p>
      <p className="mb-8 text-sm">{props?.ptwo}</p>

      {props?.loginbtn && (
        <button className={`${btnClass}`} onClick={handleLoginClick}>
          Log In
        </button>
      )}
      {props?.homebtn && (
        <Link href={BASE_URL}>
          <button className={`${btnClass}`}>Back To Homepage</button>
        </Link>
      )}
      {props?.shoppingbtn && (
        <Link href={BASE_URL}>
          <button className={`${btnClass}`}>CONTINUE SHOPPING</button>
        </Link>
      )}
    </React.Fragment>
  );
}
