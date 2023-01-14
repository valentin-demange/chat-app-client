import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import { UserContext } from "utils/context";
import SideBarChatItem from "@/components/Side Bar/sideBarChatItem";
import useSWR from "swr";

export default function SideBarChats() {
  const currentUser = useContext(UserContext);

    const fetcher = (url: string): Promise<number[]> => {
      return fetch(url, { credentials: "include" }).then((response) =>
        response.json()
      );
    };
  
    const {
      data: chatsList,
      error,
      isLoading,
    } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users/current/chats`, fetcher);

  // const chatsList = [
  //   1,
  //   12
  // ];

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

