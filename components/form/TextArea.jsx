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
        minHeight: 40,
        textAlignVertical: 'top',
        ...style,
      }}
      numberOfLines={4}
      multiline={true}
      {...props}
    />
  );
}
