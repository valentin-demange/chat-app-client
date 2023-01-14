import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import { SocketContext, UserContext } from "utils/context";
import SideBarChatItem from "@/components/Side Bar/sideBarChatItem";
import useSWR from "swr";
import { API_URL } from "config";

export default function SideBarChats() {
  const currentUser = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [chatsList, setChatsList] = useState([] as number[]);
  const currentUserId = useContext(UserContext).id;

    // const fetcher = (url: string): Promise<number[]> => {
    //   return fetch(url, { credentials: "include" }).then((response) =>
    //     response.json()
    //   );
    // };
  
    // const {
    //   data: chatsList,
    //   error,
    //   isLoading,
    // } = useSWR(`${API_URL}/api/users/current/chats`, fetcher);

  // const chatsList = [
  //   1,
  //   12
  // ];

  useEffect(() => {
    // Fetch the messages when the component mounts
    console.log(`Fetching chat list`);
    fetch(`${API_URL}/api/users/current/chats`, { credentials: "include" })
      .then((res) => res.json())
      .then(setChatsList);

    // Emit the 'join chat room' event with the chatId as parameter
    console.log(`create user socket for user n°${currentUserId}`);
    socket.emit("create user socket", currentUserId);

    // Clean up the listener when the component unmounts
    return () => {
      // Emit the 'leave chat room' event with the chatId as parameter
      console.log(`remove user socket for user n°${currentUserId}`);
      socket.emit("remove user socket", currentUserId);
    };
  }, [currentUserId]);

  useEffect(() => {
    console.log(`New chat has been created`);
    socket.on("new chat", (chatId: number) => {
      setChatsList((prevChatsList) => [...prevChatsList, chatId]);
    });
  }, [currentUserId]);


  if (chatsList) {
    const listItem = chatsList.map((chatId) => (
          <SideBarChatItem key={chatId} chatId={chatId} />
        ));
    return <Box className={styles.sbItemsContainer}>{listItem}</Box>;
  }
  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
  return <></>
}

