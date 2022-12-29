import { Text } from "@chakra-ui/react";
import React from "react";
import { db } from "utils/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function TextUser({ uid } : {uid:string}) {
  const [userInfo, loading, error] = useDocumentData(doc(db, "users", uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (loading) return <></>;
  if (error) return <div>Error</div>;
  if (userInfo) {
    return <div>
          <Text fontSize="18px" fontWeight="normal">
            {userInfo.name}
          </Text>
              </div>;
  }
  return <></>
}
