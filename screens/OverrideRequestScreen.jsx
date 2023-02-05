import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import putData from "../api-services/putData";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { overrideFields } from "../fields/override.fields";
import { getKey } from "../utility";
import postData from "./../api-services/postData";

export default function OverrideRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);

    setLoading(true);
    const params = {
      ...formValues,
      foreman: { id: userDetail?.id, name: userDetail?.name },
    };

    // console.log("🚀 ~ file: OverrideRequestScreen.jsx ~ line 25 ~ onSubmit ~ params", params)
    if (!isEdit) {
      postData(
        {
          url: `/OverrideLog`,
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
        { url: `/OverrideLog`, params },
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
        "🚀 ~ file: OverrideRequestScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        error.data
      );
      setApiErrors(error.data.errors);
    }
    setLoading(false);
  };

  const dummyVal = {
    shift: {
      id: 1,
      name: "evening",
    },
    shiftDelay: {
      id: 1,
      name: "3 hours",
    },
    department: {
      id: 1,
      name: "Finance Department",
    },
    reworkDelay: {
      id: 1,
      name: "2 hours",
    },
    unit: {
      id: 1,
      name: "Unit B",
    },
    permitType: {
      id: 1,
      name: "testing",
    },
    contractor: {
      id: 1,
      name: "Waseem Safdar",
    },
    approver: {
      id: 10,
      name: "approver@centangle.com",
    },
    foreman: {
      id: 10,
      name: "approver@centangle.com",
    },
    startOfWork: "2023-01-29",
    delayReason: "New reason",
    jobDescription: "New desc",
    equipmentNo: "123",
    twr: "456",
    hoursDelayed: "4",
    manPower: "12",
    manHours: "80",
    permittingIssue: {
      id: 1,
      name: "Permitting issue 2",
    },
    manPowerAffected: "12",
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
                  fields={overrideFields}
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
