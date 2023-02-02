// import { Text, HStack, Switch } from "native-base";
import React from "react";
import { Text, View, Switch } from "react-native";
import { primaryColor } from "../../constants/Colors";

export default function SwitchInput({
  label = "",
  value = false,
  setFieldValue,
  name,
  ...otherProps
}) {
  return (
    <View>
      <Switch
        trackColor={{ false: "#767577", true: primaryColor }}
        thumbColor={value ? "#fff" : primaryColor}
        ios_backgroundColor="#fff"
        onValueChange={(val) => setFieldValue(name, val)}
        value={value && value == "Yes" ? true : false}
        {...otherProps}
      />
    </View>
  );
}
