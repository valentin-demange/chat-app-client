import { API_URL, GILBERT_USER_ID } from "utils/constants";
import { Message } from "./types";

export async function askGilbert(chatId: number, userName: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/chats/${chatId}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      const message = await res.text();
      throw new Error([res.statusText, message].join("\n"));
    }
    const messagesList = await res.json();

    const response = await fetch("/api/askOpenAi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promptOpenAi: formatGilbertPrompt(messagesList, userName),
        userName: userName,
      }),
    });
    const data = await response.json();
    return data.result;
  } catch (error: any) {
    alert(error.message);
  }
  return null;
}

const formatGilbertPrompt = (messagesList: any, userName: string) => {
  const intro = `The following is a conversation between ${userName} and Gilbert. 
  Gilbert is helpful, creative, clever, and very friendly. 
  Gilbert try to convince ${userName} to hire Valentin as web developer. 
  Valentin is passionate about functional programming and he loves React.js.\n
  \n`;

  const body = messagesList
    .map((msg: Message) => {
      if (msg.userId === GILBERT_USER_ID) return `Gilbert:` + msg.message;
      else return `${userName}: ` + msg.message;
    })
    .join("\n");
  const outro = "\nGilbert:";

  return intro + body + outro;
};

export async function checkGilbert(chatId: number): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_URL}/api/chats/${chatId.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      const message = await res.text();
      throw new Error([res.statusText, message].join("\n"));
    }
    const chatInfo = await res.json();
    if (
      chatInfo.type == "private" &&
      chatInfo.membersUid.includes(GILBERT_USER_ID)
    )
      return true;
  } catch (error: any) {
    alert(error.message);
  }
  return false;
}

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));