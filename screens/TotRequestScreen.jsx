import { Formik } from "formik";
import { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import getData from "../api-services/getData";
import putData from "../api-services/putData";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { BASE_URL, USER_ROLE } from "../constants/Misc";
import { totFields } from "../fields/tot.fields";
import { getKey } from "../utility";
import postData from "./../api-services/postData";
import useUserMeta from "../hooks/useUserMeta";

export default function TotRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [delayTypes, setDelayTypes] = useState([]);

  const { params = {} } = route;
  const initialValues = params?.id
  ? {
    ...params,
    alphabeticPart: params?.twrModel?.alphabeticPart,
    numericPart: params?.twrModel?.numericPart,
    twrText: params?.twrModel?.text,
  }
  : {};

  const isEdit = params && params.id;

  const { role = "", userMeta } = useUserMeta();
  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee ? totFields.filter(({name})=>name!=='company') : totFields;

  useEffect(() => {
    getDelayTypes()
  }, [])
  

  const getDelayTypes = () => {
    getData(
      { url: BASE_URL+'/DelayType' },
      (response) => {
        const data = response?.data?.items;
        console.log("🚀 ~ file: TotRequestScreen.jsx:36 ~ getDelayTypes ~ data:", data)
        setDelayTypes(data);
      },
      (error) => {
        console.log("🚀 ~ file: TotRequestScreen.jsx:43 ~ getDelayTypes ~ error:", error)
      }
    );
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
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
      employee: { id: userMeta?.id, name: userMeta?.name },
      twrModel: { alphabeticPart, numericPart, text: twrText },
    };

    params = isEmployee ? { ...params, company: { id: userMeta?.company?.id, name: userMeta?.company?.name } } : params;

    if(params?.delayType){
      const selectedIdentifier = delayTypes.find(item => item.id == params?.delayType?.id)?.identifier;
      params.delayType = { ...params?.delayType, identifier: selectedIdentifier }
    }

    console.log(
      "🚀 ~ file: TotRequestScreen.jsx ~ line 82 ~ onSubmit ~ params",
      params
    );
    // return;
    setLoading(true);
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
    shift: {
      id: 1,
      name: "Day",
    },
    DelayType: {
      id: 1,
      name: "Procedural",
    },
    ReasonForRequest: {
      id: 1,
      name: "Storm",
    },
    foreman: "",
    unit: {
      id: 1,
      name: "Unit A",
    },
    permitType: {
      id: 1,
      name: "Permit A",
    },
    approver: {
      id: 11,
      name: "approver@centangle.com",
    },
    twr: "123",
    equipmentNo: "345",
    startOfWork: "2023-02-06",
    manPowerAffected: "20",
    manHours: "36",
    jobDescription: "Test desc",
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" />
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
