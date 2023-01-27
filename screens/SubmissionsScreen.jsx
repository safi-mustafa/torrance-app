import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SubmissionContentScreen from "./SubmissionContentScreen";

export default function SubmissionsScreen({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  const tabs = [
    {
      name: "tot",
      tabTitle: "Time on Tools",
      params: { title: "Time on Tools", url: "/TOTLog" },
      component: null,
      cellOptions: { titleField: "twr", subTitleField: "jobDescription" },
    },
    {
      name: "WeldingRods",
      tabTitle: "Welding Rods",
      params: { title: "Welding Rods", url: "/WRRLog" },
      cellOptions: { titleField: "email", subTitleField: "activeStatus" },
    },
    {
      name: "Override",
      tabTitle: "Override",
      params: { title: "Override", url: "/TOTLog" },
      cellOptions: { titleField: "twr", subTitleField: "jobDescription" },
    },
  ];

  return (
    <Tab.Navigator>
      {tabs.map(
        ({
          name,
          params,
          tabTitle,
          component,
          options = {},
          cellOptions = {},
        }) => (
          <Tab.Screen
            key={name}
            name={name}
            initialParams={{ ...params, navigation, cellOptions }}
            component={component ? component : SubmissionContentScreen}
            options={{ title: tabTitle, ...options }}
          />
        )
      )}
    </Tab.Navigator>
  );
}
