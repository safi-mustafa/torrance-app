import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import FormLoop from "./form/FormLoop";
import { signupFields } from "../fields/signup.fields";

const FormSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Field should contain a valid e-mail")
    .max(255)
    .required("E-mail is required"),
  // contractor: Yup.object()
  //   .shape({
  //     name: Yup.string().required("Contractor Name Required"),
  //     id: Yup.string().required(),
  //   })
  //   .default(undefined)
  //   .required(),
  company: Yup.object()
    .shape({
      name: Yup.string().required("Company Name Required"),
      id: Yup.string().required(),
    })
    .default(undefined)
    .required(),
  accessCode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(4, "Pin should be max 4 digits")
    .min(4, "Pin should be min 4 digits")
    .required("Pin is Required")
    .test(
      "Please choose PIN other than 9999",
      "Please choose PIN other than 9999",
      (value) => value != 9999
    ),
});

export default function SignupForm({ onSubmit }) {
  const onFormSubmit = async (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: SignupForm.jsx:33 ~ onFormSubmit ~ values:",
      values
    );
    onSubmit(values);
  };

  const initialValues = {};

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={FormSchema}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          touched,
        }) => (
          <>
            <FormLoop
              fields={signupFields}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              handleSubmit={handleSubmit}
              showYupErrors={true}
              touched={touched}
            />
          </>
        )}
      </Formik>
    </>
  );
}
