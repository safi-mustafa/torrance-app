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
import { USER_ROLE } from "../constants/Misc";
import MultiGroupFields from "../components/MultiGroupFields";

export default function FcoScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [costFormValues, setCostFormValues] = useState([]);

  const { params = {} } = route;
  const initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const { role = "", userMeta } = useUserMeta();

  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee
    ? fcoFields.filter(({ name }) => name !== "company")
    : fcoFields;

  const formatCostRows = (rows) => {
    return rows.map((row) => {
      if (typeof row.overrideType === "object") {
        return { ...row, overrideType: row.overrideType?.id };
      } else return { ...row };
    });
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    // console.log(
    //   "🚀 ~ file: FcoScreen.jsx:35 ~ onSubmit ~ costFormValues",
    //   costFormValues
    // );

    let params = {
      ...formValues,
      requester: { id: userMeta?.id, name: userMeta?.name },
      // costs: formatCostRows(costFormValues),
    };

    params = isEmployee
      ? {
        ...params,
        // company: { id: userMeta?.company?.id, name: userMeta?.company?.name },
      }
      : params;

    console.log(
      "🚀 ~ file: FcoScreen.jsx ~ line 62 ~ onSubmit ~ params",
      params
    );
    // return;

    setLoading(true);
    const formData = new FormData()

    const appendToFormData = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        // const newKey = parentKey ? `${parentKey}.${key}` : key;

        // if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        //   appendToFormData(value, newKey);
        // } else {
        //   formData.append(newKey, value);
        // }

        formData.append(key, value);
      }
    };

    appendToFormData(params);

    // // Append files (assuming 'File' and 'Photo' fields contain file information)
    // formData.append('Photo.file', {
    //   ...params.Photo.file
    // });


    // formData.append('File.file', {
    //   ...params.File.file,
    // })

    console.log('Form Data', )

    if (!isEdit) {
      postData(
        {
          data: formData,
          url: `/FCOLog`,
          headers: {
            "Content-Type": 'multipart/form-data',
          }
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

  const onSuccess = (data) => {
    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Field Change Order Log",
      text2: "Log created successfully ✅",
    });
    navigation.pop();
  };

  const onFailure = (error) => {
    if (error?.data?.errors) {
      console.log(
        "🚀 ~ file: FcoScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        error.data
      );
      setApiErrors(error.data.errors);
    }
    setLoading(false);
  };

  const onCostFormChange = (costValues) => {
    console.log(
      "🚀 ~ file: FcoScreen.jsx:87 ~ onCostFormChange ~ costValues",
      costValues
    );
    setCostFormValues(costValues);
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
