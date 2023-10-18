import React, { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";

const Picture = ({
  style = { width: 100, height: 100, backgroundColor: "#eee" },
  source = {},
  ...otherProps
}) => {
  console.log("🚀 ~ file: Picture.jsx:9 ~ source:", source)
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={style}>
      {isLoading && (
        <ActivityIndicator
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          size="large"
        />
      )}
      <Image
        onLoad={() => setIsLoading(false)}
        // onError={() => setIsLoading(false)}
        source={{ uri:  source?.uri }}
        {...otherProps}
      />
    </View>
  );
};

export default Picture;
