import React from "react";
import styles from "./styles.module.css";
import { Button, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";
// import PasswordInput from "./formikInputs";
import { Field, Form, Formik } from "formik";
import { FormikInput, FormikPasswordInput } from "./formikInputs";
import { useRouter } from "next/router";
import { API_URL } from "utils/constants";

export default function ({ cb }: { cb: any }) {
  function validateInput(value: string) {
    let error;
    if (!value) {
      error = "Input is required";
    }
    return error;
  }

  const router = useRouter();

  const handleSubmit = async (values: any, actions: any) => {
    // event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
            });
      if (!res.ok) {
        const message = await res.text();
        throw new Error([res.statusText, message].join("\n"));
      }
      // Get the token
      const result = await res.json();
      // Store the token and user
      localStorage.setItem("jwt_token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));;
      // Reset form
      actions.resetForm();
      // Navigate to the /chats route using the Router object
      router.push("/chats");
    } catch (error: any) {
      alert(error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <FormikInput
            fieldName={"username"}
            placeholder={"Email"}
            validateInput={validateInput}
          />
          <FormikPasswordInput
            fieldName={"password"}
            validateInput={validateInput}
          />

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
              OK
            </Button>
            <Spacer />
          </div>


        </Form>
      )}
    </Formik>
  );
}
