import styles from "./styles.module.css";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext, CurrentChatContext } from "utils/context";
import askGilbert from "utils/askGilbert";

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

    // writeMessage(currentChat, currentUser, textMessage)
    // const chatGilbert = await checkGilbert(currentChat);
    // if (chatGilbert) {
    //   const answerGilbert = await askGilbert(chatGilbert, currentUser.displayName as string)
    //   writeMessage(currentChat, {uid: "Gilbert", photoURL:"gilbert.png"} as User, answerGilbert)
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
