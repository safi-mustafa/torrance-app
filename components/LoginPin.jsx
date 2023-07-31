import { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import Layout from "../constants/Layout";

export default function LoginPin({ navigation, onSubmit }) {
  const CELL_COUNT = 4;
  const [value, setValue] = useState(null);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onValueChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (value && value.length === 4) {
      onSubmit(value);
    }
  }, [value]);

  return (
    <>
      <CodeField
        testID="codeField"
        value={value}
        onChangeText={onValueChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 0,
  },
  cell: {
    width: 55,
    height: 70,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 2,
    borderColor: "#cccccc",
    color: "#cccccc",
    textAlign: "center",
    marginRight: 10,
  },
  focusCell: {
    borderColor: "#ffffff",
    color: "#ffffff",
  },
});
