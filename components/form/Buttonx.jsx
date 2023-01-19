// import { Text, HStack, Switch } from "native-base";
import React from "react";
import { Pressable, Text } from "react-native";
import appStyles from "../../app-styles";

export default function Buttonx({
  style = {},
  title = "",
  titleStyle = {},
  ...props
}) {
  return (
    <Pressable
      style={{
        ...appStyles.btn,
        ...appStyles.btnPrimary,
        ...style,
      }}
      {...props}
    >
      <Text
        style={[
          { textAlign: "center", ...appStyles.btnTextPrimary, ...titleStyle },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
