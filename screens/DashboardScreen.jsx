import { StyleSheet, Platform, View, ScrollView } from "react-native";

import appStyles from "../app-styles";
import { primaryColor } from "../constants/Colors";
import { DashButton } from "../components/DashButton";
import { DashboardMenu } from "../components/DashboadMenu";
import Layout from "../constants/Layout";
import ProfileCard from "../components/ProfileCard";

const TOT_IMAGE = require("./../assets/images/journal-book.png");
const WRR_IMAGE = require("./../assets/images/welding.png");

export default function DashboardScreen({ navigation }) {
  return (
    <View style={[styles.innerContainer]}>
      <ProfileCard
        footer={
          <>
            <DashButton
              style={{ marginBottom: 15 }}
              title="Submit TOT Request"
              subtitle="Time on Tools"
              icon={TOT_IMAGE}
              onPress={() => navigation.push("TotRequest")}
            />
            <DashButton
              style={{ marginBottom: 15 }}
              title="Submit WRR Request"
              subtitle="Welding Rod Record"
              icon={WRR_IMAGE}
              onPress={() => navigation.push("WrrRequest")}
            />
          </>
        }
      />
      <View style={appStyles.clear}>
        <ScrollView style={styles.expandSection}>
          <DashboardMenu navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: primaryColor,
    marginTop: Platform.OS == "ios" ? 40 : 0,
  },
  expandSection: {
    backgroundColor: "#fff",
    // width: Layout.window.width,
    // height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
