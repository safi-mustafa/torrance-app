import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SubmissionContentScreen from "./SubmissionContentScreen";

export default function SubmissionsScreen() {
  const Tab = createMaterialTopTabNavigator();

  const tabs = [
    {
      name: "tot",
      tabTitle: "Time on Tools",
      params: { title: "Time on Tools", url: '/TOTLog' },
      component: null,
    },
    {
      name: "WeldingRods",
      tabTitle: "Welding Rods",
      params: { title: "Welding Rods", url: '/WRRLog' },
    },
    {
      name: "Override",
      tabTitle: "Override",
      params: { title: "Override", url: '/TOTLog' },
    },
  ];

  return (
    <Tab.Navigator>
      {tabs.map(({ name, params, tabTitle, component, options = {} }) => (
        <Tab.Screen
          key={name}
          name={name}
          children={() =>
            component ? component : <SubmissionContentScreen params={params} />
          }
          options={{ title: tabTitle, ...options }}
        />
      ))}
    </Tab.Navigator>
  );
}
