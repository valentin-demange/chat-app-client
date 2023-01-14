import styles from "./styles.module.css";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext, ChatContext, SocketContext } from "utils/context";
import { askGilbert, checkGilbert } from "utils/gilbert";

export default function ChatFooter() {
  const [textMessage, setTextMessage] = useState("");
  const chatId = useContext(ChatContext).currentChatId;
  const currentUser = useContext(UserContext);
  const socket = useContext(SocketContext);


  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTextMessage(e.target.value);
  };

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (textMessage === "") return;
    setTextMessage("");

    await writeMessage(chatId, currentUser.id, textMessage)
    const isGilbert = await checkGilbert(chatId);
    if (isGilbert) {
      const answerGilbert = await askGilbert(chatId, currentUser.firstName as string)
      await writeMessage(chatId, "1", answerGilbert)
    }
  };

  const writeMessage = async (
    chatId: number,
    userId: number,
    textMessage: string
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/messages/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          chatId: chatId,
          userId: userId,
          message: textMessage,
        }),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      const message = await res.json();
      // Emit the 'send message' event with the message and chatId as parameters
      socket.emit('send message', message, chatId);
    } catch (error: any) {
      alert(error.message);
    }
  }


  return (
    <form onSubmit={handleOnSubmit}>
      <Box borderColor="gray.400" className={styles.chatFooter}>
        <Input
          placeholder="Type your message.."
          flex={1}
          onChange={handleInputChange}
          value={textMessage}
        />
        <IconButton
          variant="ghost"
          aria-label="Add Chat"
          isRound={true}
          icon={<ArrowRightIcon />}
          size="md"
          fontSize={14}
          type="submit"
        />
      </Box>
    </form>
  );
}
