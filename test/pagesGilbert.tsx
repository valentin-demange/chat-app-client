import Head from "next/head";
import { useState } from "react";
import styles from "./test.module.css";


export default function Home() {
  const [gilbertQuestInput, setGilbertQuestInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gilbertQuest: gilbertQuestInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setGilbertQuestInput("");
  }


  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/deux-sucres.png" />
      </Head>

      <main className={styles.main}>
        <img src="/deux-sucres.png" className={styles.icon} width="100px" />
        <h3>Talk with Gilbert</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="gilbertQuest"
            placeholder="Talk to Gilbert"
            value={gilbertQuestInput}
            onChange={(e) => setGilbertQuestInput(e.target.value)}
          />
          <input type="submit" value="Get his response !" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
