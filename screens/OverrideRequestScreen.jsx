import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import Constants from 'expo-constants';

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { overrideFields } from "../fields/override.fields";
import OverrideCostForm from "../components/OverrideCostForm";
import useUserMeta from "../hooks/useUserMeta";
import { BASE_URL, USER_ROLE } from "../constants/Misc";

export default function OverrideRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [costFormValues, setCostFormValues] = useState([]);

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const { role = "", userMeta } = useUserMeta();

  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee
    ? overrideFields.filter(({ name }) => name !== "company")
    : overrideFields;

  const formatCostRows = (rows) => {
    return rows.map((row) => {
      if (typeof row.overrideType === "object") {
        return { ...row, overrideType: row.overrideType?.id };
      } else return { ...row };
    });
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    // console.log(
    //   "🚀 ~ file: OverrideRequestScreen.jsx:35 ~ onSubmit ~ costFormValues",
    //   costFormValues
    // );
    // return;

    let params = {
      ...formValues,
      requester: { id: userMeta?.id, name: userMeta?.name },
      costs: formatCostRows(costFormValues),
    };

    params = isEmployee
      ? {
          ...params,
          company: { id: userMeta?.company?.id, name: userMeta?.company?.name },
        }
      : params;

    // console.log(
    //   "🚀 ~ file: OverrideRequestScreen.jsx ~ line 25 ~ onSubmit ~ params",
    //   params
    // );
    // return;

    const formData = new FormData();
    const appendToFormData = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value?.id) {
          formData.append(`${key}.Id`, JSON.stringify(value?.id));
        } else if (Array.isArray(value) && value.length != 0) {
          value.forEach((item, index) => {
            Object.entries(item).forEach(([id, value]) => {
              if (typeof value === "object" && value?.id) {
                formData.append(
                  `${key}[${index}].${id}.Id`,
                  JSON.stringify(value?.id)
                );
              } else {
                formData.append(`${key}[${index}].${id}`, value);
              }
            });
          });
        } else if (typeof value === "object" && value?.fileName) {
          const { base64, exif, duration, ...imageData } = value;
          formData.append(`${key}.file`, imageData);
        } else formData.append(key, value);
      }
    };
    appendToFormData(params);
    setLoading(true);

    let apiOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userMeta?.token}`,
        'VersionHeader': 'X-Version',
        'X-Version': Constants.expoConfig.version
      },
    };
    if (isEdit) {
      apiOptions.method = "PUT";
    }

    // console.log(
    //   "🚀 ~ file: OverrideRequestScreen.jsx:130 ~ onSubmit ~ formData:",
    //   formData
    // );
    apiOptions.body = formData;
    // return;
    const result = await fetch(BASE_URL + "/OverrideLog", apiOptions).then(
      (response) => response.json()
    );
    setLoading(false);
    // console.log(
    //   "🚀 ~ file: OverrideRequestScreen.jsx:114 ~ onSubmit ~ result:",
    //   result
    // );

    if (result.status === 200) {
      onSuccess(result.data);
    } else {
      onFailure(result?.errors);
    }
  };

  const onSuccess = (data) => {
    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Override Request",
      text2: "Form submitted successfully ✅",
    });
    navigation.pop();
  };

  const onFailure = (error) => {
    if (error) {
      console.log(
        "🚀 ~ file: OverrideRequestScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        error
      );
      setApiErrors(error);
    }
    setLoading(false);
  };

  const onCostFormChange = (costValues) => {
    console.log(
      "🚀 ~ file: OverrideRequestScreen.jsx:87 ~ onCostFormChange ~ costValues",
      costValues
    );
    setCostFormValues(costValues);
  };

  const dummyVal = {
    reasonForRequest: {
      id: 3,
      name: "Reason B",
    },
    unit: {
      id: 1,
      name: "Unit A",
    },
    craftRate: {
      id: 2,
      name: "12.45",
    },
    shift: {
      id: 1,
      name: "Day",
    },
    craftSkill: {
      id: 2,
      name: "Carpentry",
    },
    overrideType: {
      id: 3,
      name: "Override Type B",
    },
    approver: {
      id: 10013,
      name: "ammad@centangle.com",
    },
    overrideHours: "12",
    poNumber: "34",
    workCompletedDate: "2023-02-06",
    description: "Test desc",
    requester: {
      id: 10,
      name: "Nunez Adrian",
    },
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* <ScrollView> */}
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  fields={formFields}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={apiErrors}
                  handleSubmit={handleSubmit}
                  formStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                />
                <OverrideCostForm
                  onFormChange={(values) => onCostFormChange(values)}
                  values={values}
                  key="costs"
                  errors={apiErrors}
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
