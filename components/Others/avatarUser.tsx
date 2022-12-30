import { Avatar } from "@chakra-ui/react";
import React from "react";

export default function AvatarUser({ uid } : {uid:string}) {
  // const [userInfo, loading, error] = useDocumentData(doc(db, "users", uid), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  const userInfo = {
    name: "Valentin",
    photoURL: "",
  }

  if (userInfo) {
    return <div>
      <Avatar name={userInfo.name} src={userInfo.photoURL} backgroundColor="gray.100"/>
    </div>;
  }
  // if (loading) return <></>;
  // if (error) return <div>Error</div>;
  return <></>;
}
