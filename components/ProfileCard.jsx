import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from "react-native";

import appStyles from "../app-styles";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import useUserMeta from "../hooks/useUserMeta";
// import { USER_ROLE } from "../constants/Misc";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function ProfileCard({
  title = null,
  header = <></>,
  footer = <></>,
}) {
  const colorScheme = useColorScheme();
  const { role = "", userMeta } = useUserMeta();
  // const isApprover = USER_ROLE.APPROVER == role;
  const name = title
    ? title
    : userMeta?.fullName;

  return (
    <>
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
      >
        <View
          style={[appStyles.clear, { paddingTop: 15, paddingHorizontal: 30 }]}
        >
          {header}
          <Text style={{ color: Colors[colorScheme].lightText }}>Hello,</Text>
          <Text
            style={[
              appStyles.h4,
              { color: Colors[colorScheme].lightText, marginBottom: 15 },
            ]}
          >
            {name}
          </Text>
          {footer}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({});
