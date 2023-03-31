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
import putData from "./../api-services/putData";

export default function WrrRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const { params = {} } = route;
  const initialValues = params?.id ? { 
    ...params,
    alphabeticPart: params?.twrModel?.alphabeticPart,
        numericPart: params?.twrModel?.numericPart,
        twrText: params?.twrModel?.text,
  } : {};
  const isEdit = params && params.id;

  const onSubmit = async (formValues = []) => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);

    const {
      // alphabeticPart = null,
      // numericPart = null,
      twrText = null,
    } = formValues;
    const alphabeticPart =
      formValues?.alphabeticPart?.id == 0 ? {} : formValues?.alphabeticPart;
    const numericPart =
      formValues?.numericPart?.id == 0 ? {} : formValues?.numericPart;

    const params = {
      ...formValues,
      contractor: { id: userDetail?.company?.id, name: userDetail?.company?.name },
      fumeControlUsed: formValues?.fumeControlUsed ? 0 : 1,
      employee: { id: userDetail?.id, name: userDetail?.name },
      twrModel: { alphabeticPart, numericPart, text: twrText },
      company: { id: userDetail?.company?.id, name: userDetail?.company?.name },
    };
    console.log(
      "🚀 ~ file: WrrRequestScreen.jsx ~ line 22 ~ onSubmit ~ params",
      params
    );

    setLoading(true);
    if (!isEdit) {
      postData(
        { url: `/WRRLog`, params },
        ({ data }) => {
          onSuccess(data);
        },
        (error) => {
          onFailure(error);
        }
      );
    } else {
      putData(
        { url: `/WRRLog`, params },
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
      text1: "Welding Rod Record Request",
      text2: "Form submitted successfully ✅",
    });
    navigation.pop();
  };

  const onFailure = (error) => {
    console.log(
      "🚀 ~ file: WrrRequestScreen.jsx ~ line 30 ~ onSubmit ~ error",
      error
    );
    if (error?.data?.errors) {
      setApiErrors(error.data.errors);
    }
    setLoading(false);
  };

  const dummyVal = {
    "unit": {
        "id": 1,
        "name": "Unit A"
    },
    "department": {
        "id": 1,
        "name": "Management"
    },
    "employee": {
        "id": 10,
        "name": "Nunez Adrian"
    },
    "weldingMethod": {
        "id": 1
    },
    "weldingRod": {
        "id": 1,
        "name": "Plastic rod"
    },
    "fumeControlUsed": 1,
    "twr": "3",
    "email": "Abc@zs.com",
    "location": {
        "id": 1,
        "name": "Islamabad"
    },
    "rodCheckedOutLbs": "12",
    "rodReturnedWasteLbs": "3",
    "contractor": {
        "id": 1,
        "name": "Brand Scaffold"
    },
    "weldMethod": {
        "id": 1,
        "name": "Method 1"
    },
    "rodType": {
        "id": 1,
        "name": "Steel Rod"
    },
    "approver": {
        "id": 11,
        "name": "approver@centangle.com"
    },
    "dateRodReturned": "2023-02-02",
    "calibrationDate": "2023-02-02"
};

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
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
                  fields={wrrFields}
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
