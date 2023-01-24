import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import appStyles from "../app-styles";
import useColorScheme from "../hooks/useColorScheme";
import Colors, { lightColor } from "../constants/Colors";
import { useEffect, useState } from "react";
import { getKey } from "../utility";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function ProfileScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserMeta();
  }, []);

  const getUserMeta = async () => {
    let userMeta = await getKey("user");
    const { userDetail } = JSON.parse(userMeta);
    // console.log(
    //   "🚀 ~ file: ProfileScreen.jsx ~ line 31 ~ getUserMeta ~ userDetail",
    //   JSON.parse(userMeta)
    // );
    setUser(userDetail);
  };

  return (
    <View style={[styles.innerContainer]}>
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
      >
        <View
          style={[appStyles.clear, { paddingTop: 80, paddingHorizontal: 30 }]}
        >
          <TouchableOpacity onPress={() => navigation.replace("Root")}>
            <Ionicons
              name="exit-outline"
              size={32}
              color="white"
              style={styles.exitBtn}
            />
          </TouchableOpacity>
          <Text style={{ color: Colors[colorScheme].lightText }}>Hello,</Text>
          <Text
            style={[
              appStyles.h4,
              { color: Colors[colorScheme].lightText, marginBottom: 25 },
            ]}
          >
            {user?.name} {StatusBar.currentHeight}
          </Text>
        </View>
      </ImageBackground>
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
          <Text style={styles.values}>{user?.activeStatus}</Text>
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
    top: -60,
    right: -10,
  },
  section:{
    marginBottom: 10,
    flexDirection: 'row'
  },
  label: {
    width: 70,
    marginRight: 10,
    color: "#666"
  },
  values:{
    // fontWeight: "bold",
  }
});
