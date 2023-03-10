
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
import { LoginContext } from 'utils/context';
import router from "next/router";
import { API_URL } from "utils/constants";


const logout = async () => {
  
  try {
    const res = await fetch(`${API_URL}/api/users/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error([res.statusText, message].join("\n"));
    }
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    router.push("/")
  } catch (error: any) {
    alert(error.message);
  }

};

export default function UserAvatar() {
  const currentUser = useContext(LoginContext).user;

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="sm" src={currentUser.avatar as string}/>} //rel={"noreferrer"}
          variant="ghost"
          isRound={true}
          fontSize={20}
          size="lg"
        />
        <MenuList>
          <MenuItem icon={<ExternalLinkIcon />} onClick={logout}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

