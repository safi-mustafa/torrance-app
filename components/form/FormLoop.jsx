import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../constants/Layout";

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
  // console.log("🚀 ~ file: FormLoop.tsx ~ line 18 ~ errors", errors)
  const formatedFields = getConditionalFields(fields, values);

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
                <Text style={styles.label}>{elementAttribs?.label}</Text>
                <View style={styles.inputWrapper}>
                  <Putin {..._props} />
                </View>
                {errors[elementAttribs?.name] && (
                  <Text marginBottom={2} fontSize="sm" color="danger.500">
                    {errors[elementAttribs?.name]}
                  </Text>
                )}
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
    marginBottom: 3,
  },
  inputWrapper: {
    marginBottom: 10
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
