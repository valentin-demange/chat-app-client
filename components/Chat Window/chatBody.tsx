import styles from "./styles.module.css";
import { Avatar, Box, Tag } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext, SocketContext, UserContext } from "utils/context";
import { Message } from "utils/customTypes";
import { NEXT_PUBLIC_API_URL } from "config";

export default function ChatBody() {

  const currentUser = useContext(UserContext);
  const [messages, setMessages] = useState([] as Message[]);
  const socket = useContext(SocketContext);
  const chatId = useContext(ChatContext).currentChatId;


  useEffect(() => {
    // Fetch the messages when the component mounts
    console.log(`Fetching messages of chat room n°${chatId}`);
    fetch(`${NEXT_PUBLIC_API_URL}/api/chats/${chatId}/messages`, { credentials: "include" })
      .then((res) => res.json())
      .then(setMessages);

    // Emit the 'join chat room' event with the chatId as parameter
    console.log(`Join chat room n°${chatId}`);
    socket.emit("join chat room", chatId);

    // Clean up the listener when the component unmounts
    return () => {
      // Emit the 'leave chat room' event with the chatId as parameter
      console.log(`Leave chat room n°${chatId}`);
      socket.emit("leave chat room", chatId);
    };
  }, [chatId]);

  useEffect(() => {
    console.log(`Receiving new message`);
    socket.on("new message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [chatId]);


  if (messages) {
    const messagesList = messages.map((msg) =>
      currentUser.id === msg.userId ? (
        <MessageMe key={msg.id} text={msg.message}></MessageMe>
      ) : (
        <MessageOther
          key={msg.id}
          profilePicUrl={""}
          text={msg.message}
        ></MessageOther>
      )
    );

    return (
      <div className={styles.chatBody}>
        <ul>{messagesList}</ul>
      </div>
    );
  }
  // if (isLoading) return <div className={styles.chatBody}>Loading...</div>;
  // if (error) return <div className={styles.chatBody}>Error</div>;
  return <></>;
}

function MessageOther({
  profilePicUrl,
  text,
}: {
  profilePicUrl: string;
  text: string;
}) {
  return (
    <div className={styles.messageOther}>
      <Avatar
        size="sm"
        // name={author}
        src={profilePicUrl}
        marginRight="8px"
        marginTop="5px"
        backgroundColor="gray.100"
        // padding="10px"
      />
      <Tag fontSize="lg" padding="10px">
        {text}
      </Tag>
      <Box minWidth="15%" />
    </div>
  );
}

function MessageMe({ text }: { text: string }) {
  return (
    <div className={styles.messageMe}>
      <Box minWidth="20%" />
      <Tag fontSize="lg" padding="10px" colorScheme="blue">
        {text}
      </Tag>
    </div>
  );
}
