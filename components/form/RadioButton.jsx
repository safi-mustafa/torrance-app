import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../../constants/Colors";

function RadioButton({ options, ...props }) {
  const themeColor = props.themeColor ? props.themeColor : primaryColor;
  const onChange = (value) => {
    props.onChangeText(value);
  };

  return (
    <View style={{ flexDirection: "column", marginTop: 5 }}>
      {options &&
        options.map(({ label = "", value = "" }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onChange(value)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <View
                style={[
                  {
                    height: 22,
                    width: 22,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: themeColor,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  props.style,
                ]}
              >
                {props.value == value ? (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: themeColor,
                    }}
                  />
                ) : null}
              </View>
              <Text style={{ marginLeft: 10 }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

export default RadioButton;
