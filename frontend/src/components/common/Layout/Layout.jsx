import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TokenVerification from "../TokenVerification";
import NextNprogress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Toaster position="top-right" reverseOrder={false} />
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
        options={{ showSpinner: false }}
        // transformCSS={(css) => {
        //   // css is the default css string. You can modify it and return it or return your own css.
        //   return <style>{css}</style>;
        // }}
      />
      <TokenVerification />
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
