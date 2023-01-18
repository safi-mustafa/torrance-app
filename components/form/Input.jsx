// import { Text, HStack, Switch } from "native-base";
import React from "react";
import { TextInput } from "react-native";
import appStyles from "../../app-styles";

export default function Input(props) {
  return (
    <TextInput
      style={{
        borderColor: "#ccc",
        width: "100%",
        ...appStyles.input,
      }}
      {...props}
    />
  );
}
