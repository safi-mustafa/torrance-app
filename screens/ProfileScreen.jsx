import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import appStyles from "../app-styles";
import { lightColor } from "../constants/Colors";
import { useEffect, useState } from "react";
import { getKey, saveKey } from "../utility";
import ProfileCard from "../components/ProfileCard";
import useUserMeta from "../hooks/useUserMeta";
import { USER_ROLE } from "../constants/Misc";

export default function ProfileScreen({ navigation }) {
  // const [user, setUser] = useState({});
  const { role = "", userMeta } = useUserMeta();
  const user = userMeta;
  console.log("🚀 ~ file: ProfileScreen.jsx:23 ~ ProfileScreen ~ user", user);
  const isApprover = USER_ROLE.APPROVER == role;

  const onLogOut = () => {
    // console.log("🚀 ~ file: ProfileScreen.jsx ~ line 31 ~ onLogOut ~ Logout", Logout)
    // alert('Logout')
    saveKey("user", "");
    navigation.replace("Root");
  };

  return (
    <View style={[styles.innerContainer]}>
      <ProfileCard
        header={
          <Pressable style={styles.exitBtn} onPress={() => onLogOut()}>
            <Ionicons name="exit-outline" size={34} color="white" />
          </Pressable>
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
        {!isApprover ? (
          <>
            <View style={[appStyles.my1, styles.section]}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.values}>{user?.company?.name}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[appStyles.my1, styles.section]}>
              <Text style={styles.label}>Unit(s):</Text>
              <Text style={styles.values}>{user?.formattedUnits}</Text>
            </View>
            <View>
              <View style={styles.tr}>
                <Text style={[styles.td, {fontWeight: 'bold'}]}>Department</Text>
                <Text style={[styles.td, {fontWeight: 'bold'}]}>Unit</Text>
              </View>
              {user?.associations &&
                user?.associations.map((association) => (
                  <View style={styles.tr}>
                    <Text style={styles.td}>{association?.department?.name}</Text>
                    <Text style={styles.td}>{association?.unit?.name}</Text>
                  </View>
                ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: Platform.OS == "ios" ? 50 : 0,
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
    top: 15,
    right: 0,
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
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom:5
  },
  td: {
  },
  head: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
