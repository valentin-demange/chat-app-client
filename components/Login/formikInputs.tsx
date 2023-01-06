import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import styles from "./styles.module.css";

export function FormikPasswordInput({
  fieldName,
  validateInput,
}: {
  fieldName: string;
  validateInput: any;
}) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Field name={fieldName} validate={validateInput}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <div className={styles.input}>
            <InputGroup size="md">
              <Input
                {...field}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
        </FormControl>
      )}
    </Field>
  );
}

export function FormikInput({
  fieldName,
  placeholder,
  validateInput,
}: {
  fieldName: string;
  placeholder: string;
  validateInput: any;
}) {
  return (
    <Field name={fieldName} validate={validateInput}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <div className={styles.input}>
            <Input {...field} placeholder={placeholder} />
            {/* <FormErrorMessage>{form.errors.email}</FormErrorMessage> */}
          </div>
        </FormControl>
      )}
    </Field>
  );
}
