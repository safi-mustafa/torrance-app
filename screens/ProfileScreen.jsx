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
import { getKey } from "../utility";
import ProfileCard from "../components/ProfileCard";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserMeta();
  }, []);

  const getUserMeta = async () => {
    let userMeta = await getKey("user");
    const { userDetail } = JSON.parse(userMeta);
    // console.log("🚀 ~ file: ProfileScreen.jsx ~ line 27 ~ getUserMeta ~ userDetail", userDetail)
    setUser(userDetail);
  };

  const onLogOut = () => {
    // console.log("🚀 ~ file: ProfileScreen.jsx ~ line 31 ~ onLogOut ~ Logout", Logout)
    // alert('Logout')
    navigation.replace("Root")
  }

  return (
    <View style={[styles.innerContainer]}>
      <ProfileCard
        header={
          <Pressable style={styles.exitBtn} onPress={() => onLogOut()}>
            <Ionicons
              name="exit-outline"
              size={34}
              color="white"
              style={{}}
            />
          </Pressable>
        }
      />
      <View style={styles.expandSection}>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.values}>{user?.email}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.values}>{user?.address}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.values}>{user?.city}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>State:</Text>
          <Text style={styles.values}>{user?.state}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Zipcode:</Text>
          <Text style={styles.values}>{user?.zipCode}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.values}>{user?.telephone}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Active Status:</Text>
          <Text
            style={[
              styles.values,
              user?.activeStatus == "Active" && { color: "green" },
            ]}
          >
            {user?.activeStatus}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: Platform.OS == "ios" ? 40 : 0,
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
    width: 50,
    height: 40,
    top: 15,
    right: 0,
    // zIndex: 9999999,
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
    width: 70,
    marginRight: 10,
    color: "#666",
  },
  values: {
    // fontWeight: "bold",
  },
});
