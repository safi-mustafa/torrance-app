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
import { saveKey, STATUSBAR_HEIGHT, getNotificationApiUrl } from "../utility";
import LoginForm from "../components/LoginForm";
import LoginPin from "../components/LoginPin";
import { LOGIN_TYPE } from "../constants/Misc";
import { useRegisterExpoToken } from "../hooks/useRegisterNotification";
import Buttonx from "../components/form/Buttonx";

const BG_IMAGE = require("./../assets/images/bg-blue.png");
const LOGO = require("./../assets/images/app-logo.png");

export default function LoginScreen({ navigation, route = { params: {} } }) {
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(LOGIN_TYPE.PIN);
  const { params } = route;
  const notification = params?.notification;

  const expoToken = useRegisterExpoToken();
  // console.log("🚀 ~ file: LoginScreen.jsx:30 ~ LoginScreen ~ expoToken", expoToken)

  const onSubmit = (values) => {
    if (values == 9999) {
      navigation.replace("Signup");
      return;
    }
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
        onLoginSuccess(data);
      },
      (error) => {
        setLoading(false);
        onLoginError(error);
      }
    );
  };

  const onLoginSuccess = (data) => {
    console.log("🚀 ~ file: LoginScreen.jsx:63 ~ onLoginSuccess ~ data:", data);
    saveKey("user", JSON.stringify(data));
    if (data?.userDetail?.changePassword) {
      navigation.navigate("ChangePassword");
    } else {
      if (notification) {
        navigation.replace("SingleSubmission", {
          id: notification?.EntityId,
          apiUrl: getNotificationApiUrl(notification?.EntityType),
        });
      } else navigation.replace("BottomTabNav");
    }
  };

  const onLoginError = (error) => {
    console.log("🚀 ~ file: LoginScreen.jsx:81 ~ onSubmit ~ error", error);
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
  };

  const toggleLoginType = () => {
    setLoginType(loginType === "PIN" ? "FORM" : "PIN");
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color={'rgba(255,255,255,0.6)'} />
      <ImageBackground
        source={BG_IMAGE}
        imageStyle={{ resizeMode: "stretch", marginRight: -5 }}
        style={{ marginTop: Platform.OS == "ios" ? 50 : STATUSBAR_HEIGHT }}
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
            {/* <Text>{JSON.stringify(expoToken)}</Text> */}
            {/* <Text style={{color: '#fff'}}>{expoToken?.token}</Text> */}
            <View style={styles.formWrapper}>
              {loginType == LOGIN_TYPE.FORM ? (
                <LoginForm onSubmit={onSubmit} />
              ) : (
                <LoginPin onSubmit={onSubmit} />
              )}
              <Pressable
                onPress={() => toggleLoginType()}
                style={{ alignSelf: "center", marginTop: 20 }}
              >
                {/* <Text style={styles.loginViaText}>
                  Login via {loginType == LOGIN_TYPE.FORM ? "Pin" : "Email"}
                </Text> */}
                <Buttonx
                  title={
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="arrow-back" size={24} color="white" />
                      <Text
                        style={{ color: "white", fontSize: 18, marginLeft: 5 }}
                      >
                        Back
                      </Text>
                    </View>
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
