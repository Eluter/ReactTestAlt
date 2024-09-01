import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/toaster";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${GeistSans.style.fontFamily};
        }
      `}</style>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </>
  );
};

export default MyApp;
