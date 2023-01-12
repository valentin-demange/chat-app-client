import "@/styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { SocketContext } from "utils/context";

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "gray" })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
        {/* <ChakraProvider> */}
        <Component {...pageProps} />
    </ChakraProvider>
  );
}
