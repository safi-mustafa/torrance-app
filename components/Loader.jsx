import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";

import Layout from "../constants/Layout";

const Loader = ({
  show = false,
  overlay = false,
  color = "rgba(0,0,0,0.3)",
  bgColor = "rgba(0,0,0,0.3)",
  style = {},
  ...otherProps
}) => {
  return (
    <>
      {show && (
        <View
          style={[
            overlay && { ...styles.overlayStyle, backgroundColor: bgColor },
            style,
          ]}
        >
          <ActivityIndicator {...otherProps} color={color}/>
        </View>
      )}
    </>
  );
};
const styles = {
  overlayStyle: {
    position: "absolute",
    height: Layout.window.height,
    width: "100%",
    // backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
  },
};

export default Loader;
