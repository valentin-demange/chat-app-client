import { Avatar } from "@chakra-ui/react";
import React from "react";
import { db } from "utils/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function AvatarUser({ uid } : {uid:string}) {
  const [userInfo, loading, error] = useDocumentData(doc(db, "users", uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (loading) return <></>;
  if (error) return <div>Error</div>;
  if (userInfo) {
    return <div>
      <Avatar name={userInfo.name} src={userInfo.photoURL} backgroundColor="gray.100"/>
    </div>;
  }
  return <></>;
}
