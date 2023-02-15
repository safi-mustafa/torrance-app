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
import OverrideCostForm from "../components/OverrideCostForm";

export default function OverrideRequestScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [costFormValues, setCostFormValues] = useState([]);

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const formatCostRows = (rows) => {
    return rows.map((row) => {
      if (typeof row.overrideType === "object") {
        return { ...row, overrideType: row.overrideType?.id };
      } else return { ...row };
    });
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);

    console.log(
      "🚀 ~ file: OverrideRequestScreen.jsx:35 ~ onSubmit ~ costFormValues",
      costFormValues
    );
    const params = {
      ...formValues,
      requester: { id: userDetail?.id, name: userDetail?.name },
      company: { id: userDetail?.company?.id, name: userDetail?.company?.name },
      costs: formatCostRows(costFormValues),
    };

    console.log(
      "🚀 ~ file: OverrideRequestScreen.jsx ~ line 25 ~ onSubmit ~ params",
      params
    );
    // return;

    setLoading(true);
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
      text1: "Override Request",
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
                <OverrideCostForm
                  onFormChange={onCostFormChange}
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
