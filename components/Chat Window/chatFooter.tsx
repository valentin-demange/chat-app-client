import styles from "./styles.module.css";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { LoginContext, ChatContext, SocketContext } from "utils/context";
import { askGilbert, checkGilbert, delay } from "utils/gilbert";
import { API_URL, GILBERT_USER_ID } from "utils/constants";

export default function ChatFooter() {
  const [textMessage, setTextMessage] = useState("");
  const chatId = useContext(ChatContext).currentChatId;
  const currentUser = useContext(LoginContext).user;
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
      // await delay(1000);
      const answerGilbert = await askGilbert(chatId, currentUser.firstName)
      await writeMessage(chatId, GILBERT_USER_ID, answerGilbert)
    }
  };

  const writeMessage = async (
    chatId: number,
    userId: number,
    textMessage: string
  ) => {
    try {
      const res = await fetch(`${API_URL}/api/messages/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
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
      // socket.emit('update timestamp', userId, message.createdAt);
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
