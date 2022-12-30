import styles from "./chats.module.css";
import SideBar from "@/components/Side Bar/main";
import ChatWindow from "@/components/Chat Window/main";
import React, { useEffect, useState } from "react";
import {
  CurrentUserContext,
  CurrentChatContext,
  SetCurrentChatContext,
} from "utils/context";

export default function ChatApp() {
  // const [currentUser, loading, error] = useAuthState(auth as any);
  const currentUser = {
    uid: "Valentin",
  }
  const [currentChat, setCurrentChat] = useState("public");


  if (currentUser)
    return (
      <div className={styles.container}>
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentChatContext.Provider value={currentChat}>
            <SetCurrentChatContext.Provider value={setCurrentChat}>
              <SideBar />
              <ChatWindow />
            </SetCurrentChatContext.Provider>
          </CurrentChatContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    );

  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
}
