import { Formik } from "formik";
import * as Yup from "yup";

import FormLoop from "./form/FormLoop";
import { changePasswordFields } from "../fields/changePassword.fields";

const FormSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function ResetPasswordForm({ onSubmit }) {
  const onFormSubmit = async (values, { setSubmitting }) => {
    onSubmit(values);
  };

  const initialValues = { password: "", confirmPassword: "" };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={FormSchema}
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
              fields={changePasswordFields}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              values={values}
              errors={errors}
              handleSubmit={handleSubmit}
              showYupErrors={true}
            />
          </>
        )}
      </Formik>
    </>
  );
}
