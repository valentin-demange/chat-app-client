import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import { SocketContext, UserContext } from "utils/context";
import SideBarChatItem from "@/components/Side Bar/sideBarChatItem";
import useSWR from "swr";
import { API_URL } from "config";

export default function SideBarChats() {
  const socket = useContext(SocketContext);
  const [chatsList, setChatsList] = useState([] as number[]);
  const currentUser = useContext(UserContext).user;

  // const fetcher = (url: string): Promise<number[]> => {
  //   return fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
  //   },
  // }).then((response) =>
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
    fetch(`${API_URL}/api/users/${currentUser.id.toString()}/chats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setChatsList);

    // Emit the 'join chat room' event with the chatId as parameter
    console.log(`create user socket for user n°${currentUser.id}`);
    socket.emit("create user socket", currentUser.id);

    // Clean up the listener when the component unmounts
    return () => {
      // Emit the 'leave chat room' event with the chatId as parameter
      console.log(`remove user socket for user n°${currentUser.id}`);
      socket.emit("remove user socket", currentUser.id);
    };
  }, [currentUser.id]);

  useEffect(() => {
    console.log(`New chat has been created`);
    socket.on("new chat", (chatId: number) => {
      setChatsList((prevChatsList) => [...prevChatsList, chatId]);
    });
    socket.on("delete chat", (chatId: number) => {
      setChatsList((prevChatsList) =>
        prevChatsList.filter((id) => id !== chatId)
      );
    });
  }, [currentUser.id]);

  if (chatsList) {
    const listItem = chatsList.map((chatId) => (
      <SideBarChatItem key={chatId} chatId={chatId} />
    ));
    return <Box className={styles.sbItemsContainer}>{listItem}</Box>;
  }
  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
  return <></>;
}
