import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import { CurrentUserContext } from "utils/context";
import SideBarChatItem from "@/components/Side Bar/sideBarChatItem";

export default function SideBarChats() {
  const currentUser = useContext(CurrentUserContext);
  // const [value, loading, error] = useCollectionData(
  //   collection(db, ["users", currentUser.uid, "chats"].join("/")),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  const value = [
    {chatId: "1"}
  ];

  if (value) {
    const listItem = value.map((val) => (
          <SideBarChatItem key={val.chatId} chatId={val.chatId} />
        ));
    return <Box className={styles.sbItemsContainer}>{listItem}</Box>;
  }
  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
  return <></>
}

