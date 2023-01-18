import { StyleSheet, StyleProp } from "react-native";
import Colors, { lightColor, primaryColor } from "./constants/Colors";

const defaultFontSize = 16;
const appStyles = StyleSheet.create({
  alignLeft: {
    textAlign: "left",
  },
  bold: {
    fontWeight: "bold",
  },
  fw500: {
    fontWeight: "500",
  },
  p: {
    fontSize: defaultFontSize,
  },
  h1: {
    fontSize: defaultFontSize * 2.5,
  },
  h2: {
    fontSize: defaultFontSize * 2,
  },
  h3: {
    fontSize: defaultFontSize * 1.8,
  },
  h4: {
    fontSize: defaultFontSize * 1.4,
  },
  h5: {
    fontSize: defaultFontSize * 1.2,
  },
  my1:{
    marginVertical: 2
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clear: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
  btn:{
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    borderColor: '#ccc',
  },
  btnText:{
    fontSize: 16,
    textAlign: 'center',
  },
  btnPrimary:{
    backgroundColor: primaryColor,
    borderColor: primaryColor
  },
  btnTextPrimary:{
    color: lightColor
  }
});
export default appStyles;
