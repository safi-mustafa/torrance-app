import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";

import appStyles from "../app-styles";
import { lightColor } from "../constants/Colors";
import { compareVersions, getKey, saveKey, STATUSBAR_HEIGHT } from "../utility";
import ProfileCard from "../components/ProfileCard";
import useUserMeta from "../hooks/useUserMeta";
import { USER_ROLE } from "../constants/Misc";
import Layout from "../constants/Layout";
import getData from "../api-services/getData";
import Buttonx from "../components/form/Buttonx";

export default function ProfileScreen({ navigation }) {
  // const [user, setUser] = useState({});
  const { role = "", userMeta } = useUserMeta();
  const [appVersionMeta, setAppVersionMeta] = useState({});
  const user = userMeta;
  const isApprover = USER_ROLE.APPROVER == role;

  useEffect(() => {
    getAppLatestVersion();
  }, []);

  const onLogOut = () => {
    // console.log("🚀 ~ file: ProfileScreen.jsx ~ line 31 ~ onLogOut ~ Logout", Logout)
    // alert('Logout')
    saveKey("user", "");
    navigation.replace("Root");
  };

  const getAppLatestVersion = () => {
    getData(
      { url: "/UpdateStatus" },
      (response) => {
        setAppVersionMeta(response?.data);
      },
      (error) => {}
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
  console.log("🚀 ~ file: ProfileScreen.jsx:62 ~ ProfileScreen ~ appVersionMeta?.latestVersion, Constants.expoConfig.version:",Constants.expoConfig.version, appVersionMeta?.latestVersion)

  return (
    <View style={[styles.innerContainer]}>
      <ProfileCard
        header={
          <>
            <Pressable style={styles.exitBtn} onPress={() => onLogOut()}>
              {/* <Ionicons name="exit-outline" size={34} color="white" /> */}
              <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
            </Pressable>
          </>
        }
      />
      <View style={styles.expandSection}>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.values}>{user?.email}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.values}>{user?.fullName}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={[styles.label, { width: 120 }]}>Latest Version:</Text>
          <Text style={styles.values}>{appVersionMeta?.latestVersion}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={[styles.label, { width: 120 }]}>Current Version:</Text>
          <View style={{flexDirection: 'row' }}>
            <Text style={styles.values}>{Constants.expoConfig.version}</Text>
            {compareVersions(Constants.expoConfig.version, appVersionMeta?.latestVersion) && <Buttonx onPress={() => openAppStore()} title="Update" style={{padding: 3, marginLeft:10, top: -5}}/>}
          </View>
        </View>
        {!isApprover ? (
          <>
            <View style={[appStyles.my1, styles.section]}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.values}>{user?.company?.name}</Text>
            </View>
          </>
        ) : (
          <>
            {/* <View style={[appStyles.my1, styles.section]}>
              <Text style={styles.label}>Unit(s):</Text>
              <Text style={styles.values}>{user?.formattedUnits}</Text>
            </View> */}
            <View>
              <View style={styles.tr}>
                <Text style={[styles.td, { fontWeight: "bold" }]}>
                  Department
                </Text>
                <Text style={[styles.td, { fontWeight: "bold" }]}>Unit</Text>
              </View>
              <ScrollView style={{ height: Layout.window.height - 450 }}>
                {user?.associations &&
                  user?.associations.map((association, index) => (
                    <View key={index} style={styles.tr}>
                      <Text style={styles.td}>
                        {association?.department?.name}
                      </Text>
                      <Text style={styles.td}>{association?.unit?.name}</Text>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: Platform.OS == "ios" ? 50 : STATUSBAR_HEIGHT,
    // backgroundColor: lightColor,
  },
  expandSection: {
    backgroundColor: lightColor,
    // width: Layout.window.width,
    height: "100%",
    padding: 30,
  },
  exitBtn: {
    position: "absolute",
    width: 70,
    height: 50,
    top: 25,
    right: 15,
    paddingLeft: 10,
    alignItems: "center",
    zIndex: 99,
    // backgroundColor: 'red'
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  label: {
    width: 75,
    marginRight: 10,
    color: "#666",
  },
  values: {
    // fontWeight: "bold",
  },
  tr: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  td: {},
  head: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
