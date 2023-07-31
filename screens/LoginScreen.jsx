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

import postData from "./../api-services/postData";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import { saveKey } from "../utility";
import LoginForm from "../components/LoginForm";
import LoginPin from "../components/LoginPin";
import { LOGIN_TYPE } from "../constants/Misc";
import { useRegisterExpoToken } from "../hooks/useRegisterNotification";
import Buttonx from "../components/form/Buttonx";

const BG_IMAGE = require("./../assets/images/bg-blue.png");
const LOGO = require("./../assets/images/app-logo.png");

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(LOGIN_TYPE.PIN);
  const expoToken = useRegisterExpoToken();
  // console.log("🚀 ~ file: LoginScreen.jsx:30 ~ LoginScreen ~ expoToken", expoToken)

  const onSubmit = (values) => {
    setLoading(true);
    const url =
      loginType === LOGIN_TYPE.PIN
        ? `/Account/LoginUsingPincode`
        : `/Account/Login`;
    let params = loginType !== LOGIN_TYPE.PIN ? values : { pincode: values };
    params = { ...params, deviceId: expoToken?.token };

    postData(
      { url, params, showErrorMessage: false },
      ({ data }) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: LoginScreen.jsx ~ line 40 ~ onSubmit ~ data",
          data
        );
        saveKey("user", JSON.stringify(data));
        navigation.replace("BottomTabNav");
      },
      (error) => {
        setLoading(false);
        console.log("🚀 ~ file: LoginScreen.jsx:51 ~ onSubmit ~ error", error);
        const { errors = [] } = error?.data;
        let message = "Something went wrong, Please try again.";
        if (typeof errors === "object") {
          message = Object.entries(errors).map(([key, value]) => `${value}`);
          if (Array.isArray(message)) message = message.join(",");
        }
        Toast.show({
          type: "error",
          text1: "Login error",
          text2: message,
        });
      }
    );
  };

  const toggleLoginType = () => {
    setLoginType(loginType === "PIN" ? "FORM" : "PIN");
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
        style={{ marginTop: Platform.OS == "ios" ? 40 : 0, height: '100%' }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {/* <Text
              style={{
                ...appStyles.h3,
                ...appStyles.btnTextPrimary,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Torrance App
            </Text> */}
            <Image source={LOGO} style={styles.applogo} />
            <View style={styles.formWrapper}>
              {loginType == LOGIN_TYPE.FORM ? (
                <LoginForm onSubmit={onSubmit} />
              ) : (
                <LoginPin onSubmit={onSubmit} />
              )}
              <Pressable
                onPress={() => toggleLoginType()}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Text style={styles.loginViaText}>
                  Login via {loginType == LOGIN_TYPE.FORM ? "Pin" : "Email"}
                </Text>
                <Buttonx
                  title={
                    <Ionicons name="arrow-back" size={34} color="white" />
                  }
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
