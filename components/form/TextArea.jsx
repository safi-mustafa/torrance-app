// import { Text, HStack, Switch } from "native-base";
import React from "react";
import Input from "./Input";

export default function TextArea({ style = {}, ...props }) {
  return (
    <Input
      style={{
        borderColor: "#ccc",
        backgroundColor: "white",
        width: "100%",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        minHeight: 60,
        ...style,
      }}
      numberOfLines={5}
      multiline={true}
      {...props}
    />
  );
}
