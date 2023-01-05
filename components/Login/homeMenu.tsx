import React from "react";
import styles from "./styles.module.css";
import { Box, Button } from "@chakra-ui/react";

export default function({cb} : {cb:any}) {
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
    </div>
  );
}
