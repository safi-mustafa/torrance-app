import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import Buttonx from "./form/Buttonx";
import FormLoop from "./form/FormLoop";
import { USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";
import { parseCostsModelState } from "../utility";

const MultiGroupFields = ({
  values = [],
  errors = {},
  fields = [],
  title = "",
  name,
  ...otherProps
}) => {
  const newErrors = parseCostsModelState(errors);

  const formatCostValues = (costValues) => {
    let t = costValues.map((cost) => ({
      ...cost,
      overrideType: { id: cost.overrideType, name: cost.overrideType },
      craftSkill: { id: cost.craftSkill.id, name: cost.craftSkill.name },
    }));
    return t;
  };

  const { role = "", userMeta } = useUserMeta();
  const isApprover = USER_ROLE.APPROVER == role;
  const defaultValues = values?.costs ? formatCostValues(values?.costs) : [];

  const [rows, setRows] = useState([...defaultValues]);

  const onFormChange = (newVals) => {
    otherProps.setFieldValue(name, newVals);
  };

  const handleAdd = () => {
    // if (isApprover && userMeta?.canAddLogs && !values.company?.name) {
    //   Toast.show({
    //     type: "error",
    //     text1: title,
    //     text2: "Please choose company to add cost.",
    //   });
    //   return;
    // }
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
    setRows(newVals);
    onFormChange(newVals);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.tr,
            { justifyContent: "space-between", marginBottom: 20, marginTop: -35 },
          ]}
        >
          <Text style={{ marginLeft: 3, fontSize: 15, alignSelf: "center" }}>
            {title}
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
        {(isApprover && userMeta?.canAddLogs
          ? values.company?.name
          : userMeta?.company) &&
          rows &&
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
                errors={newErrors && newErrors[i]}
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
        {rows.length == 0 && errors?.Costs && (
          <View>
            <Text style={{ color: "red" }}>{errors?.Costs}</Text>
          </View>
        )}
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

export default MultiGroupFields;
