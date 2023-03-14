import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/_drawer.scss";
import "bytemd/dist/index.css";
import "~/styles/_markdown-view.scss";
import "~/styles/_select.scss";
import GlobalStyles from "../styles/GlobalStyles";
import { Roboto } from "next/font/google";

const inter = Roboto({ subsets: ["latin"], weight: "500" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <GlobalStyles />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
