import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SubmissionContentScreen from "./SubmissionContentScreen";

export default function SubmissionsScreen() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Tab.Navigator>
        <Tab.Screen name="TOT" component={SubmissionContentScreen} />
        {/* <Tab.Screen name="WeldingRods" component={SubmissionContentScreen} /> */}
      </Tab.Navigator>
      <Text>New hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
