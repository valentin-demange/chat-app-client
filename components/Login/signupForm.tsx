import React from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";

export default function ({ cb }: { cb: any }) {
  return (
    <div>
      <div className={styles.formButtonContainer}>
        <Spacer />
        <Button
          className={styles.formButton}
          colorScheme="blue"
          variant="outline"
          onClick={cb.goToHome}
        >
          Back
        </Button>
        <Spacer />
        <Button
          className={styles.formButton}
          colorScheme="blue"
          onClick={cb.goToHome}
        >
          Sign-up
        </Button>
        <Spacer />
      </div>
      <div>
        <Input className={styles.input} placeholder="First Name" />
      </div>
      <div>
        <Input className={styles.input} placeholder="Last Name" />
      </div>
      <div>
        <Input className={styles.input} placeholder="Email" />
      </div>
      <div>
        <Input className={styles.input} placeholder="Password" />
      </div>
    </div>
  );
}
