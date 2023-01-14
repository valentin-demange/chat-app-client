import React, { useState, useEffect, useContext } from "react";
import { Button, Avatar, Text } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { UserContext, ChatContext } from "utils/context";
import AvatarUser from "@/components/Others/avatarUser";
import TextUser from "@/components/Others/textUser";
import { User } from "utils/customTypes";

export default function PrivateChatDrawerItem({ userUid, handleCloseDrawer } : {userUid:number, handleCloseDrawer:any}) {
  const currentUser = useContext(UserContext);
  const chatContext = useContext(ChatContext);

  const handleOnClick = async () => {
    // e.preventDefault();
    // Add a new document with a generated id.
  
    try {
      const res = await fetch("http://localhost:3000/api/chats/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          memberUserIds: [currentUser.id, userUid],
        }),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      const chat = await res.json();
      console.log("Chat created with ID: ", chat.id);
      // Emit the 'send message' event with the message and chatId as parameters
      // socket.emit('send message', message, chatId);
    } catch (error: any) {
      alert(error.message);
    }

    handleCloseDrawer(); 
  };


  return (
    <Button
      className={styles.sbDrawerItem}
      variant="ghost"
      padding={0}
      minW="100%"
      onClick={handleOnClick}
    >
      <AvatarUser userId={userUid} />
      <div className={styles.sbDrawerItemLabel}>
        <TextUser userId={userUid} />
      </div>
    </Button>
  );
}
