import React from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
// import PasswordInput from "./formikInputs";

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
      <div className={styles.input} >
        <Input placeholder="First Name" />
      </div>
      <div className={styles.input} >
        <Input placeholder="Last Name" />
      </div>
      <div className={styles.input} >
        <Input placeholder="Email" />
      </div>
      {/* <div className={styles.input} >
        <PasswordInput />
      </div> */}
    </div>
  );
}
