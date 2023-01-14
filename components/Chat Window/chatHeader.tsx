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
import { ChatContext, UserContext } from "utils/context";
import AvatarUser from "@/components/Others/avatarUser";
import TextUser from "@/components/Others/textUser";
import { ChatInfo } from "utils/customTypes";
import useSWR from "swr";

export default function ChatHeader() {
  const currentUser = useContext(UserContext);
  const chatContext = useContext(ChatContext);

  // const [chatInfo, loading, error] = useDocumentData(
  //   doc(db, "chats", currentChat),
  //   { snapshotListenOptions: { includeMetadataChanges: true } }
  // );

      const fetcher = (url: string): Promise<ChatInfo> => {
      return fetch(url, { credentials: "include" }).then((response) =>
        response.json()
      );
    };
  
    const {
      data: chatInfo,
      error,
      isLoading,
    } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/${chatContext.currentChat.id.toString()}`, fetcher);


  // const chatInfo = {
  //   type: "public",
  //   membersUid: [1],
  //   name: "General",
  //   avatar: "",
  //   lastMessage: 0,
  // }

  if (chatInfo) {
  
    const memberUid = chatInfo.type == 'private'
      ? chatInfo.membersUid.filter((uid : number) => currentUser.id !== uid)[0]
      : 0;

      const handleOnClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // chatContext.setCurrentChat("public");
        // await deleteDoc(doc(db, ["users", currentUser.id, "chats", chatInfo.chatId].join("/"))); 
        // await deleteDoc(doc(db, ["users", memberUid, "chats", chatInfo.chatId].join("/"))); 
        // await deleteDoc(doc(db, "chats", chatInfo.chatId)); 
        // console.log("Chat ID ", chatInfo.chatId, "has been deleted");
      };
        
      return (
      <Box borderColor="gray.400" className={styles.chatHeader}>
        {/* AVATAR */}
        {chatInfo.type == 'private' ? (
          <AvatarUser userId={memberUid} />
        ) : (
          <Avatar
            name={chatInfo.name}
            backgroundColor="gray.200"
            src={chatInfo.avatar}
          />
        )}
        <div className={styles.chatHeaderLabel}>
          {/* CHAT NAME */}
          {chatInfo.type == 'private' ? (
            <TextUser userId={memberUid} />
          ) : (
            <Text fontSize="18px" fontWeight="normal">
              {chatInfo.name}
            </Text>
          )}
          <Text fontSize={13} fontWeight="normal" color="gray.400">
            {chatInfo.lastMessage
              ? "Last message at " +
                chatInfo.lastMessage
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
            {chatInfo.type == 'private' ? <MenuItem icon={<ExternalLinkIcon />} children={"Leave"} onClick={handleOnClick} /> : <MenuItem icon={<ExternalLinkIcon />} children={"Leave"} isDisabled />}
          </MenuList>
        </Menu>
      </Box>
    );
  }
  if (isLoading) return <></>;
  if (error) return <div>Error</div>;
  return <></>
}
