import { Formik } from "formik";
import { useState } from "react";
import { ImageBackground, Platform, StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import appStyles from "../app-styles";

import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { lightColor } from "../constants/Colors";
import Layout from "../constants/Layout";
import { loginFields } from "../fields/login.fields";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: LoginScreen.jsx ~ line 18 ~ onSubmit ~ values",
      values
    );
    navigation.replace("BottomTabNav");
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
        style={{ marginTop: Platform.OS == "ios" ? 40 : 0 }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={{...appStyles.h3, ...appStyles.btnTextPrimary, marginBottom: 30, textAlign: "center"}}>Torrance App</Text>
            <Formik
              initialValues={{}}
              onSubmit={onSubmit}
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
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
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
