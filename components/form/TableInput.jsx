// import { Text, HStack, Switch } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import appStyles from "../../app-styles";
import Buttonx from "./Buttonx";
import FormLoop from "./FormLoop";
import Putin from "./Putin";
import { Ionicons } from "@expo/vector-icons";

export default function TableInput({
  name,
  fields = [],
  // setFieldValue,
  value = [],
  ...props
}) {
  console.log("🚀 ~ file: TableInput.jsx:17 ~ fields", fields)
  // const defaultForm = fields.reduce((c, v) => {
  //   return { ...c, [v.name]: { ...v, value: "" } };
  // }, {});
  // console.log(
  //   "🚀 ~ file: TableInput.jsx:18 ~ defaultForm ~ defaultForm",
  //   defaultForm
  // );

  const defaultForm = [];

  const [clearInput, setClearInput] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [rows, setRows] = useState([1,2]);

  useEffect(() => {
    const initialRows = value ? value : [];
    if (!value?.edit && rows.length == 0) {
      // setRows(initialRows);
    }
  }, [value]);

  const handleChange = (values) => {
    console.log("🚀 ~ file: TableInput.jsx:14 ~ handleChange ~ values", values);
    // setFieldValue(name, values);
  };

  const setFieldValue = (values) => {
    console.log(
      "🚀 ~ file: TableInput.jsx:20 ~ setFieldValue ~ values",
      values
    );
    // setFieldValue(name, values);
  };

  const handleBlur = (values) => {
    console.log("🚀 ~ file: TableInput.jsx:29 ~ handleBlur ~ values", values);
    // setFieldValue(name, values);
  };

  const handleClear = () => {
    setForm(defaultForm);
  };

  const handleSubmitChanges = (updatedRows) => {
    setRows(updatedRows);
    // onChange({ target: { name, value: updatedRows } });
  };

  const handleAdd = () => {
    // if (checkRequired()) {
    const updatedRows = [...rows, { ...form, edit: false }];
    console.log("🚀 ~ file: TableInput.jsx:70 ~ handleAdd ~ updatedRows", updatedRows)
    handleSubmitChanges(updatedRows);
    setClearInput(true);
    handleClear();
    // }
  };

  const handleHeaderChange = (evt, def) => {
    console.log(
      "🚀 ~ file: TableInput.jsx:45 ~ handleHeaderChange ~ evt, def",
      evt,
      def
    );
    setClearInput(false);
    // handleChange(evt, def);
  };

  return (
    <>
      <View style={styles.tr}>
        <View style={styles.td}>
          <Buttonx
            title={<Ionicons name="add-circle" size={34} color="black" />}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
            onPress={() => handleAdd()}
          />
        </View>
      </View>
      {/* {rows.map((row, j) => { */}
        <View>
          {fields.map((col, index) => {
            let columnData = col;

            if (!clearInput) {
              columnData = { ...columnData, ...form[col.name] };
            } else {
              columnData = { ...columnData, value: "" };
            }
            return (
              <View key={index}>
                {col && (<>
                  <Putin
                    // {...col}
                    { ...columnData }
                    // attributes={{ ...columnData }}
                    // name={col.name} 
                    onChange={(evt) => handleHeaderChange(evt, col)}
                  />
                  </>
                )}
              </View>
            );
          })}
        </View>
      {/* })} */}
    </>
  );
}

const styles = StyleSheet.create({
  tr: {},
  td: {},
});
