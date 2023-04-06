import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Buttonx from "./form/Buttonx";
import FormLoop from "./form/FormLoop";
import { getKey } from "../utility";

const OverrideCostForm = ({ onFormChange, values = [], errors }) => {
  const formatCostValues = (costValues) => {
    let t = costValues.map((cost) => ({
      ...cost,
      overrideType: { id: cost.overrideType, name: cost.overrideType },
    }));
    // console.log("🚀 ~ file: OverrideCostForm.jsx:12 ~ formatCostValues ~ t", t)
    return t;
  };

  const defaultValues = values?.costs ? formatCostValues(values?.costs) : [];
  const [rows, setRows] = useState(defaultValues);
  const [user, setUser] = useState({});

  const getUserDetail = async () => {
    const userMeta = await getKey("user");
    const { userDetail = {} } = JSON.parse(userMeta);
    setUser(userDetail);
  };

  const fields = [
    {
      name: "overrideType",
      inputType: "select",
      // url: "/OverrideLog/GetOverrideTypes",
      options: [
        {
          value: "ST",
          label: "ST",
        },
        {
          value: "OT",
          label: "OT",
        },
        {
          value: "DT",
          label: "DT",
        },
      ],
      placeholder: "Select Type",
      label: "Override Type",
      zIndex: 3000,
      // labelAttributes: "text",
      wrapperStyle: { width: "48%", marginRight: 1 },
    },
    {
      name: "overrideHours",
      placeholder: "Enter hours",
      label: "Hours",
      // inputType: "text",
      keyboardType: "numeric",
      wrapperStyle: { width: "48%", marginRight: 1 },
    },
    {
      name: "craftSkill",
      inputType: "select",
      url: "/CraftSkill?Company.Id=" + user?.company?.id,
      placeholder: "Select Skill",
      label: "Craft Skill",
      required: true,
      zIndex: 3001,
      wrapperStyle: { width: "48%", marginRight: 1 },
    },
    {
      name: "headCount",
      placeholder: "Enter Head Count",
      label: "Head Count",
      // inputType: "text",
      keyboardType: "numeric",
      wrapperStyle: { width: "48%", marginRight: 1 },
    },
  ];

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleAdd = () => {
    const updatedRows = [...rows, { edit: false }];
    setRows(updatedRows);
    // handleSubmitChanges(updatedRows);
    // setClearInput(true);
    // handleClear();
  };

  const handleDelete = (index) => {
    let removedRows = rows.filter((i, j) => j != index);
    setRows(removedRows);
    onFormChange(removedRows);
  };

  const onValueChange = (key, value, index) => {
    // console.log("🚀 ~ file: OverrideCostForm.jsx:98 ~ onValueChange ~ key, value:", key, value)
    let newVals = rows.map((val, i) => {
      if (i === index) {
        let newVal = value;
        if (key == "overrideType") {
          newVal = value?.name;
        }
        return { ...val, [key]: newVal };
      }
      return val;
    });

    // console.log("🚀 ~ file: OverrideCostForm.jsx:101 ~ onValueChange ~ newVals", newVals)
    setRows(newVals);
    onFormChange(newVals);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.tr, {justifyContent:'space-between', marginBottom: 20}]}>
          <Text style={{ marginLeft: 3, fontSize: 15, alignSelf:'center' }}>
            Costs
          </Text>
            <Buttonx
              title={<Ionicons name="add-circle" size={30} color="black" />}
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
                padding: 0,
              }}
              onPress={() => handleAdd()}
            />
        </View>
        <View style={[styles.tr, styles.head]}>
          {/* {fields.map((field, i) => (
            <Text key={i} style={[styles.td, field?.wrapperStyle]}>
              {field?.label}
            </Text>
          ))} */}
        </View>
        {rows &&
          rows.map((row, i) => (
            <View key={i} style={[styles.tr, styles.body]}>
              <FormLoop
                fields={fields.map((field) => ({ ...field }))}
                handleChange={(key, value) => {}}
                handleBlur={(key, value) => {}}
                setFieldValue={(key, value) => {
                  onValueChange(key, value, i);
                }}
                values={rows[i]}
                errors={{}}
                handleSubmit={() => {}}
                formStyle={styles.tr}
              />
              <Buttonx
                title={
                  <Ionicons name="remove-circle" size={30} color="darkred" />
                }
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  position: "absolute",
                  top: -10,
                  right: -10,
                }}
                onPress={() => handleDelete(i)}
              />
            </View>
          ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  tr: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  td: {
    // textAlign: "left",
    // backgroundColor: 'red',
    // width: "32%",
    paddingHorizontal: 5,
  },
  head: {
    marginBottom: 0,
  },
  body: {
    justifyContent: "flex-end",
    // borderWidth: 1,
    backgroundColor: "#ddd",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
  },
});

export default OverrideCostForm;
