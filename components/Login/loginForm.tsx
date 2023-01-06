import React from "react";
import styles from "./styles.module.css";
import {
  Button,
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
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      // If the request is successful, do something with the response data
    } catch (error:any) {
      actions.setErrors({ apiError: error.message });
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{ username: "", password: ""}}
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
              Log in
            </Button>
            <Spacer />
          </div>

          <FormikInput fieldName={"username"} placeholder={"Email"} validateInput={validateInput} />
          <FormikPasswordInput fieldName={"password"} validateInput={validateInput} />
        </Form>
      )}
    </Formik>
  );

}
