import { Box } from "@chakra-ui/react";
import styles from "./styles.module.css";
import SideBarMenu from "./sideBarMenu";
import SideBarChats from "./sideBarChats";

export default function SideBar() {
  return (
    <Box borderColor="gray.400" className={styles.sbMainContainer}>
      <SideBarMenu />
      <SideBarChats />
    </Box>
  );
}


