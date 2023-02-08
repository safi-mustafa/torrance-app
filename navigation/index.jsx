import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SubmissionsScreen from "../screens/SubmissionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TotRequestScreen from "../screens/TotRequestScreen";
import WrrRequestScreen from "../screens/WrrRequestScreen";
import LoginScreen from "../screens/LoginScreen";
import SubmissionContentScreen from "../screens/SubmissionContentScreen";
import SingleSubmissionScreen from "../screens/SingleSubmissionScreen";
import OverrideRequestScreen from "../screens/OverrideRequestScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { usePushNotification } from "../hooks/usePushNotification";
import useUserMeta from "../hooks/useUserMeta";
import { USER_ROLE } from "../constants/Misc";
import ApprovalCell from "../components/cell-templates/ApprovalCell";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const pushNotif = usePushNotification({});
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="TotRequest"
        component={TotRequestScreen}
        options={{ title: "TOT Request" }}
      />
      <Stack.Screen
        name="WrrRequest"
        component={WrrRequestScreen}
        options={{ title: "WRR Request" }}
      />
      <Stack.Screen
        name="OverrideRequest"
        component={OverrideRequestScreen}
        options={{ title: "Override Request" }}
      />
      <Stack.Screen
        name="SubmissionContent"
        component={SubmissionContentScreen}
        options={{ title: "Content" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="SingleSubmission"
          component={SingleSubmissionScreen}
          options={{ title: "Submission" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { role = "" } = useUserMeta();
  const isApprover = USER_ROLE.APPROVER == role;

  const employeeTabs = [
    {
      name: "TapDashboard",
      component: DashboardScreen,
      options: {
        title: "Dashboard",
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="home" size={34} color={color} />
        ),
      },
    }
  ];

  const approverTabs = [
    {
      name: "TabApprovals",
      component: SubmissionContentScreen,
      options: {
        title: "Pending Approvals",
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="home" color={color} size={28} />
        ),
      },
      initialParams: {
        title: "Pending Approvals",
        url: "/Approval",
        name: "TabApprovals",
        template: <ApprovalCell />
      },
    },
  ];

  const commonTabs = [
    {
      name: "TabSubmissions",
      component: SubmissionsScreen,
      options: {
        title: isApprover? "Reviewed Logs" :"My Submissions",
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="file-text" color={color} size={28} />
        ),
      },
    },
    {
      name: "TabProfile",
      component: ProfileScreen,
      options: {
        title: "My Profile",
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
      },
    },
    {
      name: "TabNotification",
      component: NotificationScreen,
      options: {
        title: "Notifications",
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
      },
    },
  ];

  let tabs = isApprover ? [...approverTabs] : [...employeeTabs];
  tabs = [...tabs, ...commonTabs];

  const initialScreen = isApprover ? "TabSubmissions" : "TapDashboard";

  return (
    <BottomTab.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      {tabs.map(({ name, component, options, ...otherProps }) => (
        <BottomTab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
          {...otherProps}
        />
      ))}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
