import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
  formStyle = {},
  showYupErrors = false,
  touched,
}) {
  // console.log("🚀 ~ file: FormLoop.jsx:19 ~ fields:", fields)
  // console.log("🚀 ~ file: FormLoop.tsx ~ line 18 ~ errors", errors);
  const formatedFields = getConditionalFields(fields, values);

  const getError = (errors, { name = "", inputType = null }) => {
    // console.log("🚀 ~ file: FormLoop.jsx:22 ~ getError ~ errors:", errors, name)
    if (typeof errors != "object") return null;

    if (showYupErrors && errors[name]) {
      // console.log("🚀 ~ file: FormLoop.jsx:30 ~ getError ~ errors[name]:", errors, touched[name] || errors[name])
      if (typeof errors[name] === "object") {
        return errors[name].name;
      }
      return errors[name];
    }

    let errorField = toCapitalCase(name);
    if (
      inputType == "select" &&
      errorField != "AlphabeticPart" &&
      errorField != "NumericPart" &&
      errorField != "DelayReason"
    ) {
      errorField = `${errorField}.Id`;
    }
    if (name == "twrText") {
      errorField = `TWRModel.Text`;
    }
    if (errorField == "OverrideType.Id") {
      errorField = `OverrideType`;
    }
    // console.log("🚀 ~ file: FormLoop.jsx:22 ~ getError ~ errors:", errors, name, errorField)

    // console.log("🚀 ~ file: FormLoop.jsx:38 ~ getError ~ errors[errorField]:", errors[errorField], errorField)
    return errors[errorField];
  };

  return (
    <View style={formStyle}>
      {formatedFields
        .filter((elementAttribs) => !elementAttribs?.hidden)
        .map((elementAttribs, index) => {
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
              onValueChange: (value) =>
                setFieldValue(elementAttribs.name, value),
            };
          

          return (
            <View
              key={elementAttribs?.name}
              style={[
                { width: "100%", alignSelf: "flex-start" },
                elementAttribs?.wrapperStyle,
              ]}
            >
              {!elementAttribs?.hidden && (
                <View>
                  {elementAttribs?.label && (
                    <Text
                      style={{ ...styles.label, ...elementAttribs?.labelStyle }}
                    >
                      {elementAttribs?.label}
                      {elementAttribs?.required && (
                        <Text style={{ color: "red", paddingLeft: 2 }}>*</Text>
                      )}
                    </Text>
                  )}
                  <View style={styles.inputWrapper}>
                    <Putin {..._props} />

                    {getError(errors, elementAttribs) && (
                      <Text style={styles.inputError}>
                        {getError(errors, elementAttribs)}
                      </Text>
                    )}
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
    marginBottom: 10,
  },
  inputError: {
    color: "red",
    // minHeight: 20,
    marginTop: 2,
    marginBottom: 10,
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
      const matchFieldValue = condition?.matchValue;
      console.log(
        "🚀 ~ file: FormLoop.jsx:121 ~ returnfields.map ~ matchFieldValue",
        matchFieldValue,
        parentFieldValue
      );
      if (parentFieldValue == matchFieldValue) {
        return { ...field, condition, hidden: true };
      }
    } else if (condition?.action == "show") {
      parentFieldValue =
        typeof parentFieldValue !== "undefined"
          ? parentFieldValue
          : getDefaultValue(fields, parentFieldName, "defaultIsChecked");

      // console.log("🚀 ~ file: FormLoop.tsx ~ line 91 ~ returnfields.map ~ parentFieldValue", field.name, parentFieldValue, JSON.parse(condition?.matchValue))
      const matchFieldValue = condition?.matchValue;
      // console.log(
      //   "🚀 ~ file: FormLoop.jsx:135 ~ returnfields.map ~ matchFieldValue:",
      //   matchFieldValue
      // );
      // console.log(
      //   "🚀 ~ file: FormLoop.jsx:137 ~ returnfields.map ~ parentFieldValue:",
      //   parentFieldValue
      // );
      // console.log(
      //   "🚀 ~ file: FormLoop.jsx:139 ~ returnfields.map ~ field:",
      //   field
      // );
      if (field.inputType == "select" && field?.isEnum != true) {
        parentFieldValue = parentFieldValue?.id;
      }
      if (parentFieldValue !== matchFieldValue) {
        return { ...field, condition, hidden: true };
      }
    } else if (condition?.action === "useValue") {
      if (field?.inputType === "select") {
        const ddParentFieldObject = values[parentFieldName];
        // console.log("🚀 ~ file: FormLoop.jsx:117 ~ returnfields.map ~ ddParentFieldObject", ddParentFieldObject)
        // console.log("🚀 ~ file: FormLoop.jsx:117 ~ returnfields.map ~ ddParentFieldObject", values, parentFieldName)
        let ddParentFieldValue = ddParentFieldObject?.value
          ? ddParentFieldObject?.value
          : ddParentFieldObject?.id;
        // console.log("🚀 ~ file: FormLoop.jsx:119 ~ returnfields.map ~ ddParentFieldValue", ddParentFieldValue)
        const conditionalOperator = field?.url.includes("?") ? "&" : "?";
        const params = ddParentFieldValue
          ? `${conditionalOperator}${condition?.paramField}=${ddParentFieldValue}`
          : "";
        const compiledUrl = `${field?.url}${params}`;

        return {
          ...field,
          url: compiledUrl,
          // value: {id: 0}
        };
      }
      return field;
    }
    return field;
  });
}

function getDefaultValue(fields, name, key) {
  const searchedField = fields.find((field) => field.name == name);
  // console.log("🚀 ~ file: FormLoop.tsx ~ line 106 ~ getDefaultValue ~ searchedField[key]", searchedField[key])
  return searchedField[key];
}
