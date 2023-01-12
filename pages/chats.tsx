import styles from "./chats.module.css";
import SideBar from "@/components/Side Bar/main";
import ChatWindow from "@/components/Chat Window/main";
import React, { useEffect, useState } from "react";
import {
  UserContext,
  ChatContext,
} from "utils/context";

export default function ChatApp() {
  // const [currentUser, loading, error] = useAuthState(auth as any);
  const [currentUser, setCurrentUser] = useState({
    id: 19,
    email: "toto@gmail.com",
    firstName: "Jane",
    lastName: "Doe",
    avatar: "",
  });
  const [currentChat, setCurrentChat] = useState({
    id: "1",
    name: "Général",
    type: "public",
  });

  if (currentUser)
    return (
      <div className={styles.container}>
        <UserContext.Provider value={currentUser}>
          <ChatContext.Provider value={{currentChat: currentChat, setCurrentChat: setCurrentChat}}>
              <SideBar />
              <ChatWindow />
          </ChatContext.Provider>
        </UserContext.Provider>
      </div>
    );

  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
}
