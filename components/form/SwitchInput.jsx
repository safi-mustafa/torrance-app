// import { Text, HStack, Switch } from "native-base";
import React from "react";
import { Text, View } from "react-native";

export default function SwitchInput({
  label = "",
  value = false,
  ...otherProps
}) {
  return (
    <View style={{ alignItems: "center", justifyContent: "space-between" }}>
      <Text>{label}</Text>
      {/* <Switch {...otherProps} value={value && value == "1" ? true : false} /> */}
    </View>
  );
}
