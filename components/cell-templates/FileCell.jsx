import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";

import { primaryColor } from "../../constants/Colors";

const iconSources = {
  ".jpg": require("./../../assets/images/jpg.png"),
  ".jpeg": require("./../../assets/images/jpeg.png"),
  ".doc": require("./../../assets/images/docx.png"),
  ".docx": require("./../../assets/images/docx.png"),
  ".pptx": require("./../../assets/images/pptx.png"),
  ".png": require("./../../assets/images/png.png"),
  ".pdf": require("./../../assets/images/pdf.png"),
  ".xlsx": require("./../../assets/images/xlsx.png"),
};

export default function FileCell({ item, navigation, cellOptions = {} }) {
  // const [downloadProgress, setDownloadProgress] = React.useState();

  const downloadFile = (url) => {
    if (Platform.OS == "ios") onFileShare(url);
  };

  const onFileShare = async (uri) => {
    console.log("🚀 ~ file: FileCell.jsx ~ line 34 ~ onFileShare ~ uri", uri)
    const shareResult = await Sharing.shareAsync(uri);
  };

  return (
    <>
      <View style={styles.labelWrapper}>
        <Image
          source={iconSources[item?.type]}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text style={styles.label}>{item?.name}</Text>
      </View>
      <Pressable
        onPress={() => downloadFile(item?.url)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name="cloud-download"
          size={25}
          color={primaryColor}
          style={{ marginRight: 10 }}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    textTransform: "capitalize",
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});
