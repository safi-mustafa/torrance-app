import { StyleSheet, Platform, View, ScrollView } from "react-native";

import { primaryColor } from "../constants/Colors";
import { DashButton } from "../components/DashButton";
import { DashboardMenu } from "../components/DashboadMenu";
import ProfileCard from "../components/ProfileCard";
import { USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";

const TOT_IMAGE = require("./../assets/images/journal-book.png");
const WRR_IMAGE = require("./../assets/images/welding.png");
const OVERRIDE_IMAGE = require("./../assets/images/override.png");

export default function DashboardScreen({ navigation }) {
  const { role = "" } = useUserMeta();
  const isManager = USER_ROLE.COMPANY_MANAGER == role;

  return (
    <View style={[styles.innerContainer]}>
      {/* <View style={!isManager && { height: 280 }}> */}
      <View>
        <ProfileCard
          footer={
            !isManager && (
              <>
                {/* <DashButton
                  style={{ marginBottom: 10 }}
                  title="Submit TOT Request"
                  subtitle="Time on Tools"
                  icon={TOT_IMAGE}
                  onPress={() => navigation.push("TotRequest")}
                />
                <DashButton
                  style={{ marginBottom: 10 }}
                  title="Submit Override Request"
                  subtitle="Override Request Record"
                  icon={OVERRIDE_IMAGE}
                  onPress={() => navigation.push("OverrideRequest")}
                />
                <DashButton
                  style={{ marginBottom: 18 }}
                  title="Submit WRR Request"
                  subtitle="Welding Rod Record"
                  icon={WRR_IMAGE}
                  onPress={() => navigation.push("WrrRequest")}
                /> */}
              </>
            )
          }
        />
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView style={styles.expandSection}>
          {/* <DashboardMenu navigation={navigation} /> */}

          <DashButton
            style={styles.dashBtn}
            title="Submit TOT Request"
            subtitle="Time on Tools"
            icon={TOT_IMAGE}
            onPress={() => navigation.push("TotRequest")}
          />
          <DashButton
            style={styles.dashBtn}
            title="Submit Override Request"
            subtitle="Override Request Record"
            icon={OVERRIDE_IMAGE}
            onPress={() => navigation.push("OverrideRequest")}
          />
          <DashButton
            style={styles.dashBtn}
            title="Submit WRR Request"
            subtitle="Welding Rod Record"
            icon={WRR_IMAGE}
            onPress={() => navigation.push("WrrRequest")}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    marginTop: Platform.OS == "ios" ? 50 : 0,
  },
  expandSection: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  dashBtn: { 
    marginBottom: 15,
    paddingVertical: 15, 
    paddingHorizontal: 10, 
    maxWidth: 320,
    alignSelf: "center"
  }
});
