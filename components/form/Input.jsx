// import { Text, HStack, Switch } from "native-base";
import React from "react";
import { TextInput } from "react-native";

export default function Input(props) {
  return <TextInput style={{
    borderColor: "#ccc",
    backgroundColor: 'white',
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16
  }} {...props} />;
}
