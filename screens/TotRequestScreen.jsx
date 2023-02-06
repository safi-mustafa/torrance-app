import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import putData from "../api-services/putData";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { totFields } from "../fields/tot.fields";
import { getKey } from "../utility";
import postData from "./../api-services/postData";

export default function TotRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  // console.log("🚀 ~ file: TotRequestScreen.jsx ~ line 21 ~ TotRequestScreen ~ initialValues", initialValues);
  const isEdit = params && params.id;

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);

    setLoading(true);
    const params = {
      ...formValues,
      requester: { id: userDetail?.id, name: userDetail?.name },
    };

    console.log("🚀 ~ file: TotRequestScreen.jsx ~ line 25 ~ onSubmit ~ params", params)
    if (!isEdit) {
      postData(
        {
          url: `/TOTLog`,
          params,
        },
        ({ data }) => {
          onSuccess(data);
        },
        (error) => {
          onFailure(error);
        }
      );
    } else {
      putData(
        { url: `/TOTLog`, params },
        ({ data }) => {
          onSuccess(data);
        },
        (error) => {
          onFailure(error);
        }
      );
    }
  };

  const onSuccess = (data) => {
    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Time on Tools Request",
      text2: "Form submitted successfully ✅",
    });
    navigation.pop();
  };

  const onFailure = (error) => {
    if (error?.data?.errors) {
      console.log(
        "🚀 ~ file: TotRequestScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        error.data
      );
      setApiErrors(error.data.errors);
    }
    setLoading(false);
  };

  const dummyVal = {
    "shift": {
        "id": 1,
        "name": "Day"
    },
    "DelayType": {
        "id": 1,
        "name": "Procedural"
    },
    "ReasonForRequest": {
        "id": 1,
        "name": "Storm"
    },
    "foreman": {
        "id": 12,
        "name": "foreman@centangle.com"
    },
    "unit": {
        "id": 1,
        "name": "Unit A"
    },
    "permitType": {
        "id": 1,
        "name": "Permit A"
    },
    "approver": {
        "id": 11,
        "name": "approver@centangle.com"
    },
    "twr": "123",
    "equipmentNo": "345",
    "startOfWork": "2023-02-06",
    "manPowerAffected": "20",
    "manHours": "36",
    "jobDescription": "Test desc",
};

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* <ScrollView> */}
          <Formik
            initialValues={initialValues}
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
