import React from "react";
import styles from "./styles.module.css";
import { Box, Button } from "@chakra-ui/react";
import { API_URL } from "config";

export default function({cb} : {cb:any}) {

  const onClick = async (values: any, actions: any) => {
    // event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users/current`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(values),
        credentials: 'include',
            });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      const result = await res.json();
      console.log(result)
      // Navigate to the /chats route using the Router object
    } catch (error: any) {
      alert(error.message);
    } finally {
    }
  };

  
  return (
    <div className={styles.homeButtonContainer}>
      <div>
        <Button className={styles.homeButton} colorScheme="blue" onClick={cb.goToSignup}>
          Sign up
        </Button>
      </div>
      <div>
        <Button className={styles.homeButton} colorScheme="blue" variant="outline" onClick={cb.goToLogin}>
          Log in
        </Button>
      </div>
      <div>
        <Button className={styles.homeButton} colorScheme="green" onClick={onClick as any}>
          Test
        </Button>
      </div>
    </div>
  );
}
