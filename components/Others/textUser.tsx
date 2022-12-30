import { Text } from "@chakra-ui/react";
import React from "react";

export default function TextUser({ uid } : {uid:string}) {
  // const [userInfo, loading, error] = useDocumentData(doc(db, "users", uid), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  const userInfo = {
    name: "user info"
  }

  if (userInfo) {
    return <div>
          <Text fontSize="18px" fontWeight="normal">
            {userInfo.name}
          </Text>
              </div>;
  }
  // if (loading) return <></>;
  // if (error) return <div>Error</div>;
  return <></>
}
