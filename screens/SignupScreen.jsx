import { useState } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import postData from "../api-services/postData";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import { STATUSBAR_HEIGHT } from "../utility";
import Buttonx from "../components/form/Buttonx";
import useUserMeta from "../hooks/useUserMeta";
import ResetPasswordForm from "../components/ResetPasswordForm";
import putData from "../api-services/putData";
import SignupForm from "../components/SignupForm";

const BG_IMAGE = require("./../assets/images/bg-blue.png");
const LOGO = require("./../assets/images/app-logo.png");

export default function SignupScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { userMeta } = useUserMeta();

  const onSubmit = (values) => {
    setLoading(true);
    const url = "/Employee";
    const params = { ...values };

    postData(
      { url, params, showErrorMessage: false },
      ({ data }) => {
        setLoading(false);
        console.log("🚀 ~ file: SignupScreen.jsx:40 ~ onSubmit ~ data:", data);
        navigation.replace("Login");
      },
      (error) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: SignupScreen.jsx:46 ~ onSubmit ~ error:",
          error
        );
        const { errors = [] } = error?.data;
        let message = "Something went wrong, Please try again.";
        if (typeof errors === "object") {
          message = Object.entries(errors).map(([key, value]) => `${value}`);
          if (Array.isArray(message)) message = message.join(",");
        }
        Toast.show({
          type: "error",
          text1: "Signup Error",
          text2: message,
        });
      }
    );
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
        style={{ marginTop: Platform.OS == "ios" ? 50 : STATUSBAR_HEIGHT }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image source={LOGO} style={styles.applogo} />
            <View style={styles.formWrapper}>
              {/* <LoginForm onSubmit={onSubmit} /> */}
              <SignupForm onSubmit={onSubmit} />
              <Pressable
                onPress={() => toggleLoginType()}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Buttonx
                  title={<Ionicons name="arrow-back" size={34} color="white" />}
                  style={{ backgroundColor: "transparent", borderWidth: 0 }}
                  onPress={() => navigation.pop()}
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    height: Layout.window.height,
  },
  formWrapper: {
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
  },
  loginViaText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 15,
  },
  applogo: {
    alignSelf: "center",
    marginBottom: 40,
  },
});
