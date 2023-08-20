import { Formik } from "formik";
import { useState, useEffect } from "react";
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
import { parseNumberFromString } from "../utility";
import getData from "../api-services/getData";
import { eq } from "react-native-reanimated";

export default function FcoScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [craftSkills, setCraftSkills] = useState([]);

  const { params = {} } = route;
  let initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;

  const { role = "", userMeta } = useUserMeta();

  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const formFields = isEmployee
    ? fcoFields.filter(({ name }) => name !== "company")
    : fcoFields;

  useEffect(() => {
    getCraftSkill();
  }, []);

  const getCraftSkill = () => {
    setLoading(true);
    getData(
      { url: "/CraftSkill" },
      (response) => {
        setLoading(false);
        const { items = [] } = response?.data;
        setCraftSkills(items);
      },
      (error) => {
        console.log(
          "🚀 ~ file: FcoLogScreen.jsx:47 ~ getCraftSkill ~ error:",
          error
        );
        setLoading(false);
      }
    );
  };

  const calculateFCOSections = (FCOValues = []) => {
    return FCOValues.map((fco) => {
      const { mn = null, du = null, overrideType = null, craft = {} } = fco;
      let rate = 0;
      if (mn && du && overrideType && craft?.id != 0) {
        craftSkills.forEach((skill) => {
          if (skill.id == craft?.id) {
            rate = skill[`${overrideType.toLowerCase()}Rate`] * mn * du;
          }
        });

        // console.log(
        //   "🚀 ~ file: FcoLogScreen.jsx:65 ~ calculateFCOSections ~ rate:",
        //   rate
        // );
        return { ...fco, rate };
      }
      else return { ...fco };
    });
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    let params = {
      ...formValues,
      requester: { id: userMeta?.id, name: userMeta?.name },
      FCOSections: calculateFCOSections(formValues?.FCOSections ?? []),
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
    return;

    setLoading(true);
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
          console.log(
            "🚀 ~ file: FcoLogScreen.jsx:73 ~ appendToFormData ~ value:",
            key,
            value,
            value?.name
          );
          const { base64, exif, duration, ...imageData } = value;
          formData.append(`${key}.file`, imageData);
          // formData.append(`${key}.name`, value?.name);
          // formData.append(`${key}.Type`, JSON.stringify(value?.type));
        } else formData.append(key, value);
      }
    };

    appendToFormData(params);

    console.log(
      "🚀 ~ file: FcoLogScreen.jsx:89 ~ onSubmit ~ formData:",
      formData
    );

    // setLoading(false);
    // return;

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

  initialValues = {
    "FCOType": {
        "id": 1,
        "name": "FCO Type 1."
    },
    "FCOReason": {
        "id": 1,
        "name": "Reason"
    },
    "shift": {
        "id": 2,
        "name": "Night"
    },
    "Unit": {
        "id": 25,
        "name": "Boiler"
    },
    "Company": {
        "id": 1,
        "name": "Acuren"
    },
    "Date": "8/18/2023",
    "Location": "McKenzie",
    "PreTA": "true",
    "EquipmentNumber": "Jabbed ",
    "requester": {
        "id": 40130,
        "name": "Cent Requester 1"
    },
    "MaterialRate": "2",
    "EquipmentRate": "4",
    "ShopRate": "3"
};

  const getContigencyRate = (contigencyRate = 1, value) => {
    const parsedVal = parseNumberFromString(value);
    return (
      parsedVal + (parsedVal * parseNumberFromString(contigencyRate)) / 100
    );
  };

  const FCOCalculationChart = ({ values }) => {
    console.log(
      "🚀 ~ file: FcoLogScreen.jsx:206 ~ FCOCalculationChart ~ values:",
      values
    );
    let FCOSections = calculateFCOSections(values?.FCOSections ?? []);
    const totalFCORate = FCOSections.reduce((acc, curr) => acc + curr?.rate, 0);
    const totalFCORateAndAmount = (totalFCORate+parseNumberFromString(values?.EquipmentRate)+parseNumberFromString(values?.MaterialRate));
    const contigencyRateValue = ((totalFCORateAndAmount * parseNumberFromString(values?.Contingency)) / 100).toFixed(2);
    
    const materialContigencyRate = getContigencyRate(values?.Contingency, values?.MaterialRate);
    const equipmentContigencyRate = getContigencyRate(values?.Contingency, values?.EquipmentRate);
    const shopContigencyRate = getContigencyRate(values?.Contingency, values?.ShopRate);

    console.log("🚀 ~ file: FcoLogScreen.jsx:297 ~ FCOCalculationChart ~ FCOSections:", FCOSections)

    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.col}>Total:</Text>
          <Text style={styles.col}>${totalFCORateAndAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Contingency: ({values?.Contingency}%)</Text>
          <Text style={styles.col}>${contigencyRateValue}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Total:</Text>
          <Text style={styles.col}>${(+totalFCORateAndAmount+ +contigencyRateValue).toFixed(2)}</Text>
        </View>
        <Text style={{ fontSize: 18, marginVertical: 15 }}>
          FCO Value Estimate
        </Text>
        <View style={styles.row}>
          <Text style={styles.col}>Labor:</Text>
          <Text style={styles.col}>
            ${totalFCORate}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Material:</Text>
          <Text style={styles.col}>
            ${materialContigencyRate}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Equipment:</Text>
          <Text style={styles.col}>
            ${equipmentContigencyRate}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Shop:</Text>
          <Text style={styles.col}>
            ${shopContigencyRate}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.col, { fontWeight: "bold" }]}>TOTAL:</Text>
          <Text style={[styles.col, { fontWeight: "bold" }]}>${(totalFCORate+materialContigencyRate+equipmentContigencyRate+shopContigencyRate).toFixed(2)}</Text>
        </View>
      </View>
    );
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
                <FCOCalculationChart values={values} />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  col: {
    flex: 1,
    fontSize: 16,
    // fontWeight: "bold",
    color: "#333",
  },
});
