import React from 'react';
import { Image, TouchableOpacity, Text, View  } from "react-native";

import appStyles from "../app-styles";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function DashButton({
  title = "",
  subtitle = "",
  style = {},
  icon = "",
  ...otherProps
}) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors[colorScheme].background,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        width: "100%",
        ...style,
      }}
      {...otherProps}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon && <Image style={{height: 35, width: 35, marginRight: 20}} source={icon} />}
        <View>
          {/* <Text style={{ color: "#ccc" }}>Quick Submit</Text> */}
          <Text style={[{fontSize: 16}, appStyles.fw500, appStyles.my1]}>
            {title}
          </Text>
          <Text style={{ color: "#999" }}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
