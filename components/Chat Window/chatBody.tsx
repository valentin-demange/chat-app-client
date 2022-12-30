import styles from "./styles.module.css";
import { Avatar, Box, Tag } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CurrentChatContext, CurrentUserContext } from "utils/context";

export default function ChatBody() {
  const chatMessagesPath = [
    "chats",
    useContext(CurrentChatContext),
    "messages",
  ].join("/");
  const currentUser = useContext(CurrentUserContext);

  // const recentMessagesQuery = query(
  //   collection(db, chatMessagesPath),
      
  // );

  // const [value, loading, error] = useCollection(recentMessagesQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  const value = true;
  const messagesList = [
    <MessageOther key="2" profilePicUrl="" text="Hello world"></MessageOther>,
    <MessageMe key="1" text="Hello world"></MessageMe>,
  ];

  if (value) {
    // debugger
    // const listItems = value.docs.map((doc) => <p>{`Id: ${doc.id} \n Msg: ${doc.data().text}`}</p>)
    // const messagesList = value.docs.map((doc) =>
    //   currentUser.uid === doc.data().authorId ? (
    //     <MessageMe key={doc.id} text={doc.data().text}></MessageMe>
    //   ) : (
    //     <MessageOther
    //       key={doc.id}
    //       profilePicUrl={doc.data().profilePicUrl}
    //       text={doc.data().text}
    //     ></MessageOther>
    //   )
    // );

    return (
      <Box className={styles.chatBody}>
        <ul>{messagesList}</ul>
      </Box>
    );
  }
  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
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
