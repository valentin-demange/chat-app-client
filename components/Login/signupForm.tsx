import React from "react";
import styles from "./styles.module.css";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
// import PasswordInput from "./formikInputs";
import { Field, Form, Formik } from "formik";
import { FormikInput, FormikPasswordInput } from "./formikInputs";

export default function ({ cb }: { cb: any }) {
  function validateInput(value: string) {
    let error;
    if (!value) {
      error = "Input is required";
    }
    return error;
  }

  const handleSubmit = async (values: any, actions: any) => {
    // event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      actions.resetForm();
      alert("Sign-up has been successful");
      cb.goToHome();
    } catch (error: any) {
      alert(error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
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
              type="submit"
              isLoading={props.isSubmitting}
            >
              Sign-up
            </Button>
            <Spacer />
          </div>

          <FormikInput
            fieldName={"firstName"}
            placeholder={"First Name"}
            validateInput={validateInput}
          />
          <FormikInput
            fieldName={"lastName"}
            placeholder={"Last Name"}
            validateInput={validateInput}
          />
          <FormikInput
            fieldName={"email"}
            placeholder={"Email"}
            validateInput={validateInput}
          />
          <FormikPasswordInput
            fieldName={"password"}
            validateInput={validateInput}
          />
        </Form>
      )}
    </Formik>
  );
}
