import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "~/components/ui/toaster";

import "~/styles/globals.css";
import { CodeModal } from "~/components/verification/modal";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${GeistSans.style.fontFamily};
        }
      `}</style>
      <div className={GeistSans.className}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          <CodeModal />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default MyApp;
