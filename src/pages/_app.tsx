import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import GlobalStyle from "../styles/GlobalStyle";
import Theme from "../styles/Theme";
import Layout from "@/components/Layout/Layout";
import UserFrontend from "@/types/UserFrontend";
import AuthContext from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserFrontend>(null);
  useEffect(() => {
    console.log("FECZ");
    fetch("/api/auth/user", {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (data.ok) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
    );
  }, []);

  return (
    <>
      <Head>
        <title>Trainings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <AuthContext.Provider value={{ user }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}
