import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import putData from "../api-services/putData";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { fcoFields, labourFields } from "../fields/fco.fields";
import postData from "./../api-services/postData";
import OverrideCostForm from "../components/OverrideCostForm";
import useUserMeta from "../hooks/useUserMeta";
import { BASE_URL, USER_ROLE } from "../constants/Misc";
import MultiGroupFields from "../components/MultiGroupFields";
import client from "../api-services/api-client";

export default function FcoScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const { role = "", userMeta } = useUserMeta();

  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee
    ? fcoFields.filter(({ name }) => name !== "company")
    : fcoFields;

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    let params = {
      ...formValues,
      requester: { id: userMeta?.id, name: userMeta?.name },
    };

    params = isEmployee
      ? {
        ...params,
      }
      : params;

    console.log(
      "🚀 ~ file: FcoScreen.jsx ~ line 62 ~ onSubmit ~ params",
      params
    );
    // return;

    setLoading(true);
    const formData = new FormData();

    const appendToFormData = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value?.id) {
          formData.append(`${key}.Id`, JSON.stringify(value?.id));
        } else if (Array.isArray(value) && value.length != 0) {
          value.forEach((item, index) => {
            Object.entries(item).forEach(([id, value]) => {
              if (typeof value === 'object' && value?.id) {
                formData.append(`${key}[${index}].${id}.Id`, JSON.stringify(value?.id));
              } else {
                formData.append(`${key}[${index}].${id}`, value);
              }

            })


          })
        } else if (typeof value === 'object' && value?.file) {
          formData.append(`${key}.File`, JSON.stringify(value?.file));
        }
        formData.append(key, value);
      }
    };

    appendToFormData(params);

    console.log(formData)

    if (!isEdit) {
      let apiOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userMeta?.token}`,
        },
      };
      apiOptions.body = formData;

      const result = await fetch(BASE_URL + "/FCOLog", apiOptions).then(
        (response) => response.json()
      );
      setLoading(false);
      console.log(
        "🚀 ~ file: FcoLogScreen.jsx:92 ~ onSubmit ~ result:",
        result
      );
      if (result.status === 200) {
        onSuccess(result.data);
      } else {
        onFailure(result?.errors);
      }

      // client.post("/FCOLog", { data: formData }).then(
      //   (response) => {
      //     setLoading(false);

      //     console.log(
      //       "🚀 ~ file: FcoLogScreen.jsx:92 ~ .then ~ response:",
      //       response.data
      //     );
      //   },
      //   (error) => {
      //     const parsedError = JSON.parse(JSON.stringify(error));
      //     setLoading(false);
      //     console.log(
      //       "🚀 ~ file: postData.js:10 ~ .then ~ parsedError",
      //       parsedError,
      //       error?.response?.data?.errors
      //     );
      //   }
      // );
    } else {
      putData(
        { url: `/FCOLog`, params },
        ({ data }) => {
          onSuccess(data);
        },
        (error) => {
          onFailure(error);
        }
      );
    }
  };

  const onSuccess = (data = {}) => {
    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Field Change Order Log",
      text2: "Log created successfully ✅",
    });
    navigation.pop();
  };

  const onFailure = (errors) => {
    if (errors) {
      console.log(
        "🚀 ~ file: FcoScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        errors
      );
      setApiErrors(errors);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
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
                {/* <OverrideCostForm
                  onFormChange={(values) => onCostFormChange(values)}
                  values={values}
                  key="costs"
                  errors={apiErrors}
                /> */}
                {/* <MultiGroupFields
                  title="Labour"
                  fields={labourFields}
                  onFormChange={(values) => onCostFormChange(values)}
                  values={values}
                  errors={apiErrors}
                /> */}
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
