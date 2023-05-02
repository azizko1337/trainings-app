import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import Theme from "../styles/Theme";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>  
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </>
  );
}
