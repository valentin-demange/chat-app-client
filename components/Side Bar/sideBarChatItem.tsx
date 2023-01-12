import styles from "./styles.module.css";
import { Box, Avatar, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import AvatarUser from "@/components/Others/avatarUser";
import TextUser from "@/components/Others/textUser";
import { UserContext, SetCurrentChatContext } from "utils/context";

export default function SideBarChatItem({ chatId } : {chatId : string}) {
  const currentUser = useContext(UserContext);
  const SetCurrentChat = useContext(SetCurrentChatContext);

  // const [chatInfo, loading, error] = useDocumentData(doc(db, "chats", chatId), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  const chatInfo = {
    private: false,
    membersUid: ["General"],
    name: "General",
    avatarPic: "",
    lastMessage: 0,
    chatId: "1",
  }

  if (chatInfo) {
    const memberUid = chatInfo.private
      ? chatInfo.membersUid.filter((uid : string) => currentUser.uid !== uid)[0]
      : "General";
    return (
      <Button
        className={styles.sbItem}
        variant="ghost"
        padding={0}
        onClick={() => SetCurrentChat(chatInfo.chatId)}
      >

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
        <div className={styles.sbItemLabel}>
          {/* CHAT NAME */}
          {chatInfo.private ? (
            <TextUser uid={memberUid} />
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
              ? "Last message at " +
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
