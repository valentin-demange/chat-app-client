import styles from "./chats.module.css";
import SideBar from "@/components/Side Bar/main";
import ChatWindow from "@/components/Chat Window/main";
import React, { useEffect, useState } from "react";
import { UserContext, ChatContext } from "utils/context";
import { io } from "socket.io-client";
import { SocketContext } from "utils/context";
import { Message, User } from "utils/customTypes";
import useSWR from "swr";
import Router from "next/router";
import router from "next/router";

export default function ChatApp() {
  const socket = io("http://localhost:3000", { transports: ["websocket"] });


    const [currentUser, setCurrentUser] = useState({
      id: 19,
      email: "toto@gmail.com",
      firstName: "Jane",
      lastName: "Doe",
      avatar:
        "https://lh3.googleusercontent.com/a-/ACNPEu8kjnmJvl4MDxjoSbcOBrU1Vdzm6FbUp8O3Y50ZLLQ=s96-c",
    });
    const isLoading = false; const error = false;

    // const fetcher = (url: string): Promise<User> => {
    //   return fetch(url, { credentials: "include" }).then((response) =>
    //     response.json()
    //   );
    // };
  
    // const {
    //   data: currentUser,
    //   error,
    //   isLoading,
    // } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users/current`, fetcher);

  const [currentChat, setCurrentChat] = useState({
    id: 1,
    name: "Général",
    type: "public",
  });

  if (currentUser)
    return (
      <div className={styles.container}>
        <UserContext.Provider value={currentUser}>
          <ChatContext.Provider
            value={{ currentChat: currentChat, setCurrentChat: setCurrentChat }}
          >
            <SocketContext.Provider value={socket}>
              <SideBar />
              <ChatWindow />
            </SocketContext.Provider>
          </ChatContext.Provider>
        </UserContext.Provider>
      </div>
    );

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>You must login to access this page</div>;
}
