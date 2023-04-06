import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;

import { primaryColor } from "../../constants/Colors";
import { STORAGE_URL } from "../../constants/Misc";
import { getFormatedDate } from "../../utility";

const iconSources = {
  ".jpg": require("./../../assets/images/jpg.png"),
  ".jpeg": require("./../../assets/images/jpeg.png"),
  ".doc": require("./../../assets/images/docx.png"),
  ".docx": require("./../../assets/images/docx.png"),
  ".pptx": require("./../../assets/images/pptx.png"),
  ".png": require("./../../assets/images/png.png"),
  ".pdf": require("./../../assets/images/pdf.png"),
  ".xlsx": require("./../../assets/images/xlsx.png"),
  "link": require("./../../assets/images/link.png"),
};

export default function FileCell({ item, navigation, cellOptions = {} }) {
  // console.log("🚀 ~ file: FileCell.jsx ~ line 30 ~ FileCell ~ item", item)
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");

  const ensureDirAsync = async (dir, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir);
    if (props.exist && props.isDirectory) {
      return props;
    }
    let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates });
    return await ensureDirAsync(dir, intermediates);
  };

  const downloadCallback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadFile = async (fileUrl) => {
    // console.log("🚀 ~ file: FileCell.jsx ~ line 53 ~ downloadFile ~ fileUrl", fileUrl)
    if (Platform.OS == "android") {
      const dir = ensureDirAsync(downloadPath);
    }

    let fileName = fileUrl.replace(/^.*[\\\/]/, "");
    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      downloadPath + fileName,
      {},
      downloadCallback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      // console.log("🚀 ~ file: FileCell.jsx ~ line 69 ~ downloadFile ~ fileName", fileName)
      if (Platform.OS == "android") saveAndroidFile(uri, fileName);
      else saveIosFile(uri);
    } catch (e) {
      console.error("download error:", e);
    }
  };

  const saveAndroidFile = async (fileUri, fileName = "File") => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            alert("Report Downloaded Successfully");
          })
          .catch((e) => {});
      } catch (e) {
        throw new Error(e);
      }
    } catch (err) {}
  };

  const saveIosFile = async (uri) => {
    console.log("🚀 ~ file: FileCell.jsx ~ line 107 ~ saveIosFile ~ uri", uri);
    await Sharing.shareAsync(uri);
  };

  const openUrl = ({url}) => {
    Linking.openURL(url).catch((err) => console.error("Error", err));
  }

  const onPressFile = (item) => {
    if(item?.type=='link')
    openUrl(item);
    else
    downloadFile(STORAGE_URL + item?.url);
  };

  return (
    <>
      <View style={styles.labelWrapper}>
        <Image
          source={iconSources[item?.type]}
          resizeMode="contain"
          style={styles.icon}
        />
        <View>
          <Text style={styles.label}>{item?.name}</Text>
          <Text style={{ color: "#999", fontSize: 12, marginTop: 2 }}>
            {getFormatedDate(item?.createdOn)}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => onPressFile(item)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View style={styles.downloadIconWrapper}>
          {downloadProgress && (
            <Text style={styles.downloadText}>
              {Math.floor(downloadProgress * 100)}%
            </Text>
          )}
          <FontAwesome
            name="cloud-download"
            size={25}
            color={primaryColor}
            style={{ marginRight: 10 }}
          />
        </View>
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
  downloadIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadText: {
    color: "green",
    marginRight: 5,
    fontSize: 12,
  },
});
