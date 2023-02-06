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

import postData from "./../api-services/postData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import { saveKey } from "../utility";
import LoginForm from "../components/LoginForm";
import LoginPin from "../components/LoginPin";
import { LOGIN_TYPE } from "../constants/Misc";

const BG_IMAGE = require("./../assets/images/bg-blue.png");
const LOGO = require("./../assets/images/app-logo.png");

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(LOGIN_TYPE.PIN);

  const onSubmit = (values) => {
    setLoading(true);
    const url =
      loginType === LOGIN_TYPE.PIN
        ? `/Account/LoginUsingPincode?pincode=${values}`
        : `/Account/Login`;
    const params = loginType !== LOGIN_TYPE.PIN ? values : {};

    postData(
      { url, params },
      ({ data }) => {
        setLoading(false);
        console.log("🚀 ~ file: LoginScreen.jsx ~ line 40 ~ onSubmit ~ data", data)
        saveKey("user", JSON.stringify(data));
        navigation.replace("BottomTabNav");
      },
      (error) => {
        setLoading(false);
        console.log("🚀 ~ file: LoginScreen.jsx ~ line 43 ~ onSubmit ~ error", error)
        // console.log("🚀 ~ file: LoginScreen.jsx ~ line 43 ~ onSubmit ~ error", JSON.stringify(error.response.data.errors))
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
        style={{ marginTop: Platform.OS == "ios" ? 40 : 0 }}
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
            <Image source={LOGO} style={styles.applogo}/>
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
                <Text style={styles.loginViaText}>Login via {loginType == LOGIN_TYPE.FORM ? 'Pin' : 'Email'}</Text>
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
    width: '85%'
  },
  loginViaText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 15,
  },
  applogo:{
    alignSelf: "center",
    marginBottom: 40
  }
});
