import { StyleSheet, View, Text, ScrollView } from "react-native";
import appStyles from "../app-styles";

export default function SingleSubmissionScreen({
  navigation,
  route,
  ...otherProps
}) {

  const values = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        {values &&
          Object.entries(values).map(([key, value], index) => (
            <View key={index} style={[appStyles.my1, styles.section]}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{value ? value : "-"}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 10,
    flexDirection: "row",
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  label: {
    width: 110,
    marginRight: 10,
    color: "#666",
    textTransform: "capitalize",
  },
  values: {
    // fontWeight: "bold",
  },
});
