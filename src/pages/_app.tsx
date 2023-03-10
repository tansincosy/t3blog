import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/_drawer.scss";
import "bytemd/dist/index.css";
import "~/styles/_markdown-view.scss";
import "~/styles/_select.scss";
import GlobalStyles from "../styles/GlobalStyles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <section className={inter.className}>
        <GlobalStyles />
        <Component {...pageProps} />
      </section>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
