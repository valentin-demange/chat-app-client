import "@/styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { SocketContext } from "utils/context";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "gray" })
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <SocketContext.Provider value={socket}>
        {/* <ChakraProvider> */}
        <Component {...pageProps} />
      </SocketContext.Provider>
    </ChakraProvider>
  );
}
