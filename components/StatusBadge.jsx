import React from "react";
import { Text } from "react-native";

const StatusBadge = ({ status = "Pending", style = {} }) => {
  let statusBg = "green";
  if (status === "Pending") statusBg = "orange";
  else if (status === "Rejected") statusBg = "red";
  else if (status === "InProcess") statusBg = "#800080";
  
  return (
    <Text style={{ ...styles.badgeStyle, backgroundColor: statusBg, ...style }}>
      {status}
    </Text>
  );
};
const styles = {
  badgeStyle: {
    color: "#fff",
    borderColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    padding: 2,
    alignItems: "center",
    paddingHorizontal: 4,
    fontSize: 12,
    overflow: "hidden",
    width: 70,
    textAlign: "center",
  },
};

export default StatusBadge;
