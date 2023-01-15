import React, { useContext } from "react";
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { LoginContext } from "utils/context";
import PrivateChatDrawerItem from "./privateChatDrawerItem";

export default function PrivateChatDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useContext(LoginContext).user;
  // const [value, loading, error] = useCollectionData(collection(db, "users"), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });


  const value = true;

  if (value) {
    // const listItems = value
    //   .filter((val) => val.uid !== currentUser.id)
    //   .map((val) => <PrivateChatDrawerItem key={val.uid} userUid={val.uid} handleCloseDrawer={onClose} />);

    const uidToDisplay = [1];
    const listItems = uidToDisplay
      .filter((userId) => userId !== currentUser.id)
      .map((userId) => <PrivateChatDrawerItem key={userId} userUid={userId} handleCloseDrawer={onClose} />);

    return (
      <>
        <IconButton
          onClick={onOpen}
          variant="ghost"
          aria-label="New Chat"
          isRound={true}
          icon={<AddIcon />}
          fontSize={20}
          size="lg"
        />

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="xs"
          // maxW="500px"
          // finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>New Private Chat</DrawerHeader>

            <DrawerBody padding="10px 10px">
              {listItems}
            </DrawerBody>

            {/* <DrawerFooter>
            <Button variant="ghost" mr={3} onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  // if (loading) return <div></div>;
  // if (error) return <div>Error</div>;
  return <></>
}
