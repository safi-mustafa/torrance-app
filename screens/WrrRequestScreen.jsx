import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { wrrFields } from "../fields/wrr.fields";
import { getKey } from "../utility";
import postData from "./../api-services/postData";

export default function WrrRequestScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const onSubmit = async (formValues = []) => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);
    const params = {
      ...formValues,
      employee: { id: userDetail?.id, name: userDetail?.name },
    };
    // console.log("🚀 ~ file: WrrRequestScreen.jsx ~ line 22 ~ onSubmit ~ params", params)

    setLoading(true);
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
          "🚀 ~ file: WrrRequestScreen.jsx ~ line 30 ~ onSubmit ~ error",
          error
        );
        if (error?.data?.errors) {
          // console.log("🚀 ~ file: WrrRequestScreen.jsx ~ line 31 ~ onSubmit ~ error?.data", error?.data)
          setApiErrors(error.data.errors);
        }
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
    location: {
      id: 1,
    },
    rodCheckedOutLbs: "12",
    rodReturnedWasteLbs: "3",
    contractor: {
      id: 1,
      name: "Waseem Safdar",
    },
    weldMethod: {
      id: 1,
    },
    rodType: {
      id: 1,
      name: "Plastic rod",
    },
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
                  errors={apiErrors}
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
