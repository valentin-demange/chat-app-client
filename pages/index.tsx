import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import LoginMenu from "@/components/Login/main";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>

          <Image
            priority
            src="/logo.png"
            height={130}
            width={130}
            alt="My Chat Logo"
          />
          <br />
          <br />
          <h3>Welcome to Chat App</h3>
          <LoginMenu />

      </div>

      <div className={styles.footer}>
        <a
          href="https://github.com/valentin-demange"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#128640; Copyright © 2023 Valentin Demange
        </a>
      </div>
    </div>
  );
}
