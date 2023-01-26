import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Linking,
} from "react-native";

import appStyles from "../app-styles";
import Layout from "../constants/Layout";

const MENU_TYPE = {
  EXTERNAL_LINK: "EXTERNAL_LINK",
  ROUTE_REDIRECT: "ROUTE_REDIRECT",
};

const items = [
  {
    title: "Submit Override",
    subtitle: "Overtime Request",
    icon: require("./../assets/images/journal-book.png"),
    url: "NotFound",
    type: MENU_TYPE.ROUTE_REDIRECT
  },
  {
    title: "Unlocked WRRs",
    subtitle: "Update WWR Returns",
    icon: require("./../assets/images/welding.png"),
    url: "NotFound",
    type: MENU_TYPE.ROUTE_REDIRECT
  },
  {
    title: "Maps",
    subtitle: "View Maps",
    icon: require("./../assets/images/maps.png"),
    url: "/WRRLog",
    cellOptions: { titleField: "wrr", subtitleField: "date" },
  },
  {
    title: "Badge Room",
    subtitle: "View Files",
    icon: require("./../assets/images/worker.png"),
    url: "/WRRLog",
  },
  {
    title: "Delivery",
    subtitle: "View Files",
    icon: require("./../assets/images/delivery.png"),
    url: "/WRRLog",
  },
  {
    title: "Passport",
    subtitle: "View Files",
    icon: require("./../assets/images/passport.png"),
    url: "/WRRLog",
  },
  {
    title: "Vehicle Pass",
    subtitle: "View Pass",
    icon: require("./../assets/images/pass.png"),
    url: "/WRRLog",
  },
  {
    title: "Dropbox",
    subtitle: "Dropbox Link",
    icon: require("./../assets/images/dropbox.png"),
    url: "https://dropbox.com/",
    type: MENU_TYPE.EXTERNAL_LINK,
  },
];

export function DashboardMenu({ navigation }) {
  const onMenuPress = ({ type = null, ...item }) => {
    if (type === MENU_TYPE.ROUTE_REDIRECT) {
      navigation.push(
        item?.url,
        item?.params && {
          ...item?.params,
        }
      );
    } else if (type === MENU_TYPE.EXTERNAL_LINK) {
      Linking.openURL(item?.url).catch((err) => console.error("Error", err));
    } else {
      navigation.push("SubmissionContent", {
        ...item,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ height: Layout.window.height }}>
      <View style={styles.section}>
        {items.map(({ subtitle, icon, ...item }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btnWrapper}
            onPress={() => onMenuPress(item)}
          >
            <View style={styles.innerBtnWrapper}>
              <View>
                <Text style={[appStyles.fw500, appStyles.my1]}>
                  {item?.title}
                </Text>
                <Text style={{ color: "#999", fontSize: 11 }}>{subtitle}</Text>
              </View>
              <Image style={styles.icon} source={icon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  btnWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 6,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  icon: { height: 32, width: 32, marginLeft: 10 },
  innerBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
