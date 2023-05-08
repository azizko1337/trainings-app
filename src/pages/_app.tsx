import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import GlobalStyle from "../styles/GlobalStyle";
import Theme from "../styles/Theme";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>  
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </>
  );
}
