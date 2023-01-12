import styles from "./styles.module.css";
import { Avatar, Box, Tag } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext, CurrentUserContext } from "utils/context";
import useSWR from 'swr'
import { Message } from "utils/customTypes";


export default function ChatBody() {
  const chatMessagesUrl = [
    process.env.NEXT_PUBLIC_API_URL,
    "api/chats",
    // useContext(ChatContext),
    "1",
    "messages",
  ].join("/");
  const currentUser = useContext(CurrentUserContext);

  const fetcher = (url: string): Promise<Message[]> => {
    return fetch(url).then(response => response.json());
  }
  const { data , error, isLoading } = useSWR(chatMessagesUrl, fetcher)

  if (data) {
    const messagesList = data.map((msg) =>
      currentUser.uid === msg.userId ? (
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
  if (isLoading) return <div className={styles.chatBody}>Loading...</div>;
  if (error) return <div className={styles.chatBody}>Error</div>;
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

