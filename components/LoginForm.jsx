import { Formik } from "formik";
import * as Yup from "yup";

import FormLoop from "../components/form/FormLoop";
import { loginFields } from "../fields/login.fields";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm({ navigation, onSubmit }) {
  const onFormSubmit = async (values, { setSubmitting }) => {
    onSubmit(values);
  };

  const initialValues = {};
  //{"email": "roxen@abc.com","password": "Centangle"} 
  //{"email": "approver@centangle.com","password": "Admin@123"}

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
