import { Avatar } from "@chakra-ui/react";
import React from "react";
import { User } from "utils/customTypes";
import useSWR from "swr";
import { NEXT_PUBLIC_API_URL } from "config";

export default function AvatarUser({ userId } : {userId:number}) {
  // const [userInfo, loading, error] = useDocumentData(doc(db, "users", userId), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

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
