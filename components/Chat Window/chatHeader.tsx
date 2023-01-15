import styles from "./styles.module.css";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { ChatContext, SocketContext, LoginContext } from "utils/context";
import ChatAvatar from "@/components/Others/chatAvatar";
import TextUser from "@/components/Others/textUser";
import { ChatInfo } from "utils/types";
import useSWR from "swr";
import { API_URL, GENERAL_CHAT_ID } from "utils/constants";

export default function ChatHeader() {
  const currentUser = useContext(LoginContext).user;
  const chatId = useContext(ChatContext).currentChatId;
  const setCurrentChatId = useContext(ChatContext).setCurrentChatId;
  const socket = useContext(SocketContext);

  // const [chatInfo, loading, error] = useDocumentData(
  //   doc(db, "chats", currentChat),
  //   { snapshotListenOptions: { includeMetadataChanges: true } }
  // );

  const fetcher = (url: string): Promise<ChatInfo> => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    }).then((response) =>
      response.json()
    );
  };

  const {
    data: chatInfo,
    error,
    isLoading,
  } = useSWR(`${API_URL}/api/chats/${chatId.toString()}`, fetcher);

  // const chatInfo = {
  //   type: "public",
  //   membersUid: [1],
  //   name: "General",
  //   avatar: "",
  //   lastMessage: 0,
  // }

  if (chatInfo) {
    const memberUid =
      chatInfo.type == "private"
        ? chatInfo.membersUid.filter((uid: number) => currentUser.id !== uid)[0]
        : 0;

    const handleOnClick = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      try {
        const res = await fetch(
          `${API_URL}/api/chats/${chatInfo.id.toString()}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const message = await res.text();
          throw new Error([res.statusText, message].join("\n"));
        }
        const message = await res.text();
        // Go back on general chat
        setCurrentChatId(Number(GENERAL_CHAT_ID));
        // Socket delete chat
        // WARNING : THIS MUST BE CORRECTED, IT SHOULD EMIT SOCKET FOR ALL MEMBER USERS IN THE CHAT
        socket.emit("delete chat", currentUser.id, chatInfo.id);
      } catch (error: any) {
        alert(error.message);
      }
    };

    return (
      <Box borderColor="gray.400" className={styles.chatHeader}>
        {/* AVATAR */}
        {chatInfo.type == "private" ? (
          <ChatAvatar userId={memberUid} />
        ) : (
          <Avatar
            name={chatInfo.name}
            backgroundColor="gray.200"
            src={chatInfo.avatar}
          />
        )}
        <div className={styles.chatHeaderLabel}>
          {/* CHAT NAME */}
          {chatInfo.type == "private" ? (
            <TextUser userId={memberUid} />
          ) : (
            <Text fontSize="18px" fontWeight="normal">
              {chatInfo.name}
            </Text>
          )}
          <Text fontSize={13} fontWeight="normal" color="gray.400">
            {chatInfo.lastMessage
              ? "Last message: " + chatInfo.lastMessage
              : "No last message"}
          </Text>
        </div>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="ghost"
            size="lg"
            isRound={true}
            fontSize={20}
          />
          <MenuList>
            {chatInfo.type == "private" ? (
              <MenuItem
                icon={<ExternalLinkIcon />}
                children={"Leave"}
                onClick={handleOnClick}
              />
            ) : (
              <MenuItem
                icon={<ExternalLinkIcon />}
                children={"Leave"}
                isDisabled
              />
            )}
          </MenuList>
        </Menu>
      </Box>
    );
  }
  if (isLoading) return <></>;
  if (error) return <div>Error</div>;
  return <></>;
}
