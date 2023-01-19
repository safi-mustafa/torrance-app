import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import appStyles from "../app-styles";

const items = [
  {
    title: "Submit Override",
    subtitle: "Overtime Request",
    icon: require("./../assets/images/journal-book.png"),
    link: "main",
  },
  {
    title: "Unlocked WRRs",
    subtitle: "Update WWR Returns",
    icon: require("./../assets/images/welding.png"),
    link: "main",
  },
  {
    title: "Maps",
    subtitle: "View Maps",
    icon: require("./../assets/images/maps.png"),
    link: "main",
  },
  {
    title: "Badge Room",
    subtitle: "View Files",
    icon: require("./../assets/images/worker.png"),
    link: "main",
  },
  {
    title: "Delivery",
    subtitle: "View Files",
    icon: require("./../assets/images/delivery.png"),
    link: "main",
  },
  {
    title: "Passport",
    subtitle: "View Files",
    icon: require("./../assets/images/passport.png"),
    link: "main",
  },
  {
    title: "Vehicle Pass",
    subtitle: "View Pass",
    icon: require("./../assets/images/pass.png"),
    link: "main",
  },
  {
    title: "Dropbox",
    subtitle: "Dropbox Link",
    icon: require("./../assets/images/dropbox.png"),
    link: "main",
  },
];

export function DashboardMenu({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.section}>
        {items.map(({ title, subtitle, icon }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btnWrapper}
            onPress={() =>
              navigation.push("SubmissionContent", { title })
            }
          >
            <View style={styles.innerBtnWrapper}>
              <View>
                <Text style={[appStyles.fw500, appStyles.my1]}>{title}</Text>
                <Text style={{ color: "#999", fontSize: 12 }}>{subtitle}</Text>
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
  icon: { height: 35, width: 35, marginLeft: 10 },
  innerBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
