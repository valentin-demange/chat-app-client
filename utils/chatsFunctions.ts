import { Message } from "./customTypes";

export async function writeMessage(
  chatId: string,
  userId: string,
  message: string
) {
  try {
    const res = await fetch("http://localhost:3000/api/messages/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        chatId: chatId,
        userId: userId,
        message: message,
      }),
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error([res.statusText, message].join("\n"));
    }
  } catch (error: any) {
    alert(error.message);
  }
}

export async function checkGilbert(chatId: string): Promise<Message[]> {
  try {
    const res = await fetch("http://localhost:3000/api/chats/" + chatId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error([res.statusText, message].join("\n"));
    }
    console.log(res);
  } catch (error: any) {
    alert(error.message);
  }
  return []
}
