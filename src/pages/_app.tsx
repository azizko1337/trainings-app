import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import Theme from "../styles/Theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThemeProvider theme={Theme}>
    <Component {...pageProps} />
  </ThemeProvider>
  );
}
