import { Avatar } from "@chakra-ui/react";
import React from "react";
import { User } from "utils/types";
import useSWR from "swr";
import { API_URL } from "utils/constants";

export default function ChatAvatar({ userId } : {userId:number}) {
  // const [userInfo, loading, error] = useDocumentData(doc(db, "users", userId), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

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
  //   name: "Valentin",
  //   photoURL: "",
  // }

  if (userInfo) {
    return <div>
      <Avatar name={userInfo.firstName + " " + userInfo.lastName} src={userInfo.avatar} backgroundColor="gray.100"/>
    </div>;
  }
  if (isLoading) return <></>;
  if (error) return <div>Error</div>;
  return <></>;
}
