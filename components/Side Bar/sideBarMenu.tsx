import { Box } from "@chakra-ui/react";
import styles from "./styles.module.css";

import {
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import {
  MoonIcon,
} from "@chakra-ui/icons";
import UserAvatar from "./userAvatar"
import PrivateChatDrawer from "./privateChatDrawer";

export default function SideBarMenu() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box className={styles.sbMenuContainer}>
        <UserAvatar />
  
        <PrivateChatDrawer />

        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle Dark Mode"
          isRound={true}
          icon={<MoonIcon />}
          fontSize={20}
          size="lg"
        />
      </Box>
    );
  }
  