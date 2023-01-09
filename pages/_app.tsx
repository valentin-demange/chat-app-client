import "@/styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { io } from "socket.io-client";

const socket = io('http://localhost:3000', { transports : ['websocket'] });

socket.on('connect', () => {
  console.log('Connected to WebSockets server');
  socket.send('Hello from the client!');
});

socket.on('message', (message: any) => {
  console.log(`Received message: ${message}`);
});

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: 'gray' }))

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
    {/* <ChakraProvider> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
