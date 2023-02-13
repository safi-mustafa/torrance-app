import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SubmissionContentScreen from "./SubmissionContentScreen";
import NotFoundScreen from "./NotFoundScreen";

export default function SubmissionsScreen({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  const tabs = [
    {
      name: "tot",
      tabTitle: "Time on Tools",
      params: { title: "Time on Tools", url: "/TOTLog" },
      component: null,
      cellOptions: { titleLabel: 'TWR#: ', titleField: "twr", subTitleField: "formattedCreatedOn" },
    },
    {
      name: "WeldingRods",
      tabTitle: "Welding Rods",
      params: { title: "Welding Rods", url: "/WRRLog" },
      cellOptions: { titleLabel: 'TWR-WO#: ',titleField: "twr" },
    },
    {
      name: "Override",
      tabTitle: "Override",
      // component: NotFoundScreen,
      params: { title: "Override", url: "/OverrideLog" },
      cellOptions: { titleLabel: 'PO#: ', titleField: "poNumber", subTitleField: "formattedCreatedOn" },
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
            initialParams={{ ...params, navigation, cellOptions, name }}
            component={component ? component : SubmissionContentScreen}
            options={{ title: tabTitle, ...options }}
          />
        )
      )}
    </Tab.Navigator>
  );
}
