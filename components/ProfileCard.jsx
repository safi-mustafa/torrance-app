import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import appStyles from "../app-styles";
import useColorScheme from "../hooks/useColorScheme";
import Colors, { lightColor } from "../constants/Colors";
import { getKey } from "../utility";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function ProfileCard({ navigation, header = <></>, footer = <></> }) {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserMeta();
  }, []);

  const getUserMeta = async () => {
    let userMeta = await getKey("user");
    const { userDetail } = JSON.parse(userMeta);
    // console.log("🚀 ~ file: ProfileCard.jsx ~ line 28 ~ getUserMeta ~ userDetail", userDetail)
    setUser(userDetail);
  };

  return (
    <>
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
      >
        <View
          style={[appStyles.clear, { paddingTop: 30, paddingHorizontal: 30 }]}
        >
          {header}
          <Text style={{ color: Colors[colorScheme].lightText }}>Hello,</Text>
          <Text
            style={[
              appStyles.h4,
              { color: Colors[colorScheme].lightText, marginBottom: 25 },
            ]}
          >
            {user?.name} {StatusBar.currentHeight}
          </Text>
          {footer}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({});
