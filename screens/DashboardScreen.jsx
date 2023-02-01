import { StyleSheet, Platform, View, ScrollView } from "react-native";

import { primaryColor } from "../constants/Colors";
import { DashButton } from "../components/DashButton";
import { DashboardMenu } from "../components/DashboadMenu";
import ProfileCard from "../components/ProfileCard";

const TOT_IMAGE = require("./../assets/images/journal-book.png");
const WRR_IMAGE = require("./../assets/images/welding.png");

export default function DashboardScreen({ navigation }) {
  return (
    <View style={[styles.innerContainer]}>
      <View style={{height: 265}}>
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
      </View>
      <View style={{flex: 2}}>
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
});
