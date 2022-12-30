import React, { useState, useEffect, useContext } from "react";
import { Button, Avatar, Text } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { CurrentUserContext, SetCurrentChatContext } from "utils/context";
import AvatarUser from "@/components/Others/avatarUser";
import TextUser from "@/components/Others/textUser";

export default function PrivateChatDrawerItem({ userUid, handleCloseDrawer } : {userUid:string, handleCloseDrawer:any}) {
  const currentUser = useContext(CurrentUserContext);
  const SetCurrentChat = useContext(SetCurrentChatContext);

  const handleOnClick = async () => {
    // e.preventDefault();
    // Add a new document with a generated id.
    
    const chatId = Math.random().toString(16).slice(2);
    // await setDoc(doc(db, "chats", chatId), {
    //   chatId: chatId,
    //   lastMessage: null,
    //   // currentUser must be placed first. Reason: We check the SECOND member of the chat as being Gilbert or not
    //   membersUid: [currentUser!.uid, userUid], 
    //   private: true,
    // }).then(() => SetCurrentChat(chatId)); 
    // await setDoc(doc(db, ["users", userUid, "chats"].join("/"), chatId), {
    //   chatId: chatId,
    // }); 
    // await setDoc(doc(db, ["users", currentUser.uid, "chats"].join("/"), chatId), {
    //   chatId: chatId,
    // });
    handleCloseDrawer();

    // debugger
    console.log("Chat created with ID: ", chatId);
  };


  return (
    <Button
      className={styles.sbDrawerItem}
      variant="ghost"
      padding={0}
      minW="100%"
      onClick={handleOnClick}
    >
      <AvatarUser uid={userUid} />
      <div className={styles.sbDrawerItemLabel}>
        <TextUser uid={userUid} />
      </div>
    </Button>
  );
}
