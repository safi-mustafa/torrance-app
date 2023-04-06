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
import Buttonx from "../components/form/Buttonx";
import SignupForm from "../components/SignupForm";
import { STATUSBAR_HEIGHT } from "../utility";

const BG_IMAGE = require("./../assets/images/bg-blue.png");
const LOGO = require("./../assets/images/app-logo.png");

export default function SignupScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const onFailure = (error) => {
    if (error?.data?.errors) {
      console.log(
        "🚀 ~ file: TotRequestScreen.jsx ~ line 45 ~ onSubmit ~ error.data",
        error.data
      );
      setApiErrors(error.data.errors);
    }
    setLoading(false);
  };

  const onSubmit = (values) => {
    setLoading(true);
    const url = "/Employee";
    const params = { ...values };

    postData(
      { url, params, showErrorMessage: false },
      ({ data, ...otherData }) => {
        setLoading(false);
        console.log("🚀 ~ file: SignupScreen.jsx:40 ~ onSubmit ~ data:", data);
        Toast.show({
          type: "success",
          text1: "Signup",
          text2: data?.message,
        });
        navigation.replace("Login");
      },
      (error) => {
        onFailure(error)
        // setLoading(false);
        // console.log(
        //   "🚀 ~ file: SignupScreen.jsx:46 ~ onSubmit ~ error:",
        //   error
        // );
        // const { errors = [] } = error?.data;
        // let message = "Something went wrong, Please try again.";
        // if (typeof errors === "object") {
        //   message = Object.entries(errors).map(([key, value]) => `${value}`);
        //   if (Array.isArray(message)) message = message.join(",");
        // }
        // Toast.show({
        //   type: "error",
        //   text1: "Signup Error",
        //   text2: message,
        // });
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
              <SignupForm onSubmit={onSubmit} apiErrors={apiErrors}/>
              <Pressable
                onPress={() => toggleLoginType()}
                style={{ alignSelf: "center", marginTop: 20 }}
              >
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
