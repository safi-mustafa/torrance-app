import { Formik } from "formik";
import { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import putData from "../api-services/putData";

import appStyles from "../app-styles";
import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { fcoFields } from "../fields/fco.fields";
import useUserMeta from "../hooks/useUserMeta";
import { BASE_URL, USER_ROLE } from "../constants/Misc";
import { parseNumberFromString } from "../utility";
import getData from "../api-services/getData";

export default function FcoScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [craftSkills, setCraftSkills] = useState([]);

  const { params = {} } = route;
  let initialValues = params?.id ? { ...params } : {};
  const isEdit = params && params.id;
  if (isEdit)
    console.log("🚀 ~ file: FcoLogScreen.jsx:28 ~ FcoScreen ~ params:", params);

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
      const { MN = 0, DU = 0, overrideType = 0, craft = {} } = fco;
      let rate = 0;
      if (MN && DU && overrideType && craft?.id != 0) {
        craftSkills.forEach((skill) => {
          if (skill.id == craft?.id) {
            rate = skill[`${overrideType.toLowerCase()}Rate`] * MN * DU;
          }
        });
        return { ...fco, rate };
      } else return { ...fco, rate: 0 };
    });
  };

  const getContigencyRate = (contigencyRate = 1, value) => {
    const parsedVal = parseNumberFromString(value);
    return (
      parsedVal + (parsedVal * parseNumberFromString(contigencyRate)) / 100
    );
  };

  const fcoCalulations = (values = {}) => {
    let FCOSections = calculateFCOSections(values?.fcoSections ?? []);
    // console.log("🚀 ~ file: FcoLogScreen.jsx:83 ~ fcoCalulations ~ FCOSections:", FCOSections)
    const totalFCORate = FCOSections.reduce((acc, curr) => acc + curr?.rate, 0);
    const totalFCORateAndAmount =
      totalFCORate +
      parseNumberFromString(values?.equipmentRate) +
      parseNumberFromString(values?.materialRate);
    const contigencyRateValue = (
      (totalFCORateAndAmount * parseNumberFromString(values?.contingency)) /
      100
    ).toFixed(2);

    const materialContigencyRate = getContigencyRate(
      values?.contingency,
      values?.materialRate
    );
    const equipmentContigencyRate = getContigencyRate(
      values?.contingency,
      values?.equipmentRate
    );
    const shopContigencyRate = getContigencyRate(
      values?.contingency,
      values?.shopRate
    );

    const total =
      totalFCORate +
      materialContigencyRate +
      equipmentContigencyRate +
      shopContigencyRate;

    return {
      FCOSections,
      totalFCORate,
      totalFCORateAndAmount,
      contigencyRateValue,
      materialContigencyRate,
      equipmentContigencyRate,
      shopContigencyRate,
      total,
    };
  };

  const onSubmit = async (formValues = [], { setSubmitting }) => {
    const {
      fcoSections,
      total,
      totalFCORateAndAmount,
      contigencyRateValue,
      materialContigencyRate,
      equipmentContigencyRate,
      shopContigencyRate,
    } = fcoCalulations(formValues);
    let params = {
      ...formValues,
      requester: { id: userMeta?.id, name: userMeta?.name },
      fcoSections: formValues?.fcoSections ?? fcoSections,
      total,
      totalShop: shopContigencyRate,
      totalEquipment: equipmentContigencyRate,
      totalMaterial: materialContigencyRate,
      subTotal: +totalFCORateAndAmount + +contigencyRateValue,
      totalLabor: totalFCORateAndAmount,
    };

    params = isEmployee
      ? {
          ...params,
          company: { id: userMeta?.company?.id, name: userMeta?.company?.name },
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
          // formData.append(`${key}.name`, value?.name);
          // formData.append(`${key}.Type`, JSON.stringify(value?.type));
        } else formData.append(key, value);
      }
    };

    appendToFormData(params);

    // console.log(
    //   "🚀 ~ file: FcoLogScreen.jsx:89 ~ onSubmit ~ formData:",
    //   formData
    // );

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
    id: 48,
    descriptionOfFinding: "Nil",
    additionalInformation: null,
    equipmentNumber: "HF112",
    location: "Rawalpindi ",
    preTA: true,
    shutdownRequired: false,
    scaffoldRequired: true,
    srNo: 3,
    srNoFormatted: "Alky-003",
    date: "2023-08-17T00:00:00",
    approvalDate: null,
    dateFormatted: "08/16/2023 05:00 PM",
    approvalDateFormatted: null,
    documentationRequired: ["1"],
    contractor: null,
    company: {
      name: "Acuren",
      errorMessage: "The Company field is required.",
      isValidationEnabled: true,
      id: 1,
    },
    employee: {
      name: "Cent Requester 1",
      email: "admin@centangle.com",
      errorMessage: "",
      isValidationEnabled: false,
      id: 40130,
    },
    department: null,
    unit: {
      id: 6,
      name: "Alky",
    },
    fcoType: {
      id: 1,
      name: "FCO Type 1.",
    },
    fcoReason: {
      id: 1,
      name: "Reason",
    },
    designatedCoordinator: {
      name: "Cent Requester 1",
      errorMessage: "The Authorize For Immediate Start field is required.",
      isValidationEnabled: false,
      id: 40130,
    },
    totalCost: 46.8,
    totalCostFormatted: "$46.80",
    totalHours: 0,
    totalHeadCount: 0,
    materialName: "Cement ",
    materialRate: 12,
    equipmentName: "Crain",
    equipmentRate: 22,
    shopName: "Shop 2",
    shopRate: 5,
    otherDocumentionFormatted: "",
    fcoSections: [
      {
        edit: false,
        craft: {
          id: 38,
          name: "Administrator ",
        },
        overrideType: "OT",
        MN: "3",
        DU: "4",
      },
    ],
    photo: {
      file: null,
      url: null,
      previewImgUrl: "/img/file-icons/default.png",
      attachmentTypeStr: "file",
      type: "",
      name: null,
      fileType: "BadgeRoom",
      attachmentType: "File",
      uploadDate: "0001-01-01T00:00:00",
      folder: {
        name: null,
        errorMessage: "The Folder field is required.",
        isValidationEnabled: false,
        id: null,
      },
      entityType: "FCOLogPhoto",
    },
    file: {
      file: null,
      url: null,
      previewImgUrl: "/img/file-icons/default.png",
      attachmentTypeStr: "file",
      type: "",
      name: null,
      fileType: "BadgeRoom",
      attachmentType: "File",
      uploadDate: "0001-01-01T00:00:00",
      folder: {
        name: null,
        errorMessage: "The Folder field is required.",
        isValidationEnabled: false,
        id: null,
      },
      createdOn: "0001-01-01T00:00:00",
      entityId: null,
      entityType: "FCOLogFile",
      id: 0,
      isCreated: true,
      formattedStatus: "",
    },
    attachments: null,
    total: 40.95,
    contingency: 5,
    contingencies: 6.8,
    subTotal: 35.7,
    totalLabor: 34,
    totalMaterial: 12.6,
    totalEquipment: 23.1,
    totalShop: 5.25,
    sectionTotal: 46.8,
    fcoComments: [],
    fcoCommentsClass: "",
    isUnauthenticatedApproval: false,
    notificationId: "00000000-0000-0000-0000-000000000000",
    status: "Pending",
    formattedStatus: "Pending",
    isEditRestricted: false,
    approver: {
      name: null,
      errorMessage: "",
      isValidationEnabled: false,
      id: null,
    },
    activeStatus: 0,
    requester: {
      id: 40130,
      name: "Cent Requester 1",
    },
  };

  initialValues = {};

  const FCOCalculationChart = ({ values }) => {
    // console.log(
    //   "🚀 ~ file: FcoLogScreen.jsx:206 ~ FCOCalculationChart ~ values:",
    //   values
    // );
    const {
      totalFCORateAndAmount,
      contigencyRateValue,
      totalFCORate,
      materialContigencyRate,
      equipmentContigencyRate,
      shopContigencyRate,
      total,
    } = fcoCalulations(values);

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
          <Text style={styles.col}>
            ${(+totalFCORateAndAmount + +contigencyRateValue).toFixed(2)}
          </Text>
        </View>
        <Text style={{ fontSize: 18, marginVertical: 15 }}>
          FCO Value Estimate
        </Text>
        <View style={styles.row}>
          <Text style={styles.col}>Labor:</Text>
          <Text style={styles.col}>${totalFCORate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Material:</Text>
          <Text style={styles.col}>${materialContigencyRate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Equipment:</Text>
          <Text style={styles.col}>${equipmentContigencyRate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col}>Shop:</Text>
          <Text style={styles.col}>${shopContigencyRate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.col, { fontWeight: "bold" }]}>TOTAL:</Text>
          <Text style={[styles.col, { fontWeight: "bold" }]}>
            ${total.toFixed(2)}
          </Text>
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
