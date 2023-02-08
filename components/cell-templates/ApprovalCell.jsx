import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { primaryColor } from "../../constants/Colors";
import appStyles from "../../app-styles";
import StatusBadge from "../StatusBadge";
import { useNavigation } from "@react-navigation/native";

export default function ApprovalCell({ item }) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.sectionWrapper}>
        <Pressable
          onPress={() =>
            navigation.navigate("SingleSubmission", {
              ...item,
              isApproval: true,
              apiUrl: item?.type == "TimeOnTools" ? "/TOTLog" : "/OverrideLog",
            })
          }
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <StatusBadge status={item?.status} style={{ marginBottom: 5 }} />
            <Text style={styles.date}>{item?.formattedDate}</Text>
          </View>
          <View style={[appStyles.my1, styles.section]}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.values}>{item?.type}</Text>
          </View>
          <View style={[appStyles.my1, styles.section]}>
            <Text style={styles.label}>Requester:</Text>
            <Text style={styles.values}>{item?.requester}</Text>
          </View>
          <View style={[appStyles.my1, styles.section]}>
            <Text style={styles.label}>unit:</Text>
            <Text style={styles.values}>{item?.unit?.name}</Text>
          </View>
          <View style={[appStyles.my1, styles.section]}>
            <Text style={styles.label}>reason:</Text>
            <Text style={styles.values}>{item?.reason}</Text>
          </View>
          <View style={[appStyles.my1, styles.section]}>
            <Text style={styles.label}>total Hours:</Text>
            <Text style={styles.values}>{item?.totalHours}</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 5,
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  sectionWrapper: {
    width: "100%",
  },
  label: {
    textTransform: "capitalize",
    width: 90,
    color: "#666",
  },
  date: {
    color: "#999",
    fontSize: 13,
    marginTop: 2,
    right: 0,
  },
});
