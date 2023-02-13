import { StyleSheet, Platform, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColor } from "../constants/Colors";
import { DashboardMenu } from "../components/DashboadMenu";
import ProfileCard from "../components/ProfileCard";
import Buttonx from "../components/form/Buttonx";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={[styles.innerContainer]}>
      <View>
        <ProfileCard
          title="Welcome"
          header={
            <Buttonx
              title={<Ionicons name="enter-outline" size={34} color="white" />}
              style={styles.loginBtn}
              onPress={() => navigation.push('Login')}
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
    marginTop: Platform.OS == "ios" ? 40 : 0,
  },
  expandSection: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  loginBtn:{
    position: "absolute",
    width: 70,
    height: 50,
    top: 10,
    right: 0,
    paddingLeft: 10,
    alignItems: "center",
    zIndex: 99,
    backgroundColor: 'transparent',
    borderWidth: 0
  }
});
