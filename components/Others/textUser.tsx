import { Text } from "@chakra-ui/react";
import React from "react";
import { User } from "utils/types";
import useSWR from "swr";
import { API_URL } from "utils/constants";

export default function TextUser({ userId } : {userId:number}) {

  const fetcher = (url: string): Promise<User> => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    }).then((response) =>
      response.json()
    );
  };

  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR(`${API_URL}/api/users/${userId}`, fetcher);



  // const userInfo = {
  //   name: "user info"
  // }

  if (userInfo) {
    return <div>
          <Text fontSize="18px" fontWeight="normal">
          {userInfo.firstName + " " + userInfo.lastName}
          </Text>
              </div>;
  }
  // if (loading) return <></>;
  // if (error) return <div>Error</div>;
  return <></>
}
