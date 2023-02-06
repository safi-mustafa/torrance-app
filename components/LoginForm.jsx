import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import FormLoop from "../components/form/FormLoop";
import Layout from "../constants/Layout";
import { loginFields } from "../fields/login.fields";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm({ navigation, onSubmit }) {
  const onFormSubmit = async (values, { setSubmitting }) => {
    onSubmit(values);
  };

  const initialValues = {}; //{ email: "abc@xyz.com", password: "123" };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={LoginSchema}
        // valueOnChange={(a) => console.log(a)}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <FormLoop
              fields={loginFields}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: lightColor,
    justifyContent: "center",
    height: Layout.window.height,
  },
});
