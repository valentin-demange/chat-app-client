import Head from "next/head";
import Image from "next/image";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Chat App ongoing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <img src="/logo.png" alt="My Chat Logo" /> */}

        <div className={styles.card}>
          <Image
            priority
            src="/logo.png"
            height={200}
            width={200}
            alt="My Chat Logo"
          />
          <br />
          <br />
          <h3>Welcome to Chat App</h3>
          <div><Button className={styles.button} colorScheme='blue' >Log in</Button></div>
          <div><Button className={styles.button} colorScheme='blue' variant='outline'>Sign up</Button></div>
          {/* <Link href="/chats">
            <a>
              <Button colorScheme="blue" variant="solid">
                Sign in with Google
              </Button>
            </a>
          </Link> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/valentin-demange"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#128640; Copyright © 2023 Valentin Demange
        </a>
      </footer>
    </div>
  );
}
