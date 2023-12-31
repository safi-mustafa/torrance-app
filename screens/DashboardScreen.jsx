import { StyleSheet, Platform, View, ScrollView } from "react-native";

import { primaryColor } from "../constants/Colors";
import { DashButton } from "../components/DashButton";
import ProfileCard from "../components/ProfileCard";
import { USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";
import { STATUSBAR_HEIGHT } from "../utility";
import appStyles from "../app-styles";
import Layout from "../constants/Layout";

const TOT_IMAGE = require("./../assets/images/journal-book.png");
const WRR_IMAGE = require("./../assets/images/welding.png");
const OVERRIDE_IMAGE = require("./../assets/images/override.png");
const WORKER_IMAGE = require("./../assets/images/worker.png");
const FCO_IMAGE = require("./../assets/images/fco.png");

export default function DashboardScreen({ navigation }) {
  const { role = "", userMeta } = useUserMeta();
  const isManager = USER_ROLE.COMPANY_MANAGER == role;
  const isEmployee = USER_ROLE.EMPLOYEE == role;
  const isApprover = USER_ROLE.APPROVER == role;

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
            icon={WORKER_IMAGE}
            onPress={() => navigation.push("OverrideRequest")}
          />
          <DashButton
            style={styles.dashBtn}
            title="Submit WRR Request"
            subtitle="Welding Rod Record"
            icon={WRR_IMAGE}
            onPress={() => navigation.push("WrrRequest")}
          />
          {isApprover && <>
            <View
              style={[
                appStyles.separator,
                { borderWidth: 1, borderColor: "#eee", alignSelf: "center" },
              ]}
            ></View>

            <View style={{ maxWidth: 320, alignSelf: "center", width: "100%" }}>
              <DashButton
                style={[styles.dashBtn]}
                title="Statistics"
                subtitle="Show All Stats"
                icon={OVERRIDE_IMAGE}
                onPress={() => navigation.push("Statistics")}
              />
            </View>
          </>}
          {/* {(isEmployee || userMeta?.canAddLogs) && <DashButton
            style={styles.dashBtn}
            title="Field Change Order"
            subtitle="Field Change Order Log"
            icon={FCO_IMAGE}
            onPress={() => navigation.push("FcoLog")}
          />} */}
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
    paddingVertical: 30,
  },
  dashBtn: {
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    maxWidth: 320,
    alignSelf: "center",
  },
});
