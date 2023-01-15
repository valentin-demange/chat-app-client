import React from "react";
import styles from "./styles.module.css";
import { Box, Button } from "@chakra-ui/react";
import { API_URL } from "utils/constants";

export default function ({ cb }: { cb: any }) {
  const onClick = async (values: any, actions: any) => {
    // event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/chats/1`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      const result = await res.json();
      alert(JSON.stringify(result))
      // Navigate to the /chats route using the Router object
    } catch (error: any) {
      alert(error.message);
    } finally {
    }
  };

  return (
    <div className={styles.homeButtonContainer}>
      <div>
        <Button
          className={styles.homeButton}
          colorScheme="blue"
          onClick={cb.goToSignup}
        >
          Sign up
        </Button>
      </div>
      <div>
        <Button
          className={styles.homeButton}
          colorScheme="blue"
          variant="outline"
          onClick={cb.goToLogin}
        >
          Log in
        </Button>
      </div>
      {process.env.NEXT_PUBLIC_ENV == "dev" ? (
        <div>
          <Button
            className={styles.homeButton}
            colorScheme="green"
            onClick={onClick as any}
          >
            Test
          </Button>
        </div>
      ) : null}
    </div>
  );
}
