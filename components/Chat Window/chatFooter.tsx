import styles from "./styles.module.css";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext, CurrentChatContext } from "utils/context";
import askGilbert from "utils/askGilbert";
import { checkGilbert, writeMessage } from "utils/chatsFunctions";

export default function ChatFooter() {
  const [textMessage, setTextMessage] = useState("");
  const currentChat = useContext(CurrentChatContext);
  const currentUser = useContext(CurrentUserContext);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTextMessage(e.target.value);
  };

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (textMessage === "") return;
    setTextMessage("");

    await writeMessage(currentChat.id, currentUser.id, textMessage)
    // const isGilbert = await checkGilbert(currentChat);
    // if (isGilbert) {
    //   messageList = await getMessages();
    //   const answerGilbert = await askGilbert(chatGilbert, currentUser.firstName as string)
    //   await writeMessage(currentChat, "1", answerGilbert)
    // }
  };


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
