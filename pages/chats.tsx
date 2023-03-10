import styles from "./chats.module.css";
import SideBar from "@/components/Side Bar/main";
import ChatWindow from "@/components/Chat Window/main";
import React, { useEffect, useState } from "react";
import { LoginContext, ChatContext } from "utils/context";
import { io } from "socket.io-client";
import { SocketContext } from "utils/context";
import { Message, User } from "utils/types";
import useSWR from "swr";
import Router from "next/router";
import router from "next/router";
import { API_URL, GENERAL_CHAT_ID } from "utils/constants";

export default function ChatApp() {
  const socket = io(`${API_URL}`, { transports: ["websocket"] });


    // const [currentUser, setCurrentUser] = useState({
    //   id: 19,
    //   email: "toto@gmail.com",
    //   firstName: "Jane",
    //   lastName: "Doe",
    //   avatar:
    //     "https://lh3.googleusercontent.com/a-/ACNPEu8kjnmJvl4MDxjoSbcOBrU1Vdzm6FbUp8O3Y50ZLLQ=s96-c",
    // });
    // const isLoading = false; const error = false;

  const [currentChatId, setCurrentChatId] = useState(GENERAL_CHAT_ID);

  const [loginData, setloginData] = useState({} as any);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user") as string);
    setloginData({
      token: token,
      user: user,
    });
    if (!user) {
      alert("You must login to access this page")
      router.push('/')
    }
  }, []);
  
  if (loginData.user)
    return (
      <div className={styles.container}>
        <LoginContext.Provider value={loginData}>
          <ChatContext.Provider
            value={{ currentChatId: currentChatId, setCurrentChatId: setCurrentChatId }}
          >
            <SocketContext.Provider value={socket}>
              <SideBar />
              <ChatWindow />
            </SocketContext.Provider>
          </ChatContext.Provider>
        </LoginContext.Provider>
      </div>
    );

return <div>Loading..</div>
  // if (isLoading) return <div>Loading..</div>;
  // if (error) return <div><a href="/" color="blue">You must login to access this page</a></div>;



}
