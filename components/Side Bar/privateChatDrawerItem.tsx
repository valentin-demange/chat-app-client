import React, { useState, useEffect, useContext } from "react";
import { Button, Avatar, Text } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { LoginContext, ChatContext, SocketContext } from "utils/context";
import ChatAvatar from "@/components/Others/chatAvatar";
import TextUser from "@/components/Others/textUser";
import { User } from "utils/types";
import { API_URL } from "utils/constants";

export default function PrivateChatDrawerItem({ userUid, handleCloseDrawer } : {userUid:number, handleCloseDrawer:any}) {
  const currentUser = useContext(LoginContext).user;
  const socket = useContext(SocketContext);
  const setCurrentChatId = useContext(ChatContext).setCurrentChatId;

  const handleOnClick = async () => {
    // e.preventDefault();
    // Add a new document with a generated id.
  
    try {
      const memberUserIds = [currentUser.id, userUid];
      const res = await fetch(`${API_URL}/api/chats/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberUserIds: memberUserIds,
        }),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      const chat = await res.json();
      console.log("Chat created with ID: ", chat.id);
              // Go on created chat
              setCurrentChatId(chat.id);
      // Emit the 'send message' event with the message and chatId as parameters
      // memberUserIds.map((userId:number) => socket.emit('new chat', userId, chat.id));
      // WARNING : THIS MUST BE CORRECTED, IT SHOULD EMIT SOCKET FOR ALL MEMBER USERS IN THE CHAT
      socket.emit('new chat', currentUser.id, chat.id)
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
      <ChatAvatar userId={userUid} />
      <div className={styles.sbDrawerItemLabel}>
        <TextUser userId={userUid} />
      </div>
    </Button>
  );
}
