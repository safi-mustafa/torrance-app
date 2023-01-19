import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
  Platform,
} from "react-native";

import appStyles from "../app-styles";
import useColorScheme from "../hooks/useColorScheme";
import Colors, { lightColor } from "../constants/Colors";
import Layout from "../constants/Layout";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function ProfileScreen({ navigation }) {
  const colorScheme = useColorScheme();
  Layout;
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
        </View>
      </ImageBackground>
      <View style={styles.expandSection}>
        <Text style={appStyles.my1}>Email: hello@example.com</Text>
        <Text style={appStyles.my1}>Address: NY 10, PO 123, US</Text>
        <Text style={appStyles.my1}>Mobile: (123)-456-789</Text>
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
});
