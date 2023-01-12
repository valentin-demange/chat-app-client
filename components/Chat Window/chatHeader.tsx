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

export default function ChatHeader() {
  const currentUser = useContext(UserContext);
  const chatContext = useContext(ChatContext);

  // const [chatInfo, loading, error] = useDocumentData(
  //   doc(db, "chats", currentChat),
  //   { snapshotListenOptions: { includeMetadataChanges: true } }
  // );

  const chatInfo = {
    private: false,
    membersUid: ["General"],
    name: "General",
    avatarPic: "",
    lastMessage: 0,
  }

  if (chatInfo) {

  
    const memberUid = chatInfo.private
      ? chatInfo.membersUid.filter((uid : string) => currentUser.uid !== uid)[0]
      : "General";

      const handleOnClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        chatContext.setCurrentChat("public");
        // await deleteDoc(doc(db, ["users", currentUser.uid, "chats", chatInfo.chatId].join("/"))); 
        // await deleteDoc(doc(db, ["users", memberUid, "chats", chatInfo.chatId].join("/"))); 
        // await deleteDoc(doc(db, "chats", chatInfo.chatId)); 
        // console.log("Chat ID ", chatInfo.chatId, "has been deleted");
      };
        
      return (
      <Box borderColor="gray.400" className={styles.chatHeader}>
        {/* AVATAR */}
        {chatInfo.private ? (
          <AvatarUser uid={memberUid} />
        ) : (
          <Avatar
            name={chatInfo.name}
            backgroundColor="gray.200"
            src={chatInfo.avatarPic}
          />
        )}
        <div className={styles.chatHeaderLabel}>
          {/* CHAT NAME */}
          {chatInfo.private ? (
            <TextUser uid={memberUid} />
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
            {chatInfo.private ? <MenuItem icon={<ExternalLinkIcon />} children={"Leave"} onClick={handleOnClick} /> : <MenuItem icon={<ExternalLinkIcon />} children={"Leave"} isDisabled />}
          </MenuList>
        </Menu>
      </Box>
    );
  }
  // if (loading) return <></>;
  // if (error) return <div>Error</div>;
  return <></>
}
