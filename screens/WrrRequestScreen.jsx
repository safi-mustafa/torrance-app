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
import { USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";

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

  const { role = "", userMeta } = useUserMeta();
  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee ? wrrFields.filter(({name})=>name!=='company') : wrrFields;

  const onSubmit = async (formValues = []) => {

    const {
      // alphabeticPart = null,
      // numericPart = null,
      twrText = null,
    } = formValues;
    const alphabeticPart =
      formValues?.alphabeticPart?.id == 0 ? {} : formValues?.alphabeticPart;
    const numericPart =
      formValues?.numericPart?.id == 0 ? {} : formValues?.numericPart;

    let params = {
      ...formValues,
      // contractor: { id: userMeta?.company?.id, name: userMeta?.company?.name },
      fumeControlUsed: formValues?.fumeControlUsed ? 0 : 1,
      employee: { id: userMeta?.id, name: userMeta?.name },
      twrModel: { alphabeticPart, numericPart, text: twrText },
    };

    params = isEmployee ? { ...params, company: { id: userMeta?.company?.id, name: userMeta?.company?.name } } : params;

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
    "numericPart": {
        "id": "04",
        "name": "04"
    },
    "rodType": {
        "id": 10002,
        "name": "6012"
    },
    "alphabeticPart": {
        "id": "CC",
        "name": "CC-Chem Clean"
    },
    "unit": {
        "id": 25,
        "name": "Boiler"
    },
    "department": {
        "id": 10003,
        "name": "2. Capital "
    },
    "weldMethod": {
        "id": 1,
        "name": "Resistance"
    },
    "location": {
        "id": 4,
        "name": "Overhead"
    },
    "calibrationDate": "4/15/2023",
    "fumeControlUsed": 1,
    "twrText": "985",
    "rodCheckedOut": "4/16/2023",
    "rodCheckedOutLbs": "32",
    "rodReturnedWasteLbs": "89",
    "dateRodReturned": "4/16/2023",
    "contractor": {
        "id": 8,
        "name": "Ametek"
    },
    "employee": {
        "id": 40123,
        "name": "Khalid Saeed"
    },
    "twrModel": {
        "alphabeticPart": {
            "id": "CC",
            "name": "CC-Chem Clean"
        },
        "numericPart": {
            "id": "04",
            "name": "04"
        },
        "text": "985"
    },
    "company": {
        "id": 8,
        "name": "Ametek"
    }
};

  return (
    <>
      <Loader show={loading} size="large" overlay="true" />
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
