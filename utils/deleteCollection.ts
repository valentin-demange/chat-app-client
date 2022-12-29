export default async function askGilbert(chatId: string) {
    const response = await fetch("/api/askOpenAi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({chatId: chatId}),
    });
    await response.json();
  }
  