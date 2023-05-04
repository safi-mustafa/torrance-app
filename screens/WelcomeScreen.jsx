import { useEffect } from "react";
import { StyleSheet, Platform, View, ScrollView, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColor } from "../constants/Colors";
import { DashboardMenu } from "../components/DashboadMenu";
import ProfileCard from "../components/ProfileCard";
import Buttonx from "../components/form/Buttonx";
import { STATUSBAR_HEIGHT } from "../utility";
import useUserMeta from "../hooks/useUserMeta";

export default function WelcomeScreen({ navigation }) {
  const { userMeta } = useUserMeta();
  
  useEffect(() => {
    if (userMeta?.token) {
      navigation.navigate("BottomTabNav");
    }

    return () => {};
  }, [userMeta]);

  return (
    <View style={[styles.innerContainer]}>
      <View>
        <ProfileCard
          title="Welcome"
          header={
            <Buttonx
              // title={<Ionicons name="enter-outline" size={34} color="white" />}
              title="Login"
              titleStyle={{ fontSize: 18 }}
              style={styles.loginBtn}
              onPress={() => navigation.push("Login")}
            />
          }
        />
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView style={styles.expandSection}>
          <DashboardMenu navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    marginTop: Platform.OS == "ios" ? 50 : STATUSBAR_HEIGHT,
  },
  expandSection: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  loginBtn: {
    position: "absolute",
    width: 70,
    height: 50,
    top: 15,
    right: 0,
    paddingLeft: 10,
    alignItems: "center",
    zIndex: 99,
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 18,
  },
});
