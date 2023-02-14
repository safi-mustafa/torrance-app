import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Buttonx from "./form/Buttonx";
import FormLoop from "./form/FormLoop";

const fields = [
  {
    name: "overrideType",
    inputType: "select",
    url: "/OverrideLog/GetOverrideTypes",
    placeholder: "Select Type",
    label: "Override Type",
    zIndex: 3000,
    labelAttributes: "text",
    wrapperStyle: { width: "35%", marginRight: 2 },
  },
  {
    name: "hours",
    placeholder: "Enter hours",
    label: "Hours",
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "25%", marginRight: 2 },
  },
  {
    name: "craftSkill",
    inputType: "select",
    url: "/CraftSkill",
    placeholder: "Select Skill",
    label: "Craft Skill",
    required: true,
    zIndex: 3001,
    wrapperStyle: { width: "30%", marginRight: 2 },
  },
];

const OverrideCostForm = ({ onFormChange, values = [], errors }) => {
  console.log("🚀 ~ file: OverrideCostForm.jsx:40 ~ OverrideCostForm ~ errors", errors)
  const defaultValues = values?.costs ? values?.costs : [];
  const [rows, setRows] = useState(defaultValues);

  const handleAdd = () => {
    const updatedRows = [...rows, { edit: false }];
    setRows(updatedRows);
    // handleSubmitChanges(updatedRows);
    // setClearInput(true);
    // handleClear();
  };

  const handleDelete = (index) => {
    setRows(rows.filter((i, j) => j != index));
  };

  const onValueChange = (key, value, index) => {

    let newVals = rows.map((val, i) => {
      if (i === index) {
        let newVal = value
        if(key=='overrideType'){
          newVal = value?.name
        }
        return { ...val, [key]: newVal };
      }
      return val;
    });

    setRows(newVals);
    onFormChange(newVals);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ marginLeft: 3, fontSize: 15 }}>Costs</Text>
        <View style={[styles.tr, styles.head]}>
          {fields.map((field, i) => (
            <Text key={i} style={[styles.td, field?.wrapperStyle]}>
              {field?.label}
            </Text>
          ))}
          <Text style={styles.td}>
            <Buttonx
              title={<Ionicons name="add-circle" size={24} color="black" />}
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
                padding: 0,
              }}
              onPress={() => handleAdd()}
            />
          </Text>
        </View>
        {rows && rows.map((row, i) => (
          <View key={i} style={[styles.tr, styles.body]}>
            <FormLoop
              fields={fields.map((field) => ({ ...field, label: "" }))}
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
              title={<Ionicons name="remove-circle" size={24} color="black" />}
              style={{
                backgroundColor: "transparent",
                borderWidth: 0,
                padding: 0,
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
    // marginBottom: 10,
  },
});

export default OverrideCostForm;
