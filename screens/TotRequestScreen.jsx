import { Formik } from "formik";
import { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { totFields } from "../fields/tot.fields";
import { getKey } from "../utility";
import postData from "./../api-services/postData";

export default function TotRequestScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserMeta();
  }, []);

  const getUserMeta = async () => {
    const userMeta = await getKey("user");
    console.log(
      "🚀 ~ file: TotRequestScreen.jsx ~ line 23 ~ onSubmit ~ userMeta",
      JSON.parse(userMeta)
    );
  };

  const onSubmit = async (formValues, { setSubmitting }) => {
    const params = { ...formValues };
    postData(
      {
        url: `/TOTLog`,
        params,
      },
      ({ data }) => {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Time on Tools Request",
          text2: "Form submitted successfully ✅",
        });
        navigation.pop();
      },
      (error) => {
        console.log(
          "🚀 ~ file: TotRequestScreen.jsx ~ line 33 ~ onSubmit ~ error",
          error.response.data.errors
        );
        setLoading(false);
      }
    );
  };

  const initVal = {
    "shiftDelay": {
        "id": 2,
        "name": "10 mints"
    },
    "department": {
        "id": 1,
        "name": "Finance Department"
    },
    "contractor": {
        "id": 1,
        "name": "Waseem Safdar"
    },
    "reworkDelay": {
        "id": 2,
        "name": "35 mints"
    },
    "shift": {
        "id": 1,
        "name": "evening"
    },
    "unit": {
        "id": 1,
        "name": "Unit B"
    },
    "permitType": {
        "id": 1,
        "name": "testing"
    },
    "startOfWork": "2023-01-22",
    "delayReason": "New reason",
    "jobDescription": "New desc",
    "equipmentNo": "12",
    "twr": "3",
    "hoursDelayed": "2",
    "manPower": "5",
    "manHours": "40",
    "approver": {
        "id": 10,
        "name": "approver@centangle.com"
    }
};

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* <ScrollView> */}
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
                  fields={totFields}
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
          {/* </ScrollView> */}
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
