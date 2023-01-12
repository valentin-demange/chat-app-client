
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useContext } from 'react';
import { UserContext } from 'utils/context';


const logout = () => {
  // signOut(auth);
  window.location.href = "/";
};

export default function UserAvatar() {
  const currentUser = useContext(UserContext);

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="sm" src={currentUser.photoURL as string}/>} //rel={"noreferrer"}
          variant="ghost"
          isRound={true}
          fontSize={20}
          size="lg"
        />
        <MenuList>
          <MenuItem icon={<ExternalLinkIcon />} onClick={() => logout()}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

