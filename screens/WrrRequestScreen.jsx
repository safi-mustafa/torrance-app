import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { wrrFields } from "../fields/wrr.fields";
import postData from "./../api-services/postData";

export default function WrrRequestScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (params) => {
    console.log(
      "🚀 ~ file: TotRequestScreen.tsx ~ line 20 ~ onSubmit ~ params",
      params
    );

    postData(
      { url: `/WRRLog`, params },
      ({ data }) => {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Welding Rod Record Request",
          text2: "Form submitted successfully ✅",
        });
        navigation.pop();
      },
      (error) => {
        console.log(
          "🚀 ~ file: WrrRequestScreen.jsx ~ line 36 ~ onSubmit ~ error",
          error.response.data.errors
        );
        setLoading(false);
      }
    );
  };

  const initValues = {
    unit: {
      id: 1,
      name: "Unit B",
    },
    department: {
      id: 1,
      name: "Finance Department",
    },
    employee: {
      id: 4,
      name: "John Sameul",
    },
    weldingMethod: {
      id: 1,
    },
    weldingRod: {
      id: 1,
      name: "Plastic rod",
    },
    fumeControlUsed: "12",
    twr: "3",
    email: "Abc@zs.com",
    location: "Isb",
    rodCheckedOutLbs: "12",
    rodReturnedWasteLbs: "3",
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{}}
            onSubmit={onSubmit}
            valueOnChange={(a) => console.log(a)}
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
                  fields={wrrFields}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                  handleSubmit={handleSubmit}
                />
                <Pressable
                  style={[appStyles.btn, appStyles.btnPrimary]}
                  onPress={handleSubmit}
                >
                  <Text style={[appStyles.btnText, appStyles.btnTextPrimary]}>
                    Submit Request
                  </Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
});
