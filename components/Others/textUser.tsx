import { Text } from "@chakra-ui/react";
import React from "react";
import { User } from "utils/customTypes";
import useSWR from "swr";
import { NEXT_PUBLIC_API_URL } from "config";

export default function TextUser({ userId } : {userId:number}) {

  const fetcher = (url: string): Promise<User> => {
    return fetch(url, { credentials: "include" }).then((response) =>
      response.json()
    );
  };

  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR(`${NEXT_PUBLIC_API_URL}/api/users/${userId}`, fetcher);



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
