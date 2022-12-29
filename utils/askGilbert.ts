import {message} from "./firebase"

export default async function askGilbert(chatGilbert: message[], userName: string) {
  const response = await fetch("/api/askOpenAi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({promptOpenAi: formatGilbertPrompt(chatGilbert, userName),
    userName: userName}),
  });
  const data = await response.json();
  return data.result;
}

const formatGilbertPrompt = (chatGilbert: message[], userName:string) => {
  const intro = `The following is a conversation between ${userName} and Gilbert. 
  Gilbert is helpful, creative, clever, and very friendly. 
  Gilbert try to convince people to hire Valentin as a front-end developer for a tech company. 
  Valentin is passionate about functional programming and web technologies in general, he loves React and Next js.\n
  \n`;

  const body = chatGilbert
    .map((msg: { authorId: string; text: string; }) => {
      if (msg.authorId === "Gilbert") return `Gilbert:` + msg.text;
      else return `${userName}: ` + msg.text;
    })
    .join("\n");
  const outro = "\nGilbert:";

  return intro + body + outro;
};
