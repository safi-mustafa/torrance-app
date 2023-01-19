import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
  Text, View
} from "react-native";

import appStyles from "../app-styles";
import useColorScheme from "../hooks/useColorScheme";
import Colors, { primaryColor } from "../constants/Colors";
import { DashButton } from "../components/DashButton";
import { DashboardMenu } from "../components/DashboadMenu";
import Layout from "../constants/Layout";

const TOT_IMAGE = require("./../assets/images/journal-book.png");
const WRR_IMAGE = require("./../assets/images/welding.png");
const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function DashboardScreen({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.innerContainer]}>
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
      >
        <View
          style={[appStyles.clear, { paddingTop: 80, paddingHorizontal: 30 }]}
        >
          <Text style={{ color: Colors[colorScheme].lightText }}>Hello,</Text>
          <Text
            style={[
              appStyles.h4,
              { color: Colors[colorScheme].lightText, marginBottom: 25 },
            ]}
          >
            John Doe {StatusBar.currentHeight}
          </Text>

          <DashButton
            style={{ marginBottom: 15 }}
            title="Submit TOT Request"
            subtitle="Time on Tools"
            icon={TOT_IMAGE}
            onPress={() => navigation.push("TotRequest")}
          />
        </View>
      </ImageBackground>
      <View style={appStyles.clear}>
        <View style={styles.expandSection}>
          <DashButton
            style={{ marginHorizontal: 20, marginBottom: 10 }}
            title="Submit WRR Request"
            subtitle="Welding Rod Record"
            icon={WRR_IMAGE}
            onPress={() => navigation.push("WrrRequest")}
          />
          <DashboardMenu />
        </View>
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
    width: Layout.window.width,
    height: "100%",
    paddingHorizontal: 20,
  },
});
