import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";

import Layout from "../constants/Layout";

const Loader = ({ show = false, overlay = false, ...otherProps }) => {
  return (
    <>
      {show && (
        <View style={overlay && styles.overlayStyle}>
          <ActivityIndicator {...otherProps} />
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
  },
};

export default Loader;
