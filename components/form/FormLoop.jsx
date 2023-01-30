import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../constants/Layout";
import { toCapitalCase } from "../../utility";

import Putin from "./Putin";

export default function FormLoop({
  fields,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  setFieldValue,
}) {
  // console.log("🚀 ~ file: FormLoop.tsx ~ line 18 ~ errors", errors);
  const formatedFields = getConditionalFields(fields, values);

  const getError = (errors, { name = "", inputType = null }) => {
    let errorField = toCapitalCase(name);
    if(inputType == "select"){
      errorField = `${errorField}.Id`
    }
    return errors[errorField];
  };

  return (
    <View>
      {formatedFields.map((elementAttribs, index) => {
        let _props = {
          form: elementAttribs,
          onChangeText: handleChange(elementAttribs.name),
          onBlur: handleBlur(elementAttribs.name),
          value: values[elementAttribs.name],
          setFieldValue: setFieldValue,
        };

        if (elementAttribs?.name == "submit")
          _props = { ..._props, onPress: handleSubmit };
        else if (elementAttribs?.inputType == "switch")
          _props = {
            ..._props,
            onValueChange: (value) => setFieldValue(elementAttribs.name, value),
          };

        return (
          <View key={elementAttribs?.name}>
            {!elementAttribs?.hidden && (
              <View>
                {elementAttribs?.label && (
                  <Text
                    style={{ ...styles.label, ...elementAttribs?.labelStyle }}
                  >
                    {elementAttribs?.label}
                  </Text>
                )}
                <View style={styles.inputWrapper}>
                  <Putin {..._props} />

                  <Text style={styles.inputError}>
                    {getError(errors, elementAttribs)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 2,
    color: "#333",
  },
  inputWrapper: {
    marginBottom: 0,
  },
  inputError: {
    color: "red",
    minHeight: 20,
    marginTop: 2,
    marginBottom: 5,
    // position: "absolute"
  },
});

function getConditionalFields(fields, values) {
  return fields.map(({ condition = null, ...field }) => {
    if (!condition) return field;
    const parentFieldName = condition?.fieldName;
    let parentFieldValue = values[parentFieldName];
    if (condition?.action == "hide") {
      parentFieldValue =
        typeof parentFieldValue !== "undefined"
          ? parentFieldValue
          : getDefaultValue(fields, parentFieldName, "defaultIsChecked");

      // console.log("🚀 ~ file: FormLoop.tsx ~ line 91 ~ returnfields.map ~ parentFieldValue", field.name, parentFieldValue, JSON.parse(condition?.matchValue))
      if (parentFieldValue == JSON.parse(condition?.matchValue)) {
        return { ...field, condition, hidden: true };
      }
    }
    return field;
  });
}

function getDefaultValue(fields, name, key) {
  const searchedField = fields.find((field) => field.name == name);
  // console.log("🚀 ~ file: FormLoop.tsx ~ line 106 ~ getDefaultValue ~ searchedField[key]", searchedField[key])
  return searchedField[key];
}
