import React, { useState, useEffect, useRef } from "react";
import { Alert, AppState, Platform } from "react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";

import getData from "../api-services/getData";
import { compareVersions } from "../utility";

function UpdateNeeded() {
  const [validateConfig, setValidateConfig] = useState(null);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    validateVersionUpdate();
    checkForUpdate();
    return () => {};
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        checkForUpdate();
        validateVersionUpdate();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  //check OTA updates
  async function checkForUpdate() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await downloadUpdate();
      }
    } catch (error) {
      console.error("Error checking for update:", error);
    }
  }

  //show OTA alert box
  async function downloadUpdate() {
    try {
      await Updates.fetchUpdateAsync();
      Alert.alert(
        "Update Downloaded",
        "The update has been downloaded. Please restart the app to apply the changes.",
        [
          {
            text: "OK",
            onPress: () => {
              Updates.reloadAsync();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error downloading update:", error);
    }
  }

  const validateVersionUpdate = () => {
    getData(
      { url: "/UpdateStatus" },
      (response) => {
        const res = response?.data;
        console.log(
          "🚀 ~ file: UpdateNeeded.jsx:20 ~ validateVersionUpdate ~ res:",
          res
        );
        setValidateConfig(res);
        onVersionCheck(res);
      },
      (error) => {
        console.log(
          "🚀 ~ file: UpdateNeeded.jsx:22 ~ validateVersionUpdate ~ error:",
          error
        );
      }
    );
  };

  const openAppStore = () => {
    const storeUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/us/app/torrance-refining/id1493318265" // Replace with your iOS app's App Store URL
        : "market://details?id=com.torrance.torrance"; // Replace with your Android app's package name

    Linking.openURL(storeUrl).catch((error) =>
      console.error("An error occurred", error)
    );
  };

  const onVersionCheck = (config) => {
    let alertConfig = [
      {
        text: "Update",
        onPress: () => {
          // VersionCheck.openAppStore();
          openAppStore();
        },
      },
    ];

    if (!config?.isForcible) {
      alertConfig = [
        ...alertConfig,
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ];
    } else {
      alertConfig = [...alertConfig, { cancelable: false }];
      if (Platform.OS === "android") {
        alertConfig = [
          ...alertConfig,
          { text: "OK", onPress: () => openAppStore() },
        ];
      }
    }

    //   VersionCheck.needUpdate({
    //     currentVersion: VersionCheck.getCurrentVersion(),
    //     latestVersion: config?.latestVersion, //Constants.expoConfig.version,
    //   }).then((res) => {
    //     if (res.isNeeded) {
    //       console.log("Trigger, update needed");
    //       Alert.alert(
    //         "App Update Required",
    //         "Please update your app to access new features and improvements.",
    //         alertConfig
    //       );
    //     } else {
    //       console.log("No update needed");
    //     }
    //   });
    // };

    // console.log("🚀 ~ file: UpdateNeeded.jsx:109 ~ UpdateNeeded ~ Constants.expoConfig.version:", Constants?.expoConfig?.version)
    // console.log("🚀 ~ file: UpdateNeeded.jsx:109 ~ UpdateNeeded ~ Constants.version:", Constants?.version)
    if (compareVersions(Constants.expoConfig.version, config?.latestVersion)) {
      Alert.alert(
        "App Update Required",
        "Please update your app to access new features and improvements.",
        alertConfig
      );
    } else {
      console.log("No update needed");
    }
  };

  return (
    <>
      {/* <Text>Please update your app</Text>
        <Button title="Update" onPress={() => {
            VersionCheck.openAppStore();
        }} /> */}
    </>
  );
}

export default UpdateNeeded;
