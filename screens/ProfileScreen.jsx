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
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.values}>{user?.firstName}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.values}>{user?.lastName}</Text>
        </View>
        <View style={[appStyles.my1, styles.section]}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.values}>{user?.company?.name}</Text>
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
    width: 75,
    marginRight: 10,
    color: "#666",
  },
  values: {
    // fontWeight: "bold",
  },
});
