import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import TextUser from "@/components/Others/textUser";
import { UserContext, ChatContext } from "utils/context";
import useSWR from "swr";
import { ChatInfo } from "utils/customTypes";
import { API_URL } from "config";

export default function SideBarChatItem({ chatId } : {chatId : number}) {
  const currentUser = useContext(UserContext);
  const chatContext = useContext(ChatContext);

  const fetcher = (url: string): Promise<ChatInfo> => {
    return fetch(url, { credentials: "include" }).then((response) =>
      response.json()
    );
  };

  const {
    data: chatInfo,
    error,
    isLoading,
  } = useSWR(`${API_URL}/api/chats/${chatId}`, fetcher);

  // const chatInfo = {
  //   type: "public",
  //   membersUid: [1],
  //   name: "General",
  //   avatarPic: "",
  //   lastMessage: 0,
  //   chatId: 1,
  // }

  const onClick = async () => {
    // event.preventDefault();
      const res = await fetch(`${API_URL}/api/users/test`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        // body: JSON.stringify(""),
    })
    console.log("Fetched!")
  };


  if (chatInfo) {
    const memberUid = chatInfo.membersUid.filter((uid : number) => currentUser.id !== uid)[0];
    return (
      <Button
        className={styles.sbItem}
        variant="ghost"
        padding={0}
        onClick={() => chatContext.setCurrentChatId(chatInfo.id)}
        // onClick={onClick}
      >

        {/* AVATAR */}
        {chatInfo.type == "private" ? (
          <AvatarUser userId={memberUid} />
        ) : (
          <Avatar
            name={chatInfo.name}
            backgroundColor="gray.200"
            src={chatInfo.avatar}
          />
        )}
        <div className={styles.sbItemLabel}>
          {/* CHAT NAME */}
          {chatInfo.type == "private" ? (
            <TextUser userId={memberUid} />
          ) : (
            <Text fontSize="18px" fontWeight="normal">
              {chatInfo.name}
            </Text>
          )}
          {/* LAST MESSAGE INFO */}
          <Text
            fontSize={13}
            fontWeight="normal"
            color="gray.400"
            paddingTop="3px"
          >
            {chatInfo.lastMessage
              ? "Last message: " +
                chatInfo.lastMessage
              : "No last message"}
          </Text>
        </div>
      </Button>
    );
  }
  // if (loading) return <></>;
  // if (error) return <div>Error</div>;
  return <></>
}
