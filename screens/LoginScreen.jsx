import { useState, useEffect } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import postData from "./../api-services/postData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import { saveKey } from "../utility";

const BG_IMAGE = require("./../assets/images/bg-blue.png");

export default function LoginScreen({ navigation }) {
  const CELL_COUNT = 4;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSubmit = () => {
    setLoading(true);
    postData(
      { url: `/Account/Login?pincode=${value}` },
      ({ data }) => {
        setLoading(false);
        saveKey("user", JSON.stringify(data));
        navigation.replace("BottomTabNav");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const onValueChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (value && value.length === 4) {
      onSubmit();
    }
  }, [value]);

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
            <Text
              style={{
                ...appStyles.h3,
                ...appStyles.btnTextPrimary,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Torrance App
            </Text>
            <View style={styles.formWrapper}>
              <CodeField
                value={value}
                onChangeText={onValueChange}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
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
    justifyContent: 'center',
    alignSelf: 'center',
  },
  codeFieldRoot: {
    marginVertical: 0,
  },
  cell: {
    width: 55,
    height: 70,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 2,
    borderColor: "#cccccc",
    color: "#cccccc",
    textAlign: "center",
    marginRight: 10
  },
  focusCell: {
    borderColor: "#ffffff",
    color: "#ffffff",
  },
});
