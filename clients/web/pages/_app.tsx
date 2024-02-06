import "../styles/globals.css";
import type { AppProps } from "next/app";

import { UPWARDLI_WEB_CONTEXT } from "@upwardli/shared/env";

import { ChakraProvider } from "@chakra-ui/react";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";

function App({ Component, pageProps }: AppProps) {
  // @ts-ignore: UPWARDLI_WEB_CONTEXT is static in the container
  if (UPWARDLI_WEB_CONTEXT === "embedded") {
    return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </ChakraProvider>
  );
}
export default App;
